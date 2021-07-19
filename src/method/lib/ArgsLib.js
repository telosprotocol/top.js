const StringUtil = require("../../utils");
const XTransaction = require('./XTransaction');
const config = require('../model/Config');

class ArgsLib{
    static getDefaultArgs({
        address,
        sequence_id,
        token,
        latest_tx_hash_xxhash64,
        nonce,
        method,
        xTransactionType,
        sourceAction,
        targetAction,
        note
    }) {
        token = typeof(token) === 'undefined' ? '' : token;
        note = typeof(note) === 'undefined' ? '' : note;
        sequence_id = typeof(sequence_id) === 'undefined' ? new Date().getTime() : sequence_id;
        if (typeof(latest_tx_hash_xxhash64) === 'undefined' || typeof(nonce) === 'undefined') {
            throw new Error('latest tx xxhash64 and nonce is required!')
        }
        let parameters = {
            version: config.Version,
            target_account_addr: address,
            token,
            method,
            sequence_id
        }
        const transAction = new XTransaction();
        transAction.set_tx_type(xTransactionType);
        transAction.set_last_tx_nonce(nonce);
        let cur_timestamp = Math.round(new Date() / 1000);
        transAction.set_send_timestamp(cur_timestamp);
        transAction.set_tx_expire_duration(config.ExpireDuration);
        transAction.set_last_tx_hash(latest_tx_hash_xxhash64);
        transAction.set_tx_deposit(config.Deposit);
        transAction.set_note(note);
        
        transAction.set_sender_action(sourceAction);
        transAction.set_receiver_action(targetAction);

        transAction.set_digest();
        const hash =  transAction.get_tx_hash();
        
        sourceAction.set_action_param("0x" + StringUtil.bytes2hex(sourceAction.get_action_param()));
        targetAction.set_action_param("0x" + StringUtil.bytes2hex(targetAction.get_action_param()));

        // transAction.set_authorization(auth_hex);
        transAction.set_tx_hash(hash.hex);

        this.transAction = transAction;
        parameters.body = JSON.stringify({params:transAction});
        return parameters;
    }
}

module.exports = ArgsLib;