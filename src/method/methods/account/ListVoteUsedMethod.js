
const AbstractMethod = require('../../abstract/AbstractMethod');

class ListVoteUsedMethod extends AbstractMethod {

    constructor(moduleInstance) {
        super({
            methodName: 'listVoteUsed'
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
        let { address, sequence_id, token, account_addr } = methodArguments[0];
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
        let args = { account_addr:address };
        if (typeof(account_addr) !== 'undefined') {
            args['node_account_addr'] = account_addr;
        }
        const params = {
            params: { 
                account_addr: address,
                node_account_addr: typeof(account_addr) === 'undefined' ? address : account_addr
            }
        }
        parameters.body = JSON.stringify(params);
        return parameters;
    }
}

module.exports = ListVoteUsedMethod;