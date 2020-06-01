const AbstractObservedTransactionMethod = require('../../abstract/AbstractObservedTransactionMethod');
const xActionType = require('../../model/XActionType');
const xTransactionType = require('../../model/XTransactionType');
const XAction = require('../../lib/XAction');
const argsLib = require('../../lib/ArgsLib');
const config = require('../../model/Config');

class UnRegisterNodeMethod extends AbstractObservedTransactionMethod {

    constructor(moduleInstance) {
        super({
            methodName: 'send_transaction',
            use_transaction: true
        }, moduleInstance);
        this.parameters = null;
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
        const method = true === this.use_transaction ? 'send_transaction' : this._methodName;

        const sourceAction = new XAction();
        sourceAction.set_action_type(xActionType.AssertOut);
        sourceAction.set_account_addr(address);

        const targetAction = new XAction();
        targetAction.set_action_type(xActionType.RunConstract);
        targetAction.set_account_addr(config.Registeration);
        targetAction.set_acton_name("node_deregister");
        
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

module.exports = UnRegisterNodeMethod;