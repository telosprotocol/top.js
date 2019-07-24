
const { ProvidersModuleFactory } = require('./providers');
const MethodFactory = require('./method/MethodFactory');
const MethodProxy = require('./method/MethodProxy');
const Accounts = require('./accounts');
const version = require('../package.json');

class TopJs{
    constructor(provider, options = {}) {
        this.pmf = new ProvidersModuleFactory();
        this._currentProvider = this.pmf.resolve(provider, options);

        this.accounts = new Accounts();
        this.defaultAccount = this.accounts.generate();
        
        this.version = version;
        return new MethodProxy(this, new MethodFactory());
    }

    get currentProvider() {
        if (!this._currentProvider) {
            throw new Error ('Need set provider first');
        }
        return this._currentProvider;
    }

    /**
     * Throws an error because currentProvider is read-only
     *
     * @property currentProvider
     */
    set currentProvider(value) {
        throw new Error('The property currentProvider is read-only!');
    }

    /**
     * Sets the currentProvider and provider property
     *
     * @method setProvider
     *
     * @param {HttpProvider|String} provider
     * @param {Net} net
     *
     * @returns {Boolean|Error}
     */
    setProvider(provider, options) {
        const resolvedProvider = this.pmf.resolve(provider, options);
        this._currentProvider = resolvedProvider;
    }
}

module.exports = TopJs;