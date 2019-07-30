
const AbstractMethod = require('../../abstract/AbstractMethod');

class AccountInfoMethod extends AbstractMethod {

    constructor(moduleInstance) {
        super({
            methodName: 'account_info'
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
            params: { account: address }
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
        if (response.data && response.data.balance) {
            this.moduleInstance.defaultAccount.balance = response.data.balance;
        }
        if (response.data && response.data.last_hash) {
            this.moduleInstance.defaultAccount.last_hash = response.data.last_hash;
        }
        if (response.data && response.data.nonce) {
            this.moduleInstance.defaultAccount.nonce = response.data.nonce;
        }
        if (response.data && response.data.last_unit_height) {
            this.moduleInstance.defaultAccount.last_unit_height = response.data.last_unit_height;
        }
        if (response.data && response.data.last_hash_xxhash64) {
            this.moduleInstance.defaultAccount.last_hash_xxhash64 = response.data.last_hash_xxhash64;
        }
        return response;
    }
}

module.exports = AccountInfoMethod;