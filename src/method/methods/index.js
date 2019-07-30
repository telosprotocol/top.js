
// 驼峰规则，首字母改成小写

// Account
exports.accountInfo = require('./account/AccountInfoMethod');
exports.createAccount = require('./account/CreateAccountMethod');

// transaction
exports.requestToken = require('./account/RequestTokenMethod');
exports.transfer = require('./account/TransferMethod');