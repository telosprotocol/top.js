
const AbstractMethod = require('../../abstract/AbstractMethod');

class RequestTokenMethod extends AbstractMethod {

    constructor(moduleInstance) {
        super('request_token', moduleInstance);
    }

    /**
     * This method will be executed before the RPC request.
     *
     * @method beforeExecution
     *
     * @param {TopJs} moduleInstance - The package where the method is called from for example Eth.
     */
    beforeExecution(moduleInstance) {
        console.log(moduleInstance.defaultAccount);
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
        console.log('request token after excute > ', response);
    }
}

module.exports = RequestTokenMethod;