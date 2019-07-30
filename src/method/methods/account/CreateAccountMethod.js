
const AbstractMethod = require('../../abstract/AbstractMethod');
const xActionType = require('../../model/XActionType');
const xTransactionType = require('../../model/XTransactionType');

class CreateAccountMethod extends AbstractMethod {

    constructor(moduleInstance) {
        super({
            methodName: 'send_transaction',
            use_transaction: true,
            transationType: xTransactionType.CreateUserAccount,
            sourceType: xActionType.SourceNull,
            targetType: xActionType.CreateUserAccount,
        }, moduleInstance);
    }
}

module.exports = CreateAccountMethod;