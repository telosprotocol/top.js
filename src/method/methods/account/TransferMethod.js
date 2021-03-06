
const AbstractObservedTransactionMethod = require('../../abstract/AbstractObservedTransactionMethod');
const xActionType = require('../../model/XActionType');
const xTransactionType = require('../../model/XTransactionType');
const actionParam = require('../../../utils/ActionParam');
const ReceiverAction = require('../../lib/ReceiverAction');
const SenderAction = require('../../lib/SenderAction');
const argsLib = require('../../lib/ArgsLib');

class TransferMethod extends AbstractObservedTransactionMethod {

    constructor(moduleInstance) {
        super({
            methodName: 'sendTransaction',
            use_transaction: true
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
        let { latest_tx_hash_xxhash64, nonce, token, sequence_id, note, from, amount, to } = methodArguments[0];
        const address = typeof(from) === 'undefined' ? this.moduleInstance.defaultAccount.address : from;
        if (typeof(to) === 'undefined') {
            throw new Error('transfer tx need target address')
        }
        const method = true === this.use_transaction ? 'sendTransaction' : this._methodName;

        const txActionParam = actionParam.ActionAssetOutParam('', amount);

        const sourceAction = new SenderAction();
        sourceAction.set_action_type(xActionType.AssertOut);
        sourceAction.set_tx_sender_account_addr(address);
        sourceAction.set_action_param(txActionParam);

        const targetAction = new ReceiverAction();
        targetAction.set_action_type(xActionType.AssetIn);
        targetAction.set_tx_receiver_account_addr(to);
        targetAction.set_action_param(txActionParam);
        
        this.parameters = argsLib.getDefaultArgs({
            address,
            sequence_id,
            token,
            latest_tx_hash_xxhash64,
            nonce,
            method,
            xTransactionType: xTransactionType.Transfer,
            sourceAction,
            targetAction,
            note
        });
        return this.parameters;
    }
}

module.exports = TransferMethod;