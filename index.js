'use strict';

const {TransMode,TransBase} = require("./rpc/trans_base");
let {GLOBAL,g_user_info} = require("./model/global_defination");
const {APIMethodImpl} = require("./impl/api_method_impl");
const {http_handler_instance} = require("./rpc/http_handler");
const {StringUtil} = require('./base/string_util');

class TopJs {

    constructor(host) {
        GLOBAL.SERVER_HOST_PORT_HTTP = host;
        http_handler_instance.init();

        TransBase.s_default_mode = TransMode.HTTP;

        this.api_method_impl = new APIMethodImpl();
        let private_key_wrap = {key:""};
        let address_wrap = {address:""};
        this.api_method_impl.make_private_key(private_key_wrap,address_wrap);
        g_user_info.set_private_key(private_key_wrap.key);
        g_user_info.set_account(address_wrap.address);
    }

    get defaultAccount() {
        return g_user_info;
    }

    requestToken(cb) {
        this.api_method_impl.request_token(g_user_info, cb);
    }

    createAccount(cb) {
        this.api_method_impl.create_account(g_user_info, cb);
    }

    accountInfo(cb) {
        this.api_method_impl.account_info(g_user_info, cb);
    }

    transfer(to_account, cb) {
        const from_account = g_user_info.get_account();
        this.api_method_impl.transfer(g_user_info,from_account,to_account, 10, cb);
    }

    toString() {
        return '[object topjs]';
    }
}

module.exports = TopJs;
