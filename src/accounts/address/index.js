var Buffer = require('safe-buffer').Buffer
var bs58check = require('bs58check')
var typeforce = require('typeforce')
var types = require('./types')

function fromBase58Check (address) {
  var payload = bs58check.decode(address)

  // TODO: 4.0.0, move to "toOutputScript"
  if (payload.length < 21) throw new TypeError(address + ' is too short')
  if (payload.length > 22) throw new TypeError(address + ' is too long')

  var multibyte = payload.length === 22
  var offset = multibyte ? 2 : 1

  var version = multibyte ? payload.readUInt16BE(0) : payload[0]
  var hash = payload.slice(offset)

  return { version: version, hash: hash }
}

function toBase58Check (hash, version) {
  typeforce(types.tuple(types.Hash160bit, types.UInt16), arguments)

  // Zcash adds an extra prefix resulting in a bigger (22 bytes) payload. We identify them Zcash by checking if the
  // version is multibyte (2 bytes instead of 1)
  var multibyte = version > 0xff
  var size = multibyte ? 22 : 21
  var offset = multibyte ? 2 : 1

  var length = getAddressPrefixLength(version);

  var payload = Buffer.allocUnsafe(20 + length)
  // multibyte ? payload.writeUInt16BE(version, 0) : payload.writeUInt8(version, 0)
  writeAddressPrefix(version, payload);
  hash.copy(payload, length)

  return bs58check.encode(payload)
}

function getAddressPrefixLength(version) {
  if (version <= 0xFF) return 1;
  if (version <= 0xFFFF) return 2;
  if (version <= 0xFFFFFF) return 3;
  return 4;
}

function writeAddressPrefix(version, payload){
  var index = 0;
  if (version > 0xFFFFFF) payload.writeUInt8((version >> 24), index++);
  if (version > 0xFFFF) payload.writeUInt8((version >> 16), index++);
  if (version > 0xFF) payload.writeUInt8((version >> 8), index++);
  payload.writeUInt8((version & 0xFF), index++);
}

module.exports = {
  fromBase58Check: fromBase58Check,
  toBase58Check: toBase58Check,
}
