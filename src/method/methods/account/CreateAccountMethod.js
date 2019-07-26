
const AbstractMethod = require('../../abstract/AbstractMethod');
const xActionType = require('../../model/XActionType');

class CreateAccountMethod extends AbstractMethod {

    constructor(moduleInstance) {
        super({
            methodName: 'send_transaction',
            use_transaction: true,
            transationType: 0,
            sourceAction: xActionType.SourceNull,
            targetAction: xActionType.CreateUserAccount,
        }, moduleInstance);
    }
}

module.exports = CreateAccountMethod;