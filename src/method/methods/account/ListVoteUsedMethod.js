
const AbstractMethod = require('../../abstract/AbstractMethod');

class ListVoteUsedMethod extends AbstractMethod {

    constructor(moduleInstance) {
        super({
            methodName: 'get_vote_dist'
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
        
        let parameters = {
            version: '1.0',
            account_address: address,
            token,
            method: this._methodName,
            sequence_id
        }
        const params = {
            version: '1.0',
            method: this._methodName,
            account_address: address,
            sequence_id,
            params: { account:address }
        }
        parameters.body = JSON.stringify(params);
        return parameters;
    }
}

module.exports = ListVoteUsedMethod;