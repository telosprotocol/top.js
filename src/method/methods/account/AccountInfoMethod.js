
const AbstractMethod = require('../../abstract/AbstractMethod');

class AccountInfoMethod extends AbstractMethod {

    constructor(moduleInstance) {
        super({
            methodName: 'account_info'
        }, moduleInstance);
    }
}

module.exports = AccountInfoMethod;