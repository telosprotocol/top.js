const AbstractObservedTransactionMethod = require('../../abstract/AbstractObservedTransactionMethod');
const xActionType = require('../../model/XActionType');
const xTransactionType = require('../../model/XTransactionType');
const ByteBuffer = require('../../../utils/ByteBuffer');
const XAction = require('../../lib/XAction');
const argsLib = require('../../lib/ArgsLib');

class StakeVoteMethod extends AbstractObservedTransactionMethod {

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
        const lockTime = txArgs['lockTime'] || 0;
        const method = true === this.use_transaction ? 'send_transaction' : this._methodName;

        let stream = new ByteBuffer().littleEndian();
        stream.int64(amount).short(lockTime).string('');
        const txActionParam = stream.pack();

        const sourceAction = new XAction();
        sourceAction.set_action_type(xActionType.PledgeTokenVote);
        sourceAction.set_account_addr(address);
        sourceAction.set_action_param(txActionParam);

        const targetAction = new XAction();
        targetAction.set_account_addr(address);
        
        this.parameters = argsLib.getDefaultArgs({
            address,
            sequence_id,
            token,
            last_hash_xxhash64,
            nonce,
            method,
            xTransactionType: xTransactionType.PledgeTokenVote,
            sourceAction,
            targetAction,
            privateKeyBytes
        });
        return this.parameters;
    }
}

module.exports = StakeVoteMethod;