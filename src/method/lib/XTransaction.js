'use strict';

const {sha256} = require('js-sha256');
const ByteBuffer = require("../../utils/ByteBuffer");
const StringUtil = require("../../utils");
const XTransactionType = require('../model/XTransactionType');

class XTransaction {
    constructor() {
        this.amount = 0
        this.authorization = "";
        this.edge_nodeid = "";
        this.ext = "";
        this.last_tx_nonce  = 0;
        this.note = "";
        this.premium_price = 0;
        this.receiver_account = "";
        this.receiver_action_name = "";
        this.receiver_action_param = "";
        this.send_timestamp = 0;
        this.sender_account = "";
        this.sender_action_name = "";
        this.sender_action_param = "";
        this.token_name = "";
        this.tx_deposit = 0;
        this.tx_expire_duration = 0;
        this.tx_hash  = "";
        this.tx_len = 0;
        this.tx_structure_version = 0;
        this.tx_type = 0;

        this.confirm_unit_info = {
            exec_status: 0
        };
    }
    serialize_write(stream) {
        const begin_pos = new Uint8Array(stream.pack()).length;
        stream.ushort(this.tx_type)
            .ushort(this.tx_expire_duration)
            .int64(this.send_timestamp)
            .string(this.sender_account)
            .string(this.receiver_account)
            .string(this.edge_nodeid)
            .int64(this.amount)
            .string(this.token_name)
            .int64(this.last_tx_nonce)
            .uint32(this.tx_deposit)
            .uint32(this.premium_price)
            .string(this.note)
            .string(this.ext);

        if(this.tx_type != XTransactionType.Transfer) {
            stream.string(this.sender_action_name);
            if(0 === this.sender_action_param.length) {
                stream.string("");
            } else {
                stream.uint32(this.sender_action_param.length)
                    .byteArray(this.sender_action_param,this.sender_action_param.length);
            }
            stream.string(this.receiver_action_name);
            if(0 === this.receiver_action_param.length) {
                stream.string("");
            } else {
                stream.uint32(this.receiver_action_param.length)
                    .byteArray(this.receiver_action_param,this.receiver_action_param.length);
            }
        }
        const end_pos = new Uint8Array(stream.pack()).length;
        return end_pos - begin_pos;
    }

    get_amount() {
        return this.amount;
    }
    set_amount(amount){
        this.amount = amount;
    }

    get_authorization() {
        return this.authorization;
    }
    set_authorization(authorization) {
        this.authorization = authorization;
    }

    get_edge_nodeid() {
        return this.edge_nodeid;
    }
    set_edge_nodeid(edge_nodeid){
        this.edge_nodeid = edge_nodeid;
    }

    get_ext() {
        return this.ext;
    }
    set_ext(ext) {
        this.ext = ext;
    }

    get_last_tx_nonce() {
        return this.last_tx_nonce;
    }
    set_last_tx_nonce(last_tx_nonce) {
        this.last_tx_nonce = last_tx_nonce;
    }

    get_note() {
        return this.note;
    }
    set_note(note) {
        this.note = note;
    }

    get_premium_price() {
        return this.premium_price;
    }
    set_premium_price(premium_price) {
        this.premium_price = premium_price;
    }

    get_receiver_account() {
        return this.receiver_account;
    }
    set_receiver_account(receiver_account) {
        this.receiver_account = receiver_account;
    }

    get_receiver_action_name() {
        return this.receiver_action_name;
    }
    set_receiver_action_name(receiver_action_name) {
        this.receiver_action_name = receiver_action_name;
    }

    get_receiver_action_param() {
        return this.receiver_action_param;
    }
    set_receiver_action_param(receiver_action_param) {
        this.receiver_action_param = receiver_action_param;
    }
    get_send_timestamp() {
        return this.send_timestamp;
    }
    set_send_timestamp(send_timestamp) {
        this.send_timestamp = send_timestamp;
    }

    get_sender_account() {
        return this.sender_account;
    }
    set_sender_account(sender_account) {
        this.sender_account = sender_account;
    }

    get_sender_action_name() {
        return this.sender_action_name;
    }
    set_sender_action_name(sender_action_name) {
        this.sender_action_name = sender_action_name;
    }

    get_sender_action_param() {
        return this.sender_action_param;
    }
    set_sender_action_param(sender_action_param) {
        this.sender_action_param = sender_action_param;
    }

    get_token_name() {
        return this.token_name;
    }
    set_token_name(token_name) {
        this.token_name = token_name;
    }
    set_tx_deposit(tx_deposit) {
        this.tx_deposit = tx_deposit;
    }
    get_tx_deposit() {
        return this.tx_deposit;
    }
    get_tx_expire_duration() {
        return this.tx_expire_duration;
    }
    set_tx_expire_duration(tx_expire_duration) {
        this.tx_expire_duration = tx_expire_duration;
    }
    get_tx_hash() {
        return this.tx_hash;
    }
    set_tx_hash(tx_hash) {
        this.tx_hash = tx_hash;
    }
    get_tx_len() {
        return this.tx_len;
    }
    set_tx_len(tx_len) {
        this.tx_len = tx_len;
    }
    get_tx_structure_version() {
        return this.tx_structure_version;
    }
    set_tx_structure_version(tx_structure_version) {
        this.tx_structure_version = tx_structure_version;
    }
    get_tx_type() {
        return this.tx_type;
    }
    set_tx_type(tx_type) {
        this.tx_type = tx_type;
    }

    isSuccess(){
        return this.execStatus == 1;
    }

    set_digest() {
        let stream = new ByteBuffer().littleEndian();
        this.serialize_write(stream);
        let hash = sha256.create();
        hash.update(stream.pack());
        const hash_array = hash.array();
        const hash_hex = hash.hex();
        this.tx_hash = {array:hash_array,hex:"0x" + hash_hex};
    }
}

module.exports = XTransaction;
