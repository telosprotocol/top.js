const StringUtil = require("../../utils");
const ByteBuffer = require('../../utils/ByteBuffer');
const secp256k1 = require('secp256k1');
const XTransaction = require('./XTransaction');
const config = require('../model/Config');

class ArgsLib{
    static getDefaultArgs({
        address,
        sequence_id,
        token,
        last_hash_xxhash64,
        nonce,
        method,
        xTransactionType,
        sourceAction,
        targetAction,
        privateKeyBytes
    }) {
        let parameters = {
            version: config.Version,
            account_address: address,
            token,
            method,
            sequence_id
        }
        const params = {
            version: config.Version,
            method,
            account_address: address,
            sequence_id,
        }
        const transAction = new XTransaction();
        transAction.set_transaction_type(xTransactionType);
        transAction.set_last_trans_nonce(nonce);
        const cur_timestamp = Math.round(new Date() / 1000);
        transAction.set_fire_timestamp(cur_timestamp);
        transAction.set_expire_duration(config.ExpireDuration);
        transAction.set_last_trans_hash(last_hash_xxhash64);
        transAction.set_deposit(config.Deposit);
        
        transAction.set_source_action(sourceAction);
        transAction.set_target_action(targetAction);

        transAction.set_digest();
        const hash =  transAction.get_transaction_hash();
        const hash_buffer = Buffer.from(hash.array);
        const private_key_buffer = Buffer.from(privateKeyBytes);
        const secp256k1_sign = secp256k1.sign(hash_buffer, private_key_buffer);
        let stream = new ByteBuffer().littleEndian();
        stream.byte(secp256k1_sign.recovery).byteArray(secp256k1_sign.signature,secp256k1_sign.signature.length);
        const stream_array =  new Uint8Array(stream.pack());
        const auth_hex = "0x" + StringUtil.bytes2hex(stream_array);
        
        sourceAction.set_action_param("0x" + StringUtil.bytes2hex(sourceAction.get_action_param()));
        targetAction.set_action_param("0x" + StringUtil.bytes2hex(targetAction.get_action_param()));

        transAction.set_authorization(auth_hex);
        transAction.set_transaction_hash(hash.hex);

        params.params = transAction;
        this.transAction = transAction;
        parameters.body = JSON.stringify(params);
        return parameters;
    }
}

module.exports = ArgsLib;