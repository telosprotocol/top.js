
const isFunction = require('lodash/isFunction');
const cloneDeep = require('lodash/cloneDeep');

class AbstractMethod {

    constructor(methodName, moduleInstance) {
        this.moduleInstance = moduleInstance;
        this._methodName = methodName;
        this._arguments = {
            parameters: []
        };
    }

    /**
     * This method will be executed before the RPC request.
     *
     * @method beforeExecution
     *
     * @param {AbstractWeb3Module} moduleInstance - The package where the method is called from for example Eth.
     */
    beforeExecution(moduleInstance) {}

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
        return response;
    }

    async execute() {
        this.beforeExecution(this.moduleInstance);
        try {
            let response = await this.moduleInstance.currentProvider.send(this._methodName, this._arguments.parameters);
            if (response) {
                response = this.afterExecution(response);
            }
            if (this._arguments.callback) {
                this._arguments.callback(false, response);
                return;
            }
            return response;
        } catch (error) {
            if (this._arguments.callback) {
                this._arguments.callback(error, null);
                return;
            }
            throw error;
        }
    }

    /**
     * This method will be executed fot add arguments key.
     *
     * @method addArgsKey
     *
     * @param {*} methodArguments
     *
     * @returns {Object}
     */
    addArgsKey(methodArguments) {
        return {};
    }

    /**
     * Setter for the arguments property
     *
     * @method setArguments
     *
     * @param {IArguments} methodArguments
     */
    setArguments(methodArguments) {
        let parametersArray = cloneDeep([...methodArguments]);
        let callback = null;

        if (isFunction(parametersArray[parametersArray.length - 1])) {
            callback = parametersArray.pop();
        }
        let parameters = this.addArgsKey(parametersArray);
        let baseArgs = {
            version: '1.0',
            account_address: this.moduleInstance.defaultAccount.address,
            method: this._methodName,
            sequence_id: this.moduleInstance.defaultAccount.sequence_id
        }
        Object.assign(parameters, baseArgs);
        this._arguments = {
            callback,
            parameters
        };
    }
}
module.exports = AbstractMethod;