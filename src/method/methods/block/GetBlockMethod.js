
const AbstractMethod = require('../../abstract/AbstractMethod');
const utils = require('../../../utils');

class GetBlockMethod extends AbstractMethod {

    constructor(moduleInstance) {
        super({
            methodName: 'get_block'
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
        let {
            account,
            blockType,
            type,
            height
        } = methodArguments[0] || {};
        account = account ? account : this.moduleInstance.defaultAccount;
        this.account = account;

        let { address, sequence_id, token } = account;
        blockType = blockType ? blockType : 2;
        type = type && (type == 'last' || type == 'height') ? type : 'last';

        let blockOwnerAddress = address;
        if (blockType && blockType == 3) {
            blockOwnerAddress = address + '-' + utils.addressToTableId(address);
        }

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
            params: { 
                action: this._methodName,
                account: blockOwnerAddress,
                type,
                block_type: blockType,
                unit_height: height
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