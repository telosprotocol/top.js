
const AbstractMethod = require('../../abstract/AbstractMethod');

class GetAccountsMethod extends AbstractMethod {

    constructor(moduleInstance) {
        super('account_info', moduleInstance);
    }

    /**
     * This method will be executed after the RPC request.
     *
     * @method afterExecution
     *
     * @param {Object} response
     *
     * @returns {Array}
     */
    afterExecution(response) {
        // return response.map((responseItem) => {
        //     return this.utils.toChecksumAddress(responseItem);
        // });
        console.log('account info after excute > ', response);
    }
}

module.exports = GetAccountsMethod;