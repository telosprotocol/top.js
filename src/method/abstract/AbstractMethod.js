
class AbstractMethod {

    constructor(methodName, moduleInstance) {
        this.moduleInstance = moduleInstance;
        this._methodName = methodName;
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
            let response = await this.moduleInstance.currentProvider.send(this._methodName);

            if (response) {
                response = this.afterExecution(response);
            }

            if (this.callback) {
                this.callback(false, response);

                return;
            }

            return response;
        } catch (error) {
            if (this.callback) {
                this.callback(error, null);

                return;
            }

            throw error;
        }
    }
}
module.exports = AbstractMethod;