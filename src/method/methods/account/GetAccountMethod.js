
const AbstractMethod = require('../../abstract/AbstractMethod');

class GetAccountMethod extends AbstractMethod {

    constructor(moduleInstance) {
        super({
            methodName: 'getAccount'
        }, moduleInstance);
        this.account = null;
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
        let { address, sequence_id, token } = methodArguments[0] || {};
        address = typeof(address) === 'undefined' ? this.moduleInstance.defaultAccount.address : address;
        token = typeof(token) === 'undefined' ? '' : token;
        sequence_id = typeof(sequence_id) === 'undefined' ? new Date().getTime() : sequence_id;

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
            params: { account_addr: address }
        }
        parameters.body = JSON.stringify(params);
        return parameters;
    }

    /**
     * This method will be executed after the RPC request.
     *
     * @method afterExecution
     *
     * @param {*} response
     *
     * @returns {*}
     */
    afterExecution(response) {
        return response;
    }
}

module.exports = GetAccountMethod;