#! /usr/bin/env node

const CrxReader = require('../lib/CrxReader')

const fs   = require('fs')
const path = require('path')

const args = [...process.argv].slice(2)

if (args.length === 0) {
  console.log('ERROR:', 'CRX filepath(s) required')
  process.exit(0)
}

const print_divider = function(length) {
  length = length || 80
  console.log('-'.repeat(length), "\n")
}

let counter = 0

args.forEach((filepath) => {
  if (! path.isAbsolute(filepath)) {
    filepath = process.cwd() + path.sep + filepath
    filepath = path.normalize(filepath)
  }

  try {
    fs.accessSync(filepath, fs.constants.F_OK | fs.constants.R_OK)
  } catch (error) {
    console.log('ERROR:', 'filepath to input CRX must exist and be readable', "\n", filepath, "\n")
    return // process next input filepath
  }

  const crxBuffer   = fs.readFileSync(filepath, {encoding: null})
  const crxReader   = new CrxReader(crxBuffer)
  const hexContents = crxReader.getContents('hex')
  const b64Contents = crxReader.getContents('base64')

  if (!counter) print_divider()

  console.log('filename:')
  console.log('=========')
  console.log(filepath)
  console.log()

  console.log('version = ',              hexContents.version)
  console.log('length of public key = ', hexContents.publicKeyLength)
  console.log('length of signature  = ', hexContents.signatureLength)
  console.log()

  console.log('public key (hex):')
  console.log('=================')
  console.log(hexContents.publicKey)
  console.log()

  console.log('public key (base64):')
  console.log('====================')
  console.log(b64Contents.publicKey)
  console.log()

  console.log('signature (hex):')
  console.log('=================')
  console.log(hexContents.signature)
  console.log()

  console.log('signature (base64):')
  console.log('====================')
  console.log(b64Contents.signature)
  console.log()

  print_divider()
  counter++
})

if (counter === 0) {
  console.log('ERROR:', 'all CRX filepath(s) invalid')
  process.exit(0)
}
