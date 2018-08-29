#!/usr/bin/env perl
# Analyze header of CRX packages (Chrome extensions).

# --------------------------------------------------------------------
# credits to:
# --------------------------------------------------------------------
# https://gist.github.com/mwgamera/9774270
# https://gist.github.com/mwgamera/9774270/raw/4f8541e1b13137646c2cb9e1fd8636ccc03320a4/crxhdr.pl
# --------------------------------------------------------------------
# ftp://ftp.squid-cache.org/pub/squid/contrib/no_check/no_check.pl
#   * sub encode_base64 ($;$) {}
# --------------------------------------------------------------------

$CRX_MAGIC = 0x34327243;

sub print_hex {
  my $data = shift(@_);
  my @bytes = split //, $data;
  foreach (@bytes) {
    printf "%02lx", ord $_;
  }
}

sub print_base64 {
  my $data = shift(@_);
  my $res = "";
  pos($data) = 0;
  while ($data =~ /(.{1,45})/gs) {
    $res .= substr(pack('u', $1), 1);
    chop($res);
  }
  $res =~ tr|` -_|AA-Za-z0-9+/|;

  # fix padding at the end
  my $padding = (3 - length($data) % 3) % 3;
  $res =~ s/.{$padding}$/'=' x $padding/e if $padding;

  printf "$res";
}

do {
  my $fn = shift // '-';

  if ($fn ne '-') {
    printf "filename:\n";
    printf "=========\n";
    printf "${fn}\n\n";
  }

  open my $fh, $fn or die $!;
  binmode $fh;

  $fn = $fn eq '-' ? '' : "$fn: ";

  read $fh, $_, 16 or die $!;
  my ($crx, $ver, $pklen, $siglen) = unpack 'V4';

  printf "version = ${ver}\n";
  printf "length of public key = ${pklen}\n";
  printf "length of signature = ${siglen}\n";
  printf "\n";

  die "${fn}Bad format\n" unless $crx == $CRX_MAGIC;
  die "${fn}Unknown version of CRX file\n" unless $ver == 2;

  read $fh, my $pk, $pklen or die $!;
  read $fh, my $sig, $siglen or die $!;

  printf "public key (hex):\n";
  printf "=================\n";
  print_hex($pk);
  printf "\n\n";

  printf "public key (base64):\n";
  printf "====================\n";
  print_base64($pk);
  printf "\n\n";

  printf "signature (hex):\n";
  printf "================\n";
  print_hex($sig);
  printf "\n\n";

  printf "signature (base64):\n";
  printf "===================\n";
  print_base64($sig);
  printf "\n\n";

  close $fh;
} while @ARGV;

1;
