
const utxoLib = require('trezor-utxo-lib');
const secp256k1 = require('secp256k1');
const randombytes = require('randombytes');

const Account = require('./models/Account');
const StringUtil = require("../utils");

class Accounts{

    /**
     * This methods gives us the possibility to create a new account.
     *
     * @returns {Account}
     */
    generate() {
        let privateKey = '';
        do {
            privateKey = randombytes(32);
        } while (!secp256k1.privateKeyVerify(privateKey));

        const publicKey = secp256k1.publicKeyCreate(privateKey);

        const hash =  utxoLib.crypto.sha256(publicKey);
        const ripemd = utxoLib.crypto.ripemd160(hash);
        const address = utxoLib.address.toBase58Check(ripemd,0);

        return new Account({
            address: "T-0-" + address, 
            privateKey,
            publicKey
        });
    }

    /**
     * This gives us the possibility to create a Account object from a private key.
     *
     * @param {String} privateKey
     *
     * @returns {Account}
     */
    generateByPrivateKey(privateKey) {
        if (privateKey.startsWith('0x')) {
            // privateKey = '0x' + privateKey;
            privateKey = privateKey.replace('0x', '');
        }

        // 64 hex characters + hex-prefix
        if (privateKey.length !== 64) {
            throw new Error("Private key must be 32 bytes long");
        }

        privateKey = Buffer.from(StringUtil.hex2bytes(privateKey))
        let publicKey = secp256k1.publicKeyCreate(privateKey, false);

        const hash =  utxoLib.crypto.sha256(publicKey);
        const ripemd = utxoLib.crypto.ripemd160(hash);
        const address = utxoLib.address.toBase58Check(ripemd,0);

        publicKey = secp256k1.publicKeyCreate(privateKey);

        return new Account({
            address: "T-0-" + address, 
            privateKey,
            publicKey
        });
    }
}

module.exports = Accounts;