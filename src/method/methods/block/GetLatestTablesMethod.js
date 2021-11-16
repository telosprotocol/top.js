
const AbstractMethod = require('../../abstract/AbstractMethod');
const utils = require('../../../utils');

class GetLatestTablesMethod extends AbstractMethod {

    constructor(moduleInstance) {
        super({
            methodName: 'getLatestTables'
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
            params: { 
                account_addr: 'T2000138JQPo5TcurZsVLFUMd5vHJRBLenLWjLhk6@0'
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

module.exports = GetLatestTablesMethod;