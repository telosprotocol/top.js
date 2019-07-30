
const AbstractMethod = require('../../abstract/AbstractMethod');

class AccountInfoMethod extends AbstractMethod {

    constructor(moduleInstance) {
        super({
            methodName: 'account_info',
            use_transaction: false
        }, moduleInstance);
    }
}

module.exports = AccountInfoMethod;