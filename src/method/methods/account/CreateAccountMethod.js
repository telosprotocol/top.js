const AbstractObservedTransactionMethod = require('../../abstract/AbstractObservedTransactionMethod');
const xActionType = require('../../model/XActionType');
const xTransactionType = require('../../model/XTransactionType');
const XTransaction = require('../../lib/XTransaction');
const ReceiverAction = require('../../lib/ReceiverAction');
const SenderAction = require('../../lib/SenderAction');
const ByteBuffer = require('../../../utils/ByteBuffer');
const secp256k1 = require('secp256k1');
const StringUtil = require("../../../utils");

class CreateAccountMethod extends AbstractObservedTransactionMethod {

    constructor(moduleInstance) {
        super({
            methodName: 'sendTransaction',
            use_transaction: true,
        }, moduleInstance);
    }

    /**
     * This method will be executed for get args.
     *
     * @method addArgsKey
     *
     * @param {*} methodArguments
     *
     * @returns {Object}
     */
    getArgs(methodArguments) {
        let {
            account
        } = methodArguments[0] || {};
        account = account ? account : this.moduleInstance.defaultAccount;
        
        let { address, sequence_id, token, privateKeyBytes, publicKey } = account;

        let parameters = {
            version: '1.0',
            target_account_addr: address,
            token,
            method: 'sendTransaction',
            sequence_id
        }

        const params = {
            version: '1.0',
            method: true === this.use_transaction ? 'sendTransaction' : this._methodName,
            target_account_addr: address,
            sequence_id,
        }
        
        const transAction = new XTransaction();
        transAction.set_transaction_type(xTransactionType.CreateUserAccount);
        transAction.set_last_trans_nonce(0);
        const cur_timestamp = Math.round(new Date() / 1000);
        transAction.set_fire_timestamp(cur_timestamp);
        transAction.set_expire_duration(100);
        transAction.set_last_trans_hash("0xF6E9BE5D70632CF5");
        transAction.set_deposit(100000);

        const sourceAction = new SenderAction();
        sourceAction.set_action_type(xActionType.SourceNull);
        sourceAction.set_tx_sender_account_addr(address);
        sourceAction.set_action_param(new Uint8Array(0));

        const targetAction = new ReceiverAction();
        targetAction.set_action_type(xActionType.CreateUserAccount);
        targetAction.set_tx_receiver_account_addr(address);
        let sb =new ByteBuffer().littleEndian();
        let _a_params = sb.string(address).pack();
        targetAction.set_action_param(_a_params);
        
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
        
        sourceAction.set_action_param("0x" + StringUtil.bytes2hex(new Uint8Array(0)));
        targetAction.set_action_param("0x" + StringUtil.bytes2hex(_a_params));

        transAction.set_authorization(auth_hex);
        transAction.set_transaction_hash(hash.hex);
        transAction.set_public_key("0x" + StringUtil.bytes2hex(publicKey));

        params.params = transAction;
        parameters.body = JSON.stringify(params);
        return parameters;
    }
}

module.exports = CreateAccountMethod;