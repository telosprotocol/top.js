
const isFunction = require('lodash/isFunction');
const cloneDeep = require('lodash/cloneDeep');
const XTransaction = require('../lib/XTransaction');
const XAction = require('../lib/XAction');
const StringUtil = require("../../utils");
const secp256k1 = require('secp256k1');
const XActionType = require('../model/XActionType');
const ByteBuffer = require('ByteBuffer');

class AbstractMethod {

    constructor(argsObj = {}, moduleInstance) {
        this.moduleInstance = moduleInstance;
        if (!argsObj.methodName) {
            throw new Error('method name is required !');
        }
        this._methodName = argsObj.methodName;
        this._use_transaction = argsObj.use_transaction | false;
        this._transationType = argsObj.transationType;
        this._sourceType = argsObj.sourceType;
        this._targetType = argsObj._targetType;
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

    encode(){}

    /**
     * Setter for the arguments property
     *
     * @method setArguments
     *
     * @param {IArguments} methodArguments
     */
    setArguments(methodArguments) {
        
        const address = this.moduleInstance.defaultAccount.address;
        const sequence_id = this.moduleInstance.defaultAccount.sequence_id;
        const token = this.moduleInstance.defaultAccount.token;
        const privateKey = this.moduleInstance.defaultAccount.privateKey;
        const publicKey = this.moduleInstance.defaultAccount.publicKey;

        let parametersArray = cloneDeep([...methodArguments]);
        let callback = null;

        if (isFunction(parametersArray[parametersArray.length - 1])) {
            callback = parametersArray.pop();
        }
        // 调用子类的设置参数方法
        let parameters = this.addArgsKey(parametersArray);
        let baseArgs = {
            version: '1.0',
            account_address: address,
            method: this._methodName,
            sequence_id
        }
        Object.assign(parameters, baseArgs);

        const params = {
            version: '1.0',
            method: true === this.use_transaction ? 'send_transaction' : this._methodName,
            account_address: address,
            token,
            sequence_id,
            'rpc_signature::secretkey_key_': '',
            'rpc_signature::method_key_': '',
            'rpc_signature::version_key_': ''
        }
        const transAction = new XTransaction();
        transAction.set_transaction_type(this._transationType);
        transAction.set_last_trans_nonce(0);
        const cur_timestamp = Math.round(new Date() / 1000);
        transAction.set_fire_timestamp(cur_timestamp);
        transAction.set_expire_duration(100);
        transAction.set_last_trans_hash("0xF6E9BE5D70632CF5");
        
        if(this._use_transaction) {
            const sourceAction = new XAction();
            sourceAction.set_action_type(XActionType.SourceNull);
            sourceAction.set_account_addr(address);
            sourceAction.set_action_param(new Uint8Array(0));

            const targetAction = new XAction();
            targetAction.set_action_type(XActionType.CreateUserAccount);
            targetAction.set_account_addr(address);
            let sb =new ByteBuffer().littleEndian();
            let _a_params = sb.string(address).pack();
            targetAction.set_action_param(_a_params);
            
            transAction.set_source_action(sourceAction);
            transAction.set_target_action(targetAction);

            transAction.set_digest();
            const hash =  transAction.get_transaction_hash();
            const hash_buffer = Buffer.from(hash.array);
            const private_key_buffer = Buffer.from(privateKey);
            const secp256k1_sign = secp256k1.sign(hash_buffer, private_key_buffer);
            let stream = new ByteBuffer().littleEndian();
            stream.byte(secp256k1_sign.recovery).byteArray(secp256k1_sign.signature,secp256k1_sign.signature.length);
            const stream_array =  new Uint8Array(stream.pack());
            const auth_hex = "0x" + StringUtil.bytes2hex(stream_array);
            transAction.set_authorization(auth_hex);
            transAction.set_public_key("0x" + StringUtil.bytes2hex(publicKey));
        }



        parameters.body = JSON.stringify(parameters);
        this._arguments = {
            callback,
            parameters
        };
    }
}
module.exports = AbstractMethod;