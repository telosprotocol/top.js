const TopJs = require('../src');
const topjs = new TopJs('http://192.168.50.26:19081', {
        pollCount:3,
        pollDelayTime: 5000
    });

let nodeAccount = topjs.accounts.generate({ privateKey: '0xe7cd3bc643e84c6d7cc2ccfefa3b4a56eff21bf600b7998a1a748efc61b9ac65' });
let userAccount = topjs.accounts.generate({ privateKey: '0xe3555c4e321916a04ea02bc8ba0c13e15da15b32cda2ad1f6414050dcc333639' });

const testNode = async () => {
    // let chainInfoResult = await topjs.getChainInfo();
    // console.log('chain info > ', JSON.stringify(chainInfoResult));

    await topjs.requestToken({
        account: nodeAccount
    });
    await topjs.requestToken({
        account: userAccount
    });

    // let createAccountResult = await topjs.createAccount({
    //     account: nodeAccount
    // });
    // if (createAccountResult.errno != 0) {
    //     console.error('create node account error > ', createAccountResult.errmsg);
    //     return;
    // }

    // createAccountResult = await topjs.createAccount({
    //     account: userAccount
    // });
    // if (createAccountResult.errno != 0) {
    //     console.error('create user account error > ', createAccountResult.errmsg);
    //     return;
    // }
    let accountInfo = await topjs.accountInfo({
        account: nodeAccount
    });
    console.log('node account balance >>> ', accountInfo.data.balance + ' > address > ', accountInfo.data.account);

    
    accountInfo = await topjs.accountInfo({
        account: userAccount
    });
    console.log('user account balance >>> ', accountInfo.data.balance + ' > address > ', accountInfo.data.account);

    // await topjs.updateNonceAndLastHash(nodeAccount);
    // let txResult = await topjs.nodeRegister({
    //     account: nodeAccount,
    //     mortgage: 1000000,
    //     nodeType: 'auditor,validator,archive'
    // });
    // console.log('node register hash ', txResult.data.transaction_hash, ' > is Success > ', txResult.data.exec_status == 1);

    // let nodeInfo = await topjs.getNodeInfo({
    //     account: nodeAccount,
    //     nodeAddress: nodeAccount.address
    // });
    // console.log('node info result > ', JSON.stringify(nodeInfo));

    // nodeInfo = await topjs.getNodeReward({
    //     account: nodeAccount,
    //     nodeAddress: nodeAccount.address
    // });
    // console.log('node reward result > ', JSON.stringify(nodeInfo));

    // nodeInfo = await topjs.getVoterReward({
    //     account: userAccount,
    //     voterAddress: userAccount.address
    // });
    // console.log('voter reward result > ', JSON.stringify(nodeInfo));

    // ---------- node de register start -------
    // await topjs.updateNonceAndLastHash(nodeAccount);
    // let txResult = await topjs.nodeDeRegister({
    //     account: nodeAccount,
    // });
    // console.log('node de register hash ', txResult.data.transaction_hash, ' > is Success > ', txResult.data.exec_status == 1);

    // nodeInfo = await topjs.getNodeInfo({
    //     account: nodeAccount,
    //     nodeAddress: nodeAccount.address
    // });
    // console.log('node info result > ', JSON.stringify(nodeInfo));
    // ---------- node de register end -------

    await topjs.updateNonceAndLastHash(nodeAccount);
    let txResult = await topjs.redeem({
        account: nodeAccount,
    });
    console.log('node redeem hash ', txResult.data.transaction_hash, ' > is Success > ', txResult.data.exec_status == 1);

    
    accountInfo = await topjs.accountInfo({
        account: nodeAccount
    });
    console.log('node account balance >>> ', accountInfo.data.balance + ' > address > ', accountInfo.data.account);
}

