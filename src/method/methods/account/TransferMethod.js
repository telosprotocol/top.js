
const AbstractMethod = require('../../abstract/AbstractMethod');
const xActionType = require('../../model/XActionType');
const xTransactionType = require('../../model/XTransactionType');

class TransferMethod extends AbstractMethod {

    constructor(moduleInstance) {
        super({
            methodName: 'send_transaction',
            use_transaction: true,
            transationType: xTransactionType.Transfer,
            sourceType: xActionType.AssertOut,
            targetType: xActionType.AssetIn,
        }, moduleInstance);
    }
}

module.exports = TransferMethod;