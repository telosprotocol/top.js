
const AbstractMethod = require('../../abstract/AbstractMethod');

class RequestTokenMethod extends AbstractMethod {

    constructor(moduleInstance) {
        super('request_token', moduleInstance);
    }
}

module.exports = RequestTokenMethod;