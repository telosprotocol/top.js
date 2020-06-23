const AbstractMethod = require('./AbstractMethod');

class AbstractObservedTransactionMethod extends AbstractMethod {
    constructor(argsObj = {}, moduleInstance, ) {
        super(argsObj, moduleInstance);
        this.accountTransactionMethod = null;
        this.pollCount = 100;
        this.pollDelayTime = 3000;
    }

    /**
     * This type will be used in the AbstractMethodFactory and BatchRequest class
     *
     * @returns {String}
     */
    static get Type() {
        return 'observed-transaction-method';
    }

    setAccountTransactionMethod(accountTransactionMethod) {
        this.accountTransactionMethod = accountTransactionMethod;
    }

    async execute() {
        this.beforeExecution(this.moduleInstance);
        try {
            if (!this.moduleInstance.currentProvider) {
                throw new Error('provider is null');
            }
            let response = await this.moduleInstance.currentProvider.send(this._methodName, this._arguments.parameters);
            if (response && response.errno == 0 && response.tx_hash) {
                let obResult = await this.observeTransaction(this.methodArguments[0].account, response.tx_hash);
                if (obResult) {
                    response = obResult;
                }
                if (response.errno !== 0 && this._arguments.parameters.body) {
                    response.data = JSON.parse(this._arguments.parameters.body);
                }
            }
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
     * Observes the transaction by the given transactionHash
     *
     * @method observe
     *
     * @param {String} transactionHash
     *
     * @returns {Rx}
     */
    async observeTransaction(account, tx_hash) {
        return new Promise((resolve, reject) => {
            let count = 0;
            let interval = setInterval(async () => {
                try {
                    await this.accountTransactionMethod.setArguments([{
                        txHash: tx_hash,
                        account
                    }]);
                    let resultTemp = await this.accountTransactionMethod.execute();
                    count++;
                    if (resultTemp && resultTemp.errno == 0 && resultTemp.data && resultTemp.data.confirm_unit_info && resultTemp.data.confirm_unit_info.exec_status == 1) {
                        clearInterval(interval);
                        resolve(resultTemp);
                    } else if (resultTemp && resultTemp.errno != 0 && resultTemp.errno != 11) {
                        clearInterval(interval);
                        resolve(resultTemp);
                    }
                    if (count >= this.pollCount) {
                        clearInterval(interval);
                        resolve(resultTemp);
                    }
                } catch (error) {
                    clearInterval(interval);
                    resolve(null);
                }
            }, this.pollDelayTime);
            
        });
    }
}


module.exports = AbstractObservedTransactionMethod;