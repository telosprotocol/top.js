
const AbstractMethod = require('../../abstract/AbstractMethod');

class QueryNodeRewardMethod extends AbstractMethod {

    constructor(moduleInstance) {
        super({
            methodName: 'get_node_reward'
        }, moduleInstance);
    }

    /**
     * This method will be executed for get params.
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
        let { address, sequence_id, token } = account;

        const {
            nodeAddress
        } = methodArguments[0];

        let parameters = {
            version: '1.0',
            target_account_addr: address,
            token,
            method: this._methodName,
            sequence_id
        }
        const params = {
            version: '1.0',
            method: this._methodName,
            target_account_addr: address,
            sequence_id,
            params: { account:address, target:nodeAddress }
        }
        parameters.body = JSON.stringify(params);
        return parameters;
    }
}

module.exports = QueryNodeRewardMethod;