#!/usr/bin/env perl
# Analyze header of CRX packages (Chrome extensions).

$CRX_MAGIC = 0x34327243;

sub print_hex {
  my $data = shift(@_);
  my @bytes = split //, $data;
  foreach (@bytes) {
    printf "%02lx", ord $_;
  }
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

  printf "public key:\n";
  printf "===========\n";
  print_hex($pk);
  printf "\n\n";

  printf "signature:\n";
  printf "==========\n";
  print_hex($sig);
  printf "\n\n";

  close $fh;
} while @ARGV;

1;
