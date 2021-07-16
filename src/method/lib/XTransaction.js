'use strict';

const {sha256} = require('js-sha256');
const ByteBuffer = require("../../utils/ByteBuffer");
const StringUtil = require("../../utils");
const XAction = require('./XAction');

class XTransactionHeader {
    constructor() {
        this.transaction_type = 0;
        this.transaction_len = 0;
        this.tx_structure_version = 0;
        this.to_ledger_id = 0;
        this.from_ledger_id = 0;
        this.gas_price = 0;
        this.gas_limit = 0;
        this.deposit = 0;
        this.expire_duration = 0;
        this.send_timestamp = 0;
        this.tx_random_nonce = 0;
        this.premium_price = 0;
        this.last_tx_nonce  = 0;
        this.last_tx_hash  = "";
        this.confirm_action = "";
        this.authority_keys = "";
        this.ext = "";
        this.note = "";
    }

    serialize_write(stream) {
        const begin_pos = new Uint8Array(stream.pack()).length;
        last_trans_hash = this.last_tx_hash.replace("0x","");
        let le_last_trans_hash =  StringUtil.little_endian(last_trans_hash);
        const last_trans_hash_byte = StringUtil.hex2bytes(le_last_trans_hash);
        stream.ushort(this.transaction_type)
            .ushort(this.transaction_len)
            .uint32(this.tx_structure_version)
            .ushort(this.to_ledger_id)
            .ushort(this.from_ledger_id)
            .uint32(this.deposit)
            .ushort(this.expire_duration)
            .int64(this.send_timestamp)
            .uint32(this.tx_random_nonce)
            .uint32(this.premium_price)
            .int64(this.last_tx_nonce)
            .byteArray(last_trans_hash_byte,8)
            .string(this.challenge_proof)
            .string(this.ext)
            .string(this.note);
        const end_pos = new Uint8Array(stream.pack()).length;
        return end_pos - begin_pos;
    }

    get_transaction_type() {
        return this.transaction_type;
    }
    set_transaction_type(transaction_type) {
        this.transaction_type = transaction_type;
    }
    get_transaction_len() {
        return this.transaction_len;
    }
    set_transaction_len(transaction_len) {
        this.transaction_len = transaction_len;
    }
    get_tx_structure_version() {
        return this.tx_structure_version;
    }
    set_tx_structure_version(tx_structure_version) {
        this.tx_structure_version = tx_structure_version;
    }
    get_to_ledger_id() {
        return this.to_ledger_id;
    }
    set_to_ledger_id(to_ledger_id) {
        this.to_ledger_id = to_ledger_id;
    }
    get_from_ledger_id() {
        return this.from_ledger_id;
    }
    set_from_ledger_id(from_ledger_id) {
        this.from_ledger_id = from_ledger_id;
    }
    get_gas_price() {
        return this.gas_price;
    }
    set_gas_price(gas_price) {
        this.gas_price = gas_price;
    }
    get_gas_limit() {
        return this.gas_limit;
    }
    set_gas_limit(gas_limit) {
        this.gas_limit = gas_limit;
    }
    set_deposit(deposit) {
        this.deposit = deposit;
    }
    get_deposit() {
        return this.deposit;
    }
    get_expire_duration() {
        return this.expire_duration;
    }
    set_expire_duration(expire_duration) {
        this.expire_duration = expire_duration;
    }
    get_send_timestamp() {
        return this.send_timestamp;
    }
    set_send_timestamp(send_timestamp) {
        this.send_timestamp = send_timestamp;
    }

    get_tx_random_nonce() {
        return this.tx_random_nonce;
    }

    set_tx_random_nounce(tx_random_nonce) {
        this.tx_random_nonce = tx_random_nonce;
    }

    get_premium_price() {
        return this.premium_price;
    }
    set_premium_price(premium_price) {
        return  this.premium_price;
    }
    get_last_tx_nonce() {
        return this.last_tx_nonce;
    }
    set_last_tx_nonce(last_tx_nonce) {
        this.last_tx_nonce = last_tx_nonce;
    }
    get_last_tx_hash() {
        return this.last_tx_hash;
    }
    set_last_tx_hash(last_tx_hash) {
        this.last_tx_hash = last_tx_hash;
    }
    get_authority_keys() {
        return this.authority_keys;
    }
    set_authority_keys(authority_keys) {
        this.authority_keys = authority_keys;
    }
}

class XTransaction extends XTransactionHeader {
    constructor() {
        super();
        this.source_action = new XAction();
        this.target_action = new XAction();
        this.transaction_hash = undefined;
        this.authorization = "";
        this.public_key = "";
        this.edge_nodeid = "";
        this.ext = "";
        this.flag = 0;
        this.confirm_unit_info = {
            exec_status: 0
        };
    }
    serialize_write(stream) {
        const begin_pos = new Uint8Array(stream.pack()).length;
        super.serialize_write(stream);
        this.source_action.serialize_write(stream);
        this.target_action.serialize_write(stream);
        const end_pos = new Uint8Array(stream.pack()).length;
        return end_pos - begin_pos;
    }

    isSuccess(){
        return this.execStatus == 1;
    }

    get_source_action() {
        return this.source_action;
    }
    set_source_action(source_action) {
        this.source_action = source_action;
    }
    get_target_action() {
        return this.target_action;
    }
    set_target_action(target_action) {
        this.target_action = target_action;
    }
    get_transaction_hash() {
        return this.transaction_hash;
    }
    set_transaction_hash(transaction_hash) {
        this.transaction_hash = transaction_hash;
    }
    get_authorization() {
        return this.authorization;
    }
    set_authorization(authorization) {
        this.authorization = authorization;
    }
    get_public_key() {
        return this.public_key;
    }
    set_public_key(public_key) {
        this.public_key = public_key;
    }

    set_digest() {
        let stream = new ByteBuffer().littleEndian();
        this.serialize_write(stream);
        let hash = sha256.create();
        hash.update(stream.pack());
        const hash_array = hash.array();
        const hash_hex = hash.hex();
        this.transaction_hash = {array:hash_array,hex:"0x" + hash_hex};
    }
}

module.exports = XTransaction;
