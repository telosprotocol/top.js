
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
        let {
            account
        } = methodArguments[0] || {};
        account = account ? account : this.moduleInstance.defaultAccount;
        this.account = account;

        let { address, sequence_id, token } = account;

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
        if (response.errno !== 0) {
            return;
        }
        if (response.sequence_id) {
            this.account.sequence_id = response.sequence_id;
        }
        if (response.data && response.data.balance) {
            this.account.balance = response.data.balance;
        }
        if (response.data && response.data.last_hash) {
            this.account.last_hash = response.data.last_hash;
        }
        if (response.data && response.data.nonce) {
            this.account.nonce = response.data.nonce;
        }
        if (response.data && response.data.last_unit_height) {
            this.account.last_unit_height = response.data.last_unit_height;
        }
        if (response.data && response.data.last_hash_xxhash64) {
            this.account.last_hash_xxhash64 = response.data.last_hash_xxhash64;
        }
        return response;
    }
}

module.exports = GetAccountMethod;