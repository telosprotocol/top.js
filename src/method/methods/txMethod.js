
// 驼峰规则，首字母改成小写

// Account
exports.claimVoterDividend = require('./account/ClaimVoterDividendMethod');

// transaction
exports.transfer = require('./account/TransferMethod');

// vote
exports.stakeVote = require('./account/StakeVoteMethod');
exports.unStakeVote = require('./account/UnStakeVoteMethod');
exports.voteNode = require('./account/VoteNodeMethod');
exports.unVoteNode = require('./account/UnVoteNodeMethod');