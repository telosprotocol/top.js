const StringUtil = require("../../utils");
const XTransaction = require('./XTransaction');
const config = require('../model/Config');
const XTransactionType = require('../model/XTransactionType');

class ArgsLib{
    static getDefaultArgs({
        address,
        sequence_id,
        token,
        nonce,
        method,
        xTransactionType,
        sourceAction,
        targetAction,
        note,
        amount
    }) {
        token = typeof(token) === 'undefined' ? '' : token;
        note = typeof(note) === 'undefined' ? '' : note;
        sequence_id = typeof(sequence_id) === 'undefined' ? new Date().getTime() : sequence_id;
        if (typeof(nonce) === 'undefined') {
            throw new Error('nonce is required!')
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
        transAction.set_tx_deposit(config.Deposit);
        transAction.set_note(note);
        transAction.set_tx_structure_version(2);

        transAction.set_sender_account(sourceAction.get_tx_sender_account_addr());
        transAction.set_receiver_account(targetAction.get_tx_receiver_account_addr());
        if(xTransactionType != XTransactionType.Transfer) {
            transAction.set_sender_action_name(sourceAction.get_action_name());
            transAction.set_sender_action_param(sourceAction.get_action_param());
            transAction.set_receiver_action_name(targetAction.get_action_name());
            transAction.set_receiver_action_param(targetAction.get_action_param());
        } else {
            transAction.set_amount(amount);
        }

        transAction.set_digest();
        const hash =  transAction.get_tx_hash();
        
        transAction.set_sender_action_param("0x" + StringUtil.bytes2hex(transAction.get_sender_action_param()));
        transAction.set_receiver_action_param("0x" + StringUtil.bytes2hex(transAction.get_receiver_action_param()));

        transAction.set_tx_hash(hash.hex);

        this.transAction = transAction;
        parameters.body = JSON.stringify({params:transAction});
        return parameters;
    }
}

module.exports = ArgsLib;