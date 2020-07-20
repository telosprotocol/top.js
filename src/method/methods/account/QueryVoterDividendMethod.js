
const AbstractMethod = require('../../abstract/AbstractMethod');

class QueryVoterDividendMethod extends AbstractMethod {

    constructor(moduleInstance) {
        super({
            methodName: 'get_voter_reward'
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

        let {
            voterAddress
        } = methodArguments[0];

        voterAddress = voterAddress ? voterAddress : address;

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
            params: { account:address, target:voterAddress }
        }
        parameters.body = JSON.stringify(params);
        return parameters;
    }
}

module.exports = QueryVoterDividendMethod;