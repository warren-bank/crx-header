### [CRX header](https://github.com/warren-bank/crx-header/tree/nodejs)

#### Summary:

Prints information contained in the header of Chromium extension [CRX files](https://chromium.googlesource.com/chromium/src.git/+/62.0.3178.1/chrome/common/extensions/docs/templates/articles/crx.html).

* _version_
* _public key length_
* _signature length_
* _public key_
* _signature_

#### Installation:

```bash
npm install -g "@warren-bank/crx-header"
```

#### Usage:

`crxhdr <list of filepaths>`

* can accept one or more filepaths
  * each path should identify a _.crx_ Chromium extension

#### Example:

`crxhdr "/path/to/extensions/1.crx" "/path/to/extensions/2.crx"`

#### Dependencies:

* external:
  * [node.js](https://nodejs.org/en/)

* internal:
  * a modified version of [CrxReader](https://github.com/jiripospisil/chrome-ext-downloader/blob/8820e159179ed2fbe9cea81ae4b8f46a723fc3b3/index.js) by [Jiri Pospisil](https://github.com/jiripospisil)

#### Legal:

* copyright: [Warren Bank](https://github.com/warren-bank)
* license: [GPL-2.0](https://www.gnu.org/licenses/old-licenses/gpl-2.0.txt)
