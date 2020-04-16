
const { ProvidersModuleFactory } = require('./providers');
const MethodFactory = require('./method/MethodFactory');
const MethodProxy = require('./method/MethodProxy');
const Accounts = require('./accounts');
const version = require('../package.json');
const axios = require('axios');
const utils = require('./utils');

class TopJs{
    constructor(provider, options = {}) {
        this.pmf = new ProvidersModuleFactory();
        if (provider) {
            this._currentProvider = this.pmf.resolve(provider, options);
        }

        this.accounts = new Accounts();
        this.defaultAccount = this.accounts.generate();
        
        this.version = version;
        this.utils = utils;
        return new MethodProxy(this, new MethodFactory(options));
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

    async updateNonceAndLastHash(account) {
        account = account ? account : this.defaultAccount;
        let accountInfoResult = await this.accountInfo({account});
        if (accountInfoResult && accountInfoResult.errno == 0 && accountInfoResult.data) {
            account.nonce = accountInfoResult.data.nonce;
            account.last_hash = accountInfoResult.data.last_hash;
            account.last_hash_xxhash64 = accountInfoResult.data.last_hash_xxhash64;
            return;
        }
        throw new Error ('update account nonce and last hash failed');
    }

    async getDefaultServerUrl(dnsurl, portType) {
        portType = portType ? portType : 'http';
        dnsurl = dnsurl || 'http://testnet.topnetwork.org/'
        // default http provider url
        const response = await axios.get(dnsurl);
        if (response.status !== 200) {
            return null;
        }
        const serverObj = response.data;
        if (!serverObj || !serverObj.address || !serverObj.address.edge || !serverObj.port || !serverObj.port.edge){
            return null;
        }
        let edgeAddressArray = serverObj.address.edge;
        let edgePort = serverObj.port.edge;
        if (edgeAddressArray.length <= 0 || !edgePort[portType]) {
            return null;
        }
        let index = Math.floor(Math.random() * edgeAddressArray.length);
        let host = edgeAddressArray[index];
        let port = edgePort[portType];
        return portType + '://' + host + ':' + port;
    }
}

module.exports = TopJs;