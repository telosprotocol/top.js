
const methods = require('./methods');

class MethodFactory {

    constructor() {
        this.methods = methods;
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
            return obMethod;
        }

        return new method(moduleInstance);
    }
}

module.exports = MethodFactory;