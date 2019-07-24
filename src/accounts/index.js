
const utxoLib = require('trezor-utxo-lib');
const secp256k1 = require('secp256k1');
const randombytes = require('randombytes');

const Account = require('./models/Account');

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

        const publicKey = secp256k1.publicKeyCreate(privateKey, false);

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
     * This static method gives us the possibility to create a Account object from a private key.
     *
     * @param {String} privateKey
     *
     * @returns {Account}
     */
    static generateByPrivateKey(privateKey) {
        if (!privateKey.startsWith('0x')) {
            privateKey = '0x' + privateKey;
        }

        // 64 hex characters + hex-prefix
        if (privateKey.length !== 66) {
            throw new Error("Private key must be 32 bytes long");
        }

        const publicKey = secp256k1.publicKeyCreate(privKey, false);

        const hash =  utxoLib.crypto.sha256(pub_key);
        const ripemd = utxoLib.crypto.ripemd160(hash);
        const address = utxoLib.address.toBase58Check(ripemd,0);

        return new Account({
            address: "T-0-" + address, 
            privateKey,
            publicKey
        });
    }
}

module.exports = Accounts;