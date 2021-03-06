const AbstractObservedTransactionMethod = require('../../abstract/AbstractObservedTransactionMethod');
const xActionType = require('../../model/XActionType');
const xTransactionType = require('../../model/XTransactionType');
const XTransaction = require('../../lib/XTransaction');
const ReceiverAction = require('../../lib/ReceiverAction');
const SenderAction = require('../../lib/SenderAction');
const ByteBuffer = require('../../../utils/ByteBuffer');
const Secp256k1Helper = require('../../../utils/Secp256k1Helper');
const StringUtil = require("../../../utils");

class DeployContractMethod extends AbstractObservedTransactionMethod {

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
            account,
        } = methodArguments[0] || {};
        account = account ? account : this.moduleInstance.defaultAccount;
        let { address, sequence_id, token, privateKeyBytes, publicKey, latest_tx_hash_xxhash64, nonce, } = account;

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

        if (methodArguments.length !== 1) {
            throw new Error('publish contract args length is not right');
        }
        const txArgs = methodArguments[0];
        const contractAccount = txArgs['contractAccount'] || this.moduleInstance.accounts.generateContractAccount({ parentAddress: address });
        const contractCode = txArgs['contractCode'];
        const deposit = txArgs['deposit'];
        const gasLimit = txArgs['gasLimit'] || 0;
        const type = txArgs['type'] || '';
        const note = txArgs['note'] || '';
        
        const transAction = new XTransaction();
        transAction.set_transaction_type(xTransactionType.CreateContractAccount);
        transAction.set_last_trans_nonce(nonce);
        const cur_timestamp = Math.round(new Date() / 1000);
        transAction.set_fire_timestamp(cur_timestamp);
        transAction.set_expire_duration(100);
        transAction.set_last_trans_hash(last_hash_xxhash64);
        transAction.set_deposit(100000);

        const sourceAction = new SenderAction();
        sourceAction.set_action_type(xActionType.CreateConstractAccount);
        sourceAction.set_tx_sender_account_addr(address);
        let sb =new ByteBuffer().littleEndian();
        let _s_params = sb.string(type).int64(deposit).string(note).pack();
        sourceAction.set_action_param(_s_params);

        const targetAction = new ReceiverAction();
        targetAction.set_action_type(xActionType.CreateConstractAccount);
        targetAction.set_tx_receiver_account_addr(contractAccount.address);
        let tb =new ByteBuffer().littleEndian();
        let _t_params = tb.int64(gasLimit).string(contractCode).pack();
        targetAction.set_action_param(_t_params);

        // const targetHashResult = targetAction.set_digest();
        // const target_action_auth_hex = Secp256k1Helper.signData(contractAccount.privateKeyBytes, targetHashResult.array);
        targetAction.set_action_authorization('0x' + contractAccount.publicKey);
        
        transAction.set_source_action(sourceAction);
        transAction.set_target_action(targetAction);

        transAction.set_digest();
        const hash =  transAction.get_transaction_hash();
        const auth_hex = Secp256k1Helper.signData(privateKeyBytes, hash.array);
        
        sourceAction.set_action_param("0x" + StringUtil.bytes2hex(_s_params));
        targetAction.set_action_param("0x" + StringUtil.bytes2hex(_t_params));

        transAction.set_authorization(auth_hex);
        transAction.set_transaction_hash(hash.hex);
        transAction.set_public_key("0x" + publicKey);

        params.params = transAction;
        parameters.body = JSON.stringify(params);
        transAction.contractAccount = contractAccount;
        return parameters;
    }
}

module.exports = DeployContractMethod;