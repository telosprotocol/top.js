
class Account{

    constructor(options) {
        this.address = options.address;
        this.privateKey = options.privateKey;
        this.publicKey = options.publicKey;
        this._sequence_id = options.sequence_id || Date.now();
    }

    get sequence_id() {
        return this._sequence_id + 1;
    }
}

module.exports = Account;