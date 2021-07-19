const AbstractObservedTransactionMethod = require('../../abstract/AbstractObservedTransactionMethod');
const xActionType = require('../../model/XActionType');
const xTransactionType = require('../../model/XTransactionType');
const actionParam = require('../../../utils/ActionParam');
const ByteBuffer = require('../../../utils/ByteBuffer');
const ReceiverAction = require('../../lib/ReceiverAction');
const SenderAction = require('../../lib/SenderAction');
const argsLib = require('../../lib/ArgsLib');
const config = require('../../model/Config');

class UnVoteNodeMethod extends AbstractObservedTransactionMethod {

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
        let { latest_tx_hash_xxhash64, nonce, token, sequence_id, note, from, amount, voteInfoArray } = methodArguments[0];
        const address = typeof(from) === 'undefined' ? this.moduleInstance.defaultAccount.address : from;
        if (typeof(voteInfoArray) === 'undefined') {
            throw new Error('vote info array is required!')
        }
        const method = true === this.use_transaction ? 'sendTransaction' : this._methodName;

        const txActionParam = actionParam.ActionAssetOutParam('', amount);

        const sourceAction = new SenderAction();
        sourceAction.set_action_type(xActionType.SourceNull);
        sourceAction.set_tx_sender_account_addr(address);
        sourceAction.set_action_param(txActionParam);

        const targetAction = new ReceiverAction();
        targetAction.set_tx_receiver_account_addr(config.VoteContract);
        targetAction.set_action_type(xActionType.RunConstract);
        targetAction.set_acton_name('abolish_vote');
        targetAction.set_action_param(this.initSetVoteArgs(voteInfoArray));
        
        this.parameters = argsLib.getDefaultArgs({
            address,
            sequence_id,
            token,
            latest_tx_hash_xxhash64,
            nonce,
            method,
            xTransactionType: xTransactionType.AbolishVote,
            sourceAction,
            targetAction,
            note
        });
        return this.parameters;
    }

    initSetVoteArgs(voteInfoArray) {
        if (!Array.isArray(voteInfoArray)) {
            return null;
        }
        let stream = new ByteBuffer().littleEndian();
        stream.int32(voteInfoArray.length);
        for (let i = 0; i < voteInfoArray.length; i++) {
            stream.string(voteInfoArray[i].nodeAddress);
            stream.int64(voteInfoArray[i].voteCount);
        }
        return stream.pack();
    }
}

module.exports = UnVoteNodeMethod;