const AbstractObservedTransactionMethod = require('../../abstract/AbstractObservedTransactionMethod');
const xActionType = require('../../model/XActionType');
const xTransactionType = require('../../model/XTransactionType');
const ByteBuffer = require('../../../utils/ByteBuffer');
const ReceiverAction = require('../../lib/ReceiverAction');
const SenderAction = require('../../lib/SenderAction');
const argsLib = require('../../lib/ArgsLib');

class StakeVoteMethod extends AbstractObservedTransactionMethod {

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
        let { latest_tx_hash_xxhash64, nonce, token, sequence_id, note, from, amount, lockTime } = methodArguments[0];
        const address = typeof(from) === 'undefined' ? this.moduleInstance.defaultAccount.address : from;
        lockTime = typeof(lockTime) === 'undefined' ? 0 : lockTime;
        const method = true === this.use_transaction ? 'sendTransaction' : this._methodName;

        let stream = new ByteBuffer().littleEndian();
        stream.int64(amount).short(lockTime);
        const txActionParam = stream.pack();

        const sourceAction = new SenderAction();
        sourceAction.set_action_type(xActionType.PledgeTokenVote);
        sourceAction.set_tx_sender_account_addr(address);
        sourceAction.set_action_param(txActionParam);

        const targetAction = new ReceiverAction();
        targetAction.set_tx_receiver_account_addr(address);
        
        this.parameters = argsLib.getDefaultArgs({
            address,
            sequence_id,
            token,
            latest_tx_hash_xxhash64,
            nonce,
            method,
            xTransactionType: xTransactionType.PledgeTokenVote,
            sourceAction,
            targetAction,
            note
        });
        return this.parameters;
    }
}

module.exports = StakeVoteMethod;