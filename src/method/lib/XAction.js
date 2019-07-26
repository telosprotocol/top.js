'use strict';

const ByteBuffer = require("ByteBuffer");

class XAction {
    constructor() {
        this.m_action_hash = 0;
        this.m_action_type = 0;
        this.m_action_size = 0;
        this.m_account_addr = "";
        this.m_action_name = "";
        this.m_action_param = [];
        this.m_action_authorization = "";
    }

    serialize_write(stream) {
        const begin_pos = new Uint8Array(stream.pack()).length;
        stream.uint32(this.m_action_hash)
            .ushort(this.m_action_type)
            .ushort(this.m_action_size)
            .string(this.m_account_addr)
            .string(this.m_action_name);
        if(0 === this.m_action_param.length) {
            stream.string("")
                .string(this.m_action_authorization);
        } else {
            stream.uint32(this.m_action_param.length)
                .byteArray(this.m_action_param,this.m_action_param.length)
                .string(this.m_action_authorization);
        }

        const end_pos = new Uint8Array(stream.pack()).length;
        return end_pos - begin_pos;
    }

    get_action_hash() {
        return this.m_action_hash;
    }

    set_action_hash(action_hash) {
        this.m_action_hash = action_hash;
    }

    get_action_type() {
        return this.m_action_type;
    }

    set_action_type(action_type) {
        this.m_action_type = action_type;
    }

    get_action_size() {
        return this.m_action_size;
    }

    set_action_size(action_size) {
        this.m_action_size = action_size;
    }

    get_account_addr() {
        return this.m_account_addr;
    }

    set_account_addr(account_addr) {
        this.m_account_addr = account_addr;
    }

    get_action_name() {
        return this.m_action_name;
    }

    set_acton_name(action_name) {
        this.m_action_name = action_name;
    }

    get_action_param() {
        return this.m_action_param;
    }

    set_action_param(action_param) {
        this.m_action_param = action_param;
    }

    get_action_authorization() {
        return this.m_action_authorization;
    }

    set_action_authorization(action_authorization) {
        this.m_action_authorization = action_authorization;
    }

    sha2() {
        let stream = new ByteBuffer();
        stream.uint32(this.m_action_hash)
            .ushort(this.m_action_type)
            .ushort(this.m_action_size)
            .string(this.m_account_addr)
            .string(this.m_action_name)
            .string(this.m_action_param);
        const buffer = stream.pack();
        return hash.sha256().update(buffer).digest();
    }
}

module.exports = XAction;