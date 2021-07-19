'use strict';

const {sha256} = require('js-sha256');
const ByteBuffer = require("../../utils/ByteBuffer");
const StringUtil = require("../../utils");
const XAction = require('./XAction');

class XTransactionHeader {
    constructor() {
        this.tx_type = 0;
        this.tx_len = 0;
        this.tx_structure_version = 0;
        this.to_ledger_id = 0;
        this.from_ledger_id = 0;
        this.tx_deposit = 0;
        this.tx_expire_duration = 0;
        this.send_timestamp = 0;
        this.tx_random_nonce = 0;
        this.premium_price = 0;
        this.last_tx_nonce  = 0;
        this.last_tx_hash  = "";
        this.tx_hash  = "";
        this.ext = "";
        this.note = "";
        this.challenge_proof = "";
    }

    serialize_write(stream) {
        const begin_pos = new Uint8Array(stream.pack()).length;
        let last_trans_hash = this.last_tx_hash.replace("0x","");
        let le_last_trans_hash =  StringUtil.little_endian(last_trans_hash);
        const last_trans_hash_byte = StringUtil.hex2bytes(le_last_trans_hash);
        stream.ushort(this.tx_type)
            .ushort(this.tx_len)
            .uint32(this.tx_structure_version)
            .ushort(this.to_ledger_id)
            .ushort(this.from_ledger_id)
            .uint32(this.tx_deposit)
            .ushort(this.tx_expire_duration)
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

    get_tx_type() {
        return this.tx_type;
    }
    set_tx_type(tx_type) {
        this.tx_type = tx_type;
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
        this.premium_price = premium_price;
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
    get_tx_hash() {
        return this.tx_hash;
    }
    set_tx_hash(tx_hash) {
        this.tx_hash = tx_hash;
    }
    get_note() {
        return this.note;
    }
    set_note(note) {
        this.note = note;
    }
}

class XTransaction extends XTransactionHeader {
    constructor() {
        super();
        this.authorization = "";

        this.sender_action = new XAction();
        this.receiver_action = new XAction();
        this.public_key = "";
        this.ext = "";
        this.confirm_unit_info = {
            exec_status: 0
        };
    }
    serialize_write(stream) {
        const begin_pos = new Uint8Array(stream.pack()).length;
        super.serialize_write(stream);
        this.sender_action.serialize_write(stream);
        this.receiver_action.serialize_write(stream);
        const end_pos = new Uint8Array(stream.pack()).length;
        return end_pos - begin_pos;
    }

    isSuccess(){
        return this.execStatus == 1;
    }

    get_sender_action() {
        return this.sender_action;
    }
    set_sender_action(sender_action) {
        this.sender_action = sender_action;
    }
    get_receiver_action() {
        return this.receiver_action;
    }
    set_receiver_action(receiver_action) {
        this.receiver_action = receiver_action;
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
        this.tx_hash = {array:hash_array,hex:"0x" + hash_hex};
    }
}

module.exports = XTransaction;
