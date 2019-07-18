'use strict';

const secp256k1 = require('secp256k1');
const {randomBytes} = require('crypto');
const bitcoin = require('@trezor/utxo-lib');

class CryptoUtil {
    constructor() {

    }

    static make_private_key(private_key_wrap) {
        do {
            private_key_wrap.key = randomBytes(32);
        } while (!secp256k1.privateKeyVerify(private_key_wrap.key));
    }

    static make_address_by_assign_key(priv_key, addr_type, net_id) {
        const pub_key = secp256k1.publicKeyCreate(priv_key, false);
        return CryptoUtil.public_to_address(pub_key, addr_type, net_id);
    }

    static make_child_address_by_assigned_key(parent_addr,priv_key,addr_type,net_id) {
        const pub_key = secp256k1.publicKeyCreate(priv_key);
        return CryptoUtil.public_to_address(pub_key,addr_type,net_id);
    }

    static public_to_address(pub_key) {
        const hash =  bitcoin.crypto.sha256(pub_key);
        const ripemd = bitcoin.crypto.ripemd160(hash);
        const address = bitcoin.address.toBase58Check(ripemd,0);
        return "T-0-" + address;
    };
}

module.exports.CryptoUtil = CryptoUtil;
