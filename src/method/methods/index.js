
// 驼峰规则，首字母改成小写

// Account
exports.accountInfo = require('./account/AccountInfoMethod');
exports.createAccount = require('./account/CreateAccountMethod');
exports.accountTransaction = require('./account/AccountTransactionMethod');
exports.claimReward = require('./account/ClaimRewardMethod');
exports.getVoterReward = require('./account/GetVoterRewardMethod');

// transaction
exports.requestToken = require('./account/RequestTokenMethod');
exports.transfer = require('./account/TransferMethod');

// contract
exports.publishContract = require('./account/PublishContractMethod');
exports.getProperty = require('./account/GetPropertyMethod');
exports.callContract = require('./account/CallContractMethod');

// pledge nad redeem
exports.pledgeDisk = require('./account/PledgeDiskMethod');
exports.pledgeTgas = require('./account/PledgeTGasMethod');
exports.redeemDisk = require('./account/RedeemDiskMethod');
exports.redeemTgas = require('./account/RedeemTgasMethod');

// node register and deRegister
exports.nodeRegister = require('./node/NodeRegisterMethod');
exports.nodeDeRegister = require('./node/NodeDeRegisterMethod');
exports.getNodeInfo = require('./node/NodeInfoMethod');
exports.getNodeReward = require('./node/GetNodeRewardMethod');
exports.claimNodeReward = require('./node/ClaimNodeRewardMethod');
exports.redeem = require('./node/RedeemMethod');

// block
exports.getBlock = require('./block/GetBlockMethod');

// chainInfo
exports.getChainInfo = require('./chain/ChainInfoMethod');

// vote
exports.pledgeTokenVote = require('./account/PledgeTokenVoteMethod');
exports.redeemTokenVote = require('./account/RedeemTokenVoteMethod');
exports.setVote = require('./account/SetVoteMethod');
exports.abolishVote = require('./account/AbolishVoteMethod');