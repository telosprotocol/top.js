
const { ProvidersModuleFactory } = require('./providers');
const MethodFactory = require('./method/MethodFactory');
const MethodProxy = require('./method/MethodProxy');
const Accounts = require('./accounts');
const version = require('../package.json');
const axios = require('axios');
const utils = require('./utils');
const secp256k1 = require('secp256k1');
const ByteBuffer = require('./utils/ByteBuffer');

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
        let accountInfoResult = await this.getAccount({account});
        if (accountInfoResult && accountInfoResult.errno == 0 && accountInfoResult.data) {
            account.nonce = accountInfoResult.data.nonce;
            account.last_hash = accountInfoResult.data.last_hash;
            account.last_hash_xxhash64 = accountInfoResult.data.last_hash_xxhash64;
            return account;
        }
        throw new Error ('update account nonce and last hash failed');
    }

    /**
     * sign data, return sign result
     * @param {*} data 
     */
    async sign(data, privateKey) {
        const hash_buffer = Buffer.from(data);
        const private_key_buffer = Buffer.from(privateKey, 'hex');
        const secp256k1_sign = secp256k1.sign(hash_buffer, private_key_buffer);
        let stream = new ByteBuffer().littleEndian();
        stream.byte(secp256k1_sign.recovery).byteArray(secp256k1_sign.signature,secp256k1_sign.signature.length);
        const stream_array =  new Uint8Array(stream.pack());
        const auth_hex = "0x" + StringUtil.bytes2hex(stream_array);
        return auth_hex;
    }

    /**
     * sign tx, sign result will in the tx
     * @param {} data 
     */
    async signTransaction(data, privateKey){
        if (!data || !data.body) {
            throw new Error ('not transaction parameter object');
        }
        let paramsStr = data.body;
        let params;
        try {
            params = JSON.parse(paramsStr);
            if (!params || !params.params) {
                throw new Error ('not transaction parameter object');
            }
        } catch (error) {
            console.error(error);
            throw new Error ('parse transaction params error');
        }
        let txHash = params.params.transaction_hash;
        let authHex = this.sign(txHash.replace('0x',''), privateKey);
        params.params.authorization = authHex;
        data.body = JSON.stringify(params);
        return parameters;
    }

    /**
     * sign with the default account
     * @param {*} data 
     */
    async signAndSendTransaction(data){}
    async sendSignedTransaction(data, callback){
        try {
            if (!this.moduleInstance.currentProvider) {
                throw new Error('provider is null');
            }
            let response = await this.currentProvider.send(null, data);
            // if (response && response.errno == 0 && response.tx_hash) {
            //     let obResult = await this.observeTransaction(this.methodArguments[0].account, response.tx_hash);
            //     if (obResult) {
            //         response = obResult;
            //     }
            //     if (response.errno !== 0 && this._arguments.parameters.body) {
            //         response.data = JSON.parse(this._arguments.parameters.body);
            //     }
            // }
            // if (response) {
            //     response = this.afterExecution(response);
            // }
            if (callback) {
                callback(false, response);
                return;
            }
            return response;
        } catch (error) {
            if (callback) {
                callback(error, null);
                return;
            }
            throw error;
        }
    }

    async generateTx(args) {
        if (!args || !args.txMethod) {
            throw new Error('method name is require!')
        }
        return this[args.txMethod](args);
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