
const AbstractMethod = require('../../abstract/AbstractMethod');

class RequestTokenMethod extends AbstractMethod {

    constructor(moduleInstance) {
        super({
            methodName: 'request_token',
            use_transaction: false
        }, moduleInstance);
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
        if (response.errno === 0) {
            this.moduleInstance.defaultAccount.token = response.data.token;
        }
        return response;
    }
}

module.exports = RequestTokenMethod;