const testVoter = async () => {
    await topjs.requestToken({
        account: nodeAccount
    });
    accountInfo = await topjs.accountInfo({
        account: userAccount
    });
    console.log('user account balance >>> ', accountInfo.data.balance + ' > address > ', accountInfo.data.account, ' > unvote_num > ', accountInfo.data.unvote_num, ' > vote_balance > ', accountInfo.data.vote_balance);
    
    // ----------- pledge and redeem token vote start ---------------
    // await topjs.updateNonceAndLastHash(userAccount);
    // let txResult = await topjs.pledgeTokenVote({
    //     account: userAccount,
    //     amount: 100200,
    //     lockTime: 30
    // });
    // console.log('pledge token vote hash ', txResult.data.transaction_hash, ' > is Success > ', txResult.data.exec_status == 1);
    
    // accountInfo = await topjs.accountInfo({
    //     account: userAccount
    // });
    // console.log('user account balance >>> ', accountInfo.data.balance + ' > address > ', accountInfo.data.account, ' > unvote_num > ', accountInfo.data.unvote_num, ' > vote_balance > ', accountInfo.data.vote_balance);
    
    // await topjs.updateNonceAndLastHash(userAccount);
    // txResult = await topjs.redeemTokenVote({
    //     account: userAccount,
    //     amount: 100
    // });
    // console.log('redeem token vote hash ', txResult.data.transaction_hash, ' > is Success > ', txResult.data.exec_status == 1);

    // accountInfo = await topjs.accountInfo({
    //     account: userAccount
    // });
    // console.log('user account balance >>> ', accountInfo.data.balance + ' > address > ', accountInfo.data.account, ' > unvote_num > ', accountInfo.data.unvote_num, ' > vote_balance > ', accountInfo.data.vote_balance);
    // ----------- pledge and redeem token vote end ---------------

    // ----------- set and abolish vote start ---------------
    // await topjs.updateNonceAndLastHash(userAccount);
    // txResult = await topjs.setVote({
    //     account: userAccount,
    //     voteInfoArray: [{
    //         nodeAddress: 'T-0-LetudiZFBHQqiuSxaeYP6aW9pV1VdiXd88',
    //         voteCount: 3030
    //     }]
    // });
    // console.log('set vote hash ', txResult.data.transaction_hash, ' > is Success > ', txResult.data.exec_status == 1);

    // accountInfo = await topjs.accountInfo({
    //     account: userAccount
    // });
    // console.log('user account balance >>> ', accountInfo.data.balance + ' > address > ', accountInfo.data.account, ' > unvote_num > ', accountInfo.data.unvote_num, ' > vote_balance > ', accountInfo.data.vote_balance);
    
    // await topjs.updateNonceAndLastHash(userAccount);
    // txResult = await topjs.abolishVote({
    //     account: userAccount,
    //     voteInfoArray: [{
    //         nodeAddress: 'T-0-LetudiZFBHQqiuSxaeYP6aW9pV1VdiXd88',
    //         voteCount: 180
    //     }]
    // });
    // console.log('abolish vote hash ', txResult.data.transaction_hash, ' > is Success > ', txResult.data.exec_status == 1);
    // ----------- set and abolish vote end ---------------

    accountInfo = await topjs.accountInfo({
        account: userAccount
    });
    console.log('user account balance >>> ', accountInfo.data.balance + ' > address > ', accountInfo.data.account, ' > unvote_num > ', accountInfo.data.unvote_num, ' > vote_balance > ', accountInfo.data.vote_balance);
}

const claimAllReward = async () => {
    await topjs.requestToken({
        account: nodeAccount
    });
    await topjs.requestToken({
        account: userAccount
    });

    await topjs.updateNonceAndLastHash(nodeAccount);
    let txResult = await topjs.claimNodeReward({
        account: nodeAccount,
    });
    console.log('claim node hash ', txResult.data.transaction_hash, ' > is Success > ', txResult.data.exec_status == 1);

    await topjs.updateNonceAndLastHash(userAccount);
    txResult = await topjs.claimReward({
        account: userAccount,
    });
    console.log('claim voter hash ', txResult.data.transaction_hash, ' > is Success > ', txResult.data.exec_status == 1);
}

(async () => {
    await testNode();
    // await testVoter();
    // await claimAllReward();
    // await testNode();
})();