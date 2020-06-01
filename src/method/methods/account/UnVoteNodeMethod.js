const AbstractObservedTransactionMethod = require('../../abstract/AbstractObservedTransactionMethod');
const xActionType = require('../../model/XActionType');
const xTransactionType = require('../../model/XTransactionType');
const actionParam = require('../../../utils/ActionParam');
const ByteBuffer = require('../../../utils/ByteBuffer');
const XAction = require('../../lib/XAction');
const argsLib = require('../../lib/ArgsLib');
const config = require('../../model/Config');

class UnVoteNodeMethod extends AbstractObservedTransactionMethod {

    constructor(moduleInstance) {
        super({
            methodName: 'send_transaction',
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
        let {
            account
        } = methodArguments[0] || {};
        account = account ? account : this.moduleInstance.defaultAccount;

        let { address, sequence_id, token, privateKeyBytes, last_hash_xxhash64, nonce, } = account;

        if (methodArguments.length !== 1) {
            throw new Error('transfer args length is not right');
        }
        const txArgs = methodArguments[0];
        address = txArgs['from'] || account.address;
        const amount = txArgs['amount'] || 0;
        const voteInfoArray = txArgs['voteInfoArray'] || {};
        const method = true === this.use_transaction ? 'send_transaction' : this._methodName;

        const txActionParam = actionParam.ActionAssetOutParam('', amount, '');

        const sourceAction = new XAction();
        sourceAction.set_action_type(xActionType.AssertOut);
        sourceAction.set_account_addr(address);
        sourceAction.set_action_param(txActionParam);

        const targetAction = new XAction();
        targetAction.set_account_addr(config.VoteContract);
        targetAction.set_action_type(xActionType.RunConstract);
        targetAction.set_acton_name('abolish_vote');
        targetAction.set_action_param(this.initSetVoteArgs(voteInfoArray));
        
        this.parameters = argsLib.getDefaultArgs({
            address,
            sequence_id,
            token,
            last_hash_xxhash64,
            nonce,
            method,
            xTransactionType: xTransactionType.AbolishVote,
            sourceAction,
            targetAction,
            privateKeyBytes
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