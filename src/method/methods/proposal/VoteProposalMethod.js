const AbstractObservedTransactionMethod = require('../../abstract/AbstractObservedTransactionMethod');
const xActionType = require('../../model/XActionType');
const xTransactionType = require('../../model/XTransactionType');
const actionParam = require('../../../utils/ActionParam');
const ByteBuffer = require('../../../utils/ByteBuffer');
const XAction = require('../../lib/XAction');
const argsLib = require('../../lib/ArgsLib');
const config = require('../../model/Config');

class VoteProposalMethod extends AbstractObservedTransactionMethod {

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
        address = account.address;
        const proposal = txArgs['proposal'] || {};
        const method = true === this.use_transaction ? 'send_transaction' : this._methodName;

        const { proposalId, parameter, origValue, newValue, modificationDescription, proposalClientAddress, deposit, chainTimerHeight, updateType, priority} = proposal;
        let stream = new ByteBuffer().littleEndian();
        stream.string(proposalId).string(parameter).string(origValue).string(newValue).string(modificationDescription).string(proposalClientAddress).int64(deposit).int64(chainTimerHeight).string(updateType).short(priority);
        const txActionParam = stream.pack();

        const sourceAction = new XAction();
        sourceAction.set_action_type(xActionType.AssertOut);
        sourceAction.set_account_addr(address);

        const targetAction = new XAction();
        targetAction.set_action_type(xActionType.RunConstract);
        targetAction.set_account_addr(config.BeaconCgc);
        targetAction.set_action_param(txActionParam);
        targetAction.set_acton_name("add_proposal")
        
        this.parameters = argsLib.getDefaultArgs({
            address,
            sequence_id,
            token,
            last_hash_xxhash64,
            nonce,
            method,
            xTransactionType: xTransactionType.RunContract,
            sourceAction,
            targetAction,
            privateKeyBytes
        });
        return this.parameters;
    }
}

module.exports = VoteProposalMethod;