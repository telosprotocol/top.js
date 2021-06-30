const hkdf = require('../util/hkdf');
const crypto = require('crypto');
const ethAccounts = require('web3-eth-accounts');

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
    // console.log('hexKey > ' + derivedKey.toString('hex'));
    
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
    decodeAes256: decodeAes256,
    decodeEthAes: decodeEthAes
  }