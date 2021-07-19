const AbstractObservedTransactionMethod = require('../../abstract/AbstractObservedTransactionMethod');
const xActionType = require('../../model/XActionType');
const xTransactionType = require('../../model/XTransactionType');
const actionParam = require('../../../utils/ActionParam');
const ByteBuffer = require('../../../utils/ByteBuffer');
const ReceiverAction = require('../../lib/ReceiverAction');
const SenderAction = require('../../lib/SenderAction');
const argsLib = require('../../lib/ArgsLib');
const config = require('../../model/Config');

class RedeemNodeDepositMethod extends AbstractObservedTransactionMethod {

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
        let { latest_tx_hash_xxhash64, nonce, token, sequence_id, note, from } = methodArguments[0];
        const address = typeof(from) === 'undefined' ? this.moduleInstance.defaultAccount.address : from;
        const method = true === this.use_transaction ? 'sendTransaction' : this._methodName;

        const sourceAction = new SenderAction();
        sourceAction.set_action_type(xActionType.AssertOut);
        sourceAction.set_tx_sender_account_addr(address);

        const targetAction = new ReceiverAction();
        targetAction.set_tx_receiver_account_addr(config.Registeration);
        targetAction.set_action_type(xActionType.RunConstract);
        targetAction.set_acton_name('redeem');
        
        this.parameters = argsLib.getDefaultArgs({
            address,
            sequence_id,
            token,
            latest_tx_hash_xxhash64,
            nonce,
            method,
            xTransactionType: xTransactionType.RunContract,
            sourceAction,
            targetAction,
            note
        });
        return this.parameters;
    }
}

module.exports = RedeemNodeDepositMethod;