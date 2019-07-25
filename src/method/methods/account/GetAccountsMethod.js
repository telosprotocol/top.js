
const AbstractMethod = require('../../abstract/AbstractMethod');

class GetAccountsMethod extends AbstractMethod {

    constructor(moduleInstance) {
        super('account_info', moduleInstance);
    }
}

module.exports = GetAccountsMethod;