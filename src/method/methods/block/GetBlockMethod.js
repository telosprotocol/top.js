
const AbstractMethod = require('../../abstract/AbstractMethod');
const utils = require('../../../utils');

class GetBlockMethod extends AbstractMethod {

    constructor(moduleInstance) {
        super({
            methodName: 'getBlock'
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

        let { address, sequence_id, token, tableBlockAddress, height, version } = methodArguments[0] || {};
        address = typeof(address) === 'undefined' ? this.moduleInstance.defaultAccount.address : address;
        version = typeof(version) === 'undefined' ? '2.0' : version;
        token = typeof(token) === 'undefined' ? '' : token;
        sequence_id = typeof(sequence_id) === 'undefined' ? new Date().getTime() : sequence_id;

        let parameters = {
            version,
            target_account_addr: address,
            token,
            method: this._methodName,
            sequence_id
        }
        const params = {
            version,
            method: this._methodName,
            target_account_addr: address,
            sequence_id,
            params: { 
                action: this._methodName,
                account_addr: tableBlockAddress,
                height
             }
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
            throw new Error(response.errmsg);
        }
        return response;
    }
}

module.exports = GetBlockMethod;