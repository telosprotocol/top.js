
const secp256k1 = require('secp256k1');
const randombytes = require('randombytes');

const Account = require('./models/Account');
const StringUtil = require("./util/Convert");

const addressTypeEnum = require('./models/addressType');
const netTypeEnum = require('./models/netType');
const addressTools = require('./address');
const crypto = require('./crypto');
const ethAccounts = require('web3-eth-accounts');

class Accounts{

    /**
     * This methods gives us the possibility to create a new account.
     *
     * @returns {Account}
     */
    generate(option = {}) {
        let { privateKey, addressType, parentAddress, netType } = option;
        addressType = addressType === undefined ? addressTypeEnum.T8 : addressType;
        netType = netType === undefined ? netTypeEnum.main : netType;

        let privateKeyBytes;
        if (!privateKey) {
            do {
                privateKeyBytes = randombytes(32);
            } while (!secp256k1.privateKeyVerify(privateKeyBytes));
            privateKey = StringUtil.bytes2hex(privateKeyBytes);
        } else {
            if (privateKey.startsWith('0x')) {
                privateKey = privateKey.replace('0x', '');
            }
            if (privateKey.length == 44) {
                privateKey = Buffer.from(privateKey, 'base64').toString('hex');
                addressType = addressTypeEnum.main;
            } else if (privateKey.length != 64) {
                throw new Error("Private key must be 32 bytes long");
            }
            privateKeyBytes = Buffer.from(StringUtil.hex2bytes(privateKey))
        }

        if (addressType == addressTypeEnum.T8) {
            let a = new ethAccounts();
            let result = a.privateKeyToAccount(privateKey);
            return new Account({
                address: "T" + addressType + "0000" + result.address.replace('0x', '').toLocaleLowerCase(), 
                privateKey: privateKey,
                publicKey: '',
                privateKeyBytes
            });
        }

        let publicKeyBytes = secp256k1.publicKeyCreate(privateKeyBytes, false);
        let address = this.getAddress({
            publicKeyBytes, parentAddress, netType, addressType
        });
        
        return new Account({
            address: "T" + addressType + "0000" + address, 
            privateKey: StringUtil.bytes2hex(privateKeyBytes),
            publicKey: StringUtil.bytes2hex(publicKeyBytes),
            privateKeyBytes
        });
    }

    getPrivateKeyBytes(privateKey) {
        let privateKeyBytes;
        if (!privateKey) {
            do {
                privateKeyBytes = randombytes(32);
            } while (!secp256k1.privateKeyVerify(privateKeyBytes));
        } else {
            if (privateKey.startsWith('0x')) {
                privateKey = privateKey.replace('0x', '');
            }
            if (privateKey.length !== 64) {
                throw new Error("Private key must be 32 bytes long");
            }
            privateKeyBytes = Buffer.from(StringUtil.hex2bytes(privateKey))
        }
        return privateKeyBytes;
    }

    getAddress(argsObj) {
        let { publicKeyBytes, parentAddress, addressType, netType } = argsObj;
        if (!publicKeyBytes) {
            throw new Error('generate address error, publick bytes is null');
        }
        let newPublicKeyBytes = Buffer.from(publicKeyBytes);
        addressType = addressType === undefined ? addressTypeEnum.main : addressType;
        netType = netType === undefined ? netType.main : netType;
        
        if (parentAddress){
            let size = Math.min(parentAddress.length, 65);
            for (let i = 0; i < size; i++) {
                newPublicKeyBytes[i] += parentAddress[i].charCodeAt(0);
            }
        }

        let size = 33;
        if (newPublicKeyBytes[0] == 4) {
            size = 65;
        } else if (newPublicKeyBytes[0] == 0) {
            size = 1;
        }
        newPublicKeyBytes = newPublicKeyBytes.slice(0, size);

        let version = netType === netType.main ? addressType.charCodeAt(0) : addressType.charCodeAt(0) + (netType << 8);

        const hash =  crypto.sha256(newPublicKeyBytes);
        const ripemd = crypto.ripemd160(hash);
        const address = addressTools.toBase58Check(ripemd,version);
        return address;
    }
}

module.exports = Accounts;