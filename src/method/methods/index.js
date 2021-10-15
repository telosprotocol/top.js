
// 驼峰规则，首字母改成小写

// Account
exports.getAccount = require('./account/GetAccountMethod');
exports.createAccount = require('./account/CreateAccountMethod');
exports.getTransaction = require('./account/GetTransactionMethod');
exports.claimVoterDividend = require('./account/ClaimVoterDividendMethod');
exports.queryVoterDividend = require('./account/QueryVoterDividendMethod');
exports.listVoteUsed = require('./account/ListVoteUsedMethod');

// transaction
exports.passport = require('./account/PassportMethod');
exports.transfer = require('./account/TransferMethod');

// contract
exports.deployContract = require('./account/DeployContractMethod');
exports.getProperty = require('./account/GetPropertyMethod');
exports.callContract = require('./account/CallContractMethod');

// pledge nad redeem
exports.stakeDisk = require('./account/StakeDiskMethod');
exports.stakeGas = require('./account/StakeGasMethod');
exports.unStakeDisk = require('./account/UnStakeDiskMethod');
exports.unStakeTgas = require('./account/UnStakeGasMethod');

// node register and deRegister
exports.registerNode = require('./node/RegisterNodeMethod');
exports.unRegisterNode = require('./node/UnRegisterNodeMethod');
exports.queryNodeInfo = require('./node/QueryNodeInfoMethod');
exports.queryNodeReward = require('./node/QueryNodeRewardMethod');
exports.claimNodeReward = require('./node/ClaimNodeRewardMethod');
exports.redeemNodeDeposit = require('./node/RedeemNodeDepositMethod');
exports.setDividendRate = require('./node/SetDividendRateMethod');
exports.setNickname = require('./node/SetNicknameMethod');
exports.stakeDeposit = require('./node/StakeDepositMethod');
exports.unStakeDeposit = require('./node/UnStakeDepositMethod');
exports.udpateNodeType = require('./node/UpdateNodeTypeMethod');

// block
exports.getBlock = require('./block/GetBlockMethod');

// chainInfo
exports.getChainInfo = require('./chain/GetChainInfoMethod');
exports.getEdgeStatus = require('./chain/GetEdgeStatusMethod');
exports.getCGP = require('./chain/GetCGPMethod');

// vote
exports.stakeVote = require('./account/StakeVoteMethod');
exports.unStakeVote = require('./account/UnStakeVoteMethod');
exports.voteNode = require('./account/VoteNodeMethod');
exports.unVoteNode = require('./account/UnVoteNodeMethod');

// proposal
exports.submitProposal = require('./proposal/SubmitProposalMethod');
exports.tccVote = require('./proposal/TCCVoteMethod');
exports.withdrawProposal = require('./proposal/WithdrawProposalMethod');
exports.queryProposal = require('./proposal/QueryProposalMethod');