
const methods = require('./methods');

class MethodFactory {

    constructor(options = {}) {
        this.methods = methods;
        this.pollCount = options.pollCount;
        this.pollDelayTime = options.pollDelayTime;
    }

    /**
     * Checks if the method exists
     *
     * @method hasMethodModel
     *
     * @param {String} name
     *
     * @returns {Boolean}
     */
    hasMethod(name) {
        return typeof this.methods[name] !== 'undefined';
    }

    /**
     * Returns an MethodModel
     *
     * @param {String} name
     * @param {TopJs} moduleInstance
     *
     * @returns {AbstractMethod}
     */
    createMethod(name, moduleInstance) {
        const method = this.methods[name];

        if (method.Type === 'observed-transaction-method') {
            // eslint-disable-next-line new-cap
            const obMethod = new method(
                moduleInstance
            );
            obMethod.setAccountTransactionMethod(new methods.accountTransaction(moduleInstance));
            if (this.pollCount) {
                obMethod.pollCount = this.pollCount;
            }
            if (this.pollDelayTime) {
                obMethod.pollDelayTime = this.pollDelayTime;
            }
            return obMethod;
        }

        return new method(moduleInstance);
    }
}

module.exports = MethodFactory;