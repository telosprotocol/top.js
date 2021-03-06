const AbstractObservedTransactionMethod = require('../../abstract/AbstractObservedTransactionMethod');
const xActionType = require('../../model/XActionType');
const xTransactionType = require('../../model/XTransactionType');
const ByteBuffer = require('../../../utils/ByteBuffer');
const ReceiverAction = require('../../lib/ReceiverAction');
const SenderAction = require('../../lib/SenderAction');
const argsLib = require('../../lib/ArgsLib');

class UnStakeVoteMethod extends AbstractObservedTransactionMethod {

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
        let { latest_tx_hash_xxhash64, nonce, token, sequence_id, note, from, amount } = methodArguments[0];
        const address = typeof(from) === 'undefined' ? this.moduleInstance.defaultAccount.address : from;
        const method = true === this.use_transaction ? 'sendTransaction' : this._methodName;

        let stream = new ByteBuffer().littleEndian();
        const txActionParam = stream.int64(amount).pack();

        const sourceAction = new SenderAction();
        sourceAction.set_action_type(xActionType.SourceNull);
        sourceAction.set_tx_sender_account_addr(address);

        const targetAction = new ReceiverAction();
        targetAction.set_tx_receiver_account_addr(address);
        targetAction.set_action_type(xActionType.RedeemTokenVote);
        targetAction.set_action_param(txActionParam);
        
        this.parameters = argsLib.getDefaultArgs({
            address,
            sequence_id,
            token,
            latest_tx_hash_xxhash64,
            nonce,
            method,
            xTransactionType: xTransactionType.RedeemTokenVote,
            sourceAction,
            targetAction,
            note
        });
        return this.parameters;
    }
}

module.exports = UnStakeVoteMethod;