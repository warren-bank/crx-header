### [CRX header](https://github.com/warren-bank/crx-header)

Prints information contained in the header of Chromium extension [CRX files](https://chromium.googlesource.com/chromium/src.git/+/62.0.3178.1/chrome/common/extensions/docs/templates/articles/crx.html).

* _version_
* _public key length_
* _signature length_
* _public key_
* _signature_

#### Fork:

This script is a super dumbed-down version inspired by the __amazing__ collection of perl scripts in this [gist](https://gist.github.com/mwgamera/9774270) by [mwgamera](https://github.com/mwgamera):

* [crxhdr.pl](https://gist.github.com/mwgamera/9774270/raw/4f8541e1b13137646c2cb9e1fd8636ccc03320a4/crxhdr.pl)
* [crxmerge.pl](https://gist.github.com/mwgamera/9774270/raw/4f8541e1b13137646c2cb9e1fd8636ccc03320a4/crxmerge.pl)
* [crxsplit.pl](https://gist.github.com/mwgamera/9774270/raw/4f8541e1b13137646c2cb9e1fd8636ccc03320a4/crxsplit.pl)
* [crxvanity.pl](https://gist.github.com/mwgamera/9774270/raw/4f8541e1b13137646c2cb9e1fd8636ccc03320a4/crxvanity.pl)

My reason for ruining perfection is that I always have a hard time satisfying perl dependencies; it inevitably turns into a major time suck. This version has no dependencies.

#### Usage:

`perl crx-header.pl <list of filepaths>`

* can accept one or more filepaths
  * each path should identify a _.crx_ Chromium extension

#### Example:

`perl crx-header.pl "/path/to/extensions/1.crx" "/path/to/extensions/2.crx" >crx-header.log 2>&1`

#### Dependencies:

* perl
  * `perl.exe` and `perlXXX.dll`
  * `@INC` can include no external libraries; all good

#### Legal:

* copyright: [Warren Bank](https://github.com/warren-bank)
* license: [GPL-2.0](https://www.gnu.org/licenses/old-licenses/gpl-2.0.txt)
