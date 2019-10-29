
const secp256k1 = require('secp256k1');
const randombytes = require('randombytes');

const Account = require('./models/Account');
const StringUtil = require("../utils");

const addressTypeEnum = require('./models/addressType');
const netTypeEnum = require('./models/netType');
const addressTools = require('./address');
const crypto = require('./crypto');

class Accounts{

    /**
     * This methods gives us the possibility to create a new account.
     *
     * @returns {Account}
     */
    generate(option = {}) {
        let { privateKey, addressType, parentAddress, netType } = option;
        addressType = addressType === undefined ? addressTypeEnum.main : addressType;
        netType = netType === undefined ? netTypeEnum.main : netType;

        let privateKeyBytes = this.getPrivateKeyBytes(privateKey);
        let publicKeyBytes = secp256k1.publicKeyCreate(privateKeyBytes, false);
        let address = this.getAddress({
            publicKeyBytes, parentAddress, netType, addressType
        });
        
        return new Account({
            address: "T-" + addressType + "-" + address, 
            privateKey: StringUtil.bytes2hex(privateKeyBytes),
            publicKey: StringUtil.bytes2hex(publicKeyBytes),
            privateKeyBytes
        });
    }

    generateSubAccount(option){
        const { privateKey, parentAddress, netType } = option;
        if (!parentAddress) {
            throw new Error('sub account need parent address');
        }
        option.addressType = addressTypeEnum.sub;

        return this.generate(option);
    }

    generateContractAccount(option){
        const { privateKey, parentAddress, netType } = option;
        if (!parentAddress) {
            throw new Error('contract account need parent address');
        }
        option.addressType = addressTypeEnum.contract;

        return this.generate(option);
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
        addressType = addressType === undefined ? addressTypeEnum.main : addressType;
        netType = netType === undefined ? netType.main : netType;
        if (parentAddress){
            let size = Math.min(parentAddress.length, 65);
            for (let i = 0; i < size; i++) {
                publicKeyBytes[i] += parentAddress[i].charCodeAt(0);
            }
        }

        let size = 33;
        if (publicKeyBytes[0] == 4) {
            size = 65;
        } else if (publicKeyBytes[0] == 0) {
            size = 1;
        }
        publicKeyBytes = publicKeyBytes.slice(0, size);

        let version = netType === netType.main ? addressType.charCodeAt(0) : addressType.charCodeAt(0) + (netType << 8);

        const hash =  crypto.sha256(publicKeyBytes);
        const ripemd = crypto.ripemd160(hash);
        const address = addressTools.toBase58Check(ripemd,version);
        return address;
    }
}

module.exports = Accounts;