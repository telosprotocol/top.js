
const AbstractMethod = require('../../abstract/AbstractMethod');

class PassportMethod extends AbstractMethod {

    constructor(moduleInstance) {
        super({
            methodName: 'requestToken',
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
        const address = this.moduleInstance.defaultAccount.address;
        const sequence_id = this.moduleInstance.defaultAccount.sequence_id;
        const token = this.moduleInstance.defaultAccount.token;

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
            // 'rpc_signature::secretkey_key_': '',
            // 'rpc_signature::method_key_': '',
            // 'rpc_signature::version_key_': '',
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
        if (response.errno !== 0) {
            throw new Error('request token get error');
        }
        if (response.sequence_id) {
            this.moduleInstance.defaultAccount.sequence_id = response.sequence_id;
        }
        if (response.data && response.data.identity_token) {
            this.moduleInstance.defaultAccount.token = response.data.identity_token;
        }
        return response;
    }
}

module.exports = PassportMethod;