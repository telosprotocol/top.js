
const AbstractMethod = require('../../abstract/AbstractMethod');
const StringUtil = require("../../../utils");

class GetTransactionMethod extends AbstractMethod {

    constructor(moduleInstance) {
        super({
            methodName: 'getTransaction'
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
        let { address, sequence_id, token, txHash } = methodArguments[0];
        address = typeof(address) === 'undefined' ? this.moduleInstance.defaultAccount.address : address;
        token = typeof(token) === 'undefined' ? '' : token;
        sequence_id = typeof(sequence_id) === 'undefined' ? new Date().getTime() : sequence_id;

        if (!txHash) {
            throw new Error('tx hash is required!');
        }
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
                account_addr: address,
                tx_hash: txHash
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
        // if (response.errno == 0) {
            // const ap = response.data.target_action.action_param;
            // const ss = StringUtil.hex2bytes(ap.replace('0x', ''));
            // const r = Buffer.from(ss).toString('utf8', 16, ss.length)
            // console.log(r);
        // }
        return response;
    }
}

module.exports = GetTransactionMethod;