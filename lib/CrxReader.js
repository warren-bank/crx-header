var assert = require('assert');

/**
 * Initialize a new CrxReader. See http://developer.chrome.com/extensions/crx.html
 * for the CRX file format specification.
 *
 * @param {Buffer} data
 * @api public
 */
function CrxReader(data) {
  checkData(data);
  this.data       = data;
  this.dataChunks = parseData(data);
}

/**
 * Checks whether the given Buffer contains a valid CRX file.
 *
 * @param {Buffer} data
 */
function checkData(data) {
  var magicNumber = [0x43, 0x72, 0x32, 0x34];

  for (var i = 0; i < 4; i++) {
    if(data[i] != magicNumber[i]) {
      throw new Error('Not a CRX format');
    }
  }
}

/**
 * Parses the CRX data into individual components.
 *
 * @param {Buffer} data
 */
function parseData(data) {
  var getSlice = function(start, length) {
    var end = length ? (start + length) : data.length;
    return data.slice(start, end);
  };

  var magicNumber     = data.readUInt32LE(0);                             // Number
  var version         = data.readUInt32LE(4);                             // Number
  var publicKeyLength = data.readUInt32LE(8);                             // Number
  var signatureLength = data.readUInt32LE(12);                            // Number
  var publicKey       = getSlice(16,  publicKeyLength);                   // Buffer
  var signature       = getSlice(16 + publicKeyLength,  signatureLength); // Buffer
  var zipArchive      = getSlice(16 + publicKeyLength + signatureLength); // Buffer

  assert.equal(publicKeyLength, publicKey.length, 'length of public key Buffer does not match length specified in CRX header')
  assert.equal(signatureLength, signature.length, 'length of signature Buffer does not match length specified in CRX header')

  return {magicNumber, version, publicKeyLength, signatureLength, publicKey, signature, zipArchive};
}

/**
 * Return individual components of CRX file.
 * Optionally encode binary data Buffers to format:
 *   - 'hex'    : {String} hex    encoding
 *   - 'base64' : {String} base64 encoding
 *
 * @param {String}  format
 * @param {Boolean} format_zip
 * @api public
 */
CrxReader.prototype.getContents = function(format, format_zip) {
  var contents = Object.assign({}, this.dataChunks);

  if (format) {
    format = format.toLowerCase();

    switch (format) {
      case 'hex':
      case 'base64':
        break;
      default:
        format = false;
    }

    if (format) {
      let bufferFields = ['publicKey', 'signature']
      if (format_zip) bufferFields.push('zipArchive')

      bufferFields.forEach((key) => {
        contents[key] = contents[key].toString(format);
      })
    }
  }

  return contents;
};

module.exports = CrxReader;
