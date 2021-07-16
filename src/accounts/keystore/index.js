const hkdf = require('../util/hkdf');
const crypto = require('crypto');
const ethAccounts = require('web3-eth-accounts');

const jsHkdf = require('js-crypto-hkdf');

var sanitizeTypedArrayAndArrayBuffer = function (data) {
    if (data instanceof Uint8Array)
        return data;
    if (ArrayBuffer.isView(data) && typeof data.buffer !== 'undefined') { // TypedArray except Uint8Array
        return new Uint8Array(data.buffer);
    }
    else
        return new Uint8Array(data); // ArrayBuffer
};
let stringToArrayBuffer = function (str) {
    var bytes = new Uint8Array(str.length);
    return bytes.map(function (_x, i) { return str.charCodeAt(i); });
};
let arrayBufferToString = function (data) {
    var bytes = sanitizeTypedArrayAndArrayBuffer(data);
    var arr = new Array(bytes.length);
    bytes.forEach(function (x, i) { arr[i] = x; });
    return String.fromCharCode.apply(null, arr);
};

function decodeAes256WithJsHkdf(pw, keyInfo) {
    let info = keyInfo.crypto.kdfparams.info.replace('0x','');
    let salt = keyInfo.crypto.kdfparams.salt.replace('0x','');
    salt = Buffer.from(salt, 'hex');
    console.log('info hex > ' + info);
    info = Buffer.from(info, 'hex');
    jsHkdf.compute(stringToArrayBuffer(pw), 'SHA3-512', 64, arrayBufferToString(info), salt).then( (derivedKey) => {
        console.log('jsHkdf > ' + Buffer.from(derivedKey.key, 'binary').toString('hex'))
      });
}

function decodeAes256(pw, keyInfo) {
    if (!keyInfo || !keyInfo.crypto || !keyInfo.crypto.kdfparams || !keyInfo.crypto.kdfparams.salt || !keyInfo.crypto.kdfparams.info){
        return null;
    }
    let digest = keyInfo.crypto.kdfparams.prf;
    const derivedKey = hkdf(Buffer.from(pw, 'utf-8'), 64, {
        salt: Buffer.from(keyInfo.crypto.kdfparams.salt.replace('0x',''), 'hex'), 
        info: Buffer.from(keyInfo.crypto.kdfparams.info.replace('0x',''), 'hex'),
        hash: 'sha3-512'
    });
    let hexKey = derivedKey.toString('hex').substring(0,64);
    console.log('hexKey > ' + derivedKey.toString('hex'));
    
    let ivHex = keyInfo.crypto.cipherparams.iv;
    ivHex = ivHex.replace('0x', '').substring(0, 32);

    let iv = Buffer.from(ivHex, 'hex');
    let key = Buffer.from(hexKey, 'hex');

    let data = keyInfo.crypto.ciphertext.replace('0x','')
    digest = keyInfo.crypto.cipher;

    let decipher = crypto.createDecipheriv(digest, key, iv);
    let decrypted = decipher.update(Buffer.from(data, 'hex')); 
    decrypted = Buffer.concat([decrypted, decipher.final()]); 
    // console.log('encrypted data=', decrypted.toString());
    return decrypted.toString();
}

function decodeEthAes(pw, keyInfo) {
    let a = new ethAccounts();
    if (!keyInfo){
        return null;
    }
    let result = a.decrypt(keyInfo, pw);
    // console.log('result data=', result);
    // console.log('address > ' +  a.privateKeyToAccount(result.privateKey).address)
    return result.privateKey;
}

module.exports = {
    decodeAes256,
    decodeEthAes,
    decodeAes256WithJsHkdf
  }