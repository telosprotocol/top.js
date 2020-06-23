const TopJs = require('../src');
const Accounts = require('../src/accounts');
const transferTest = require('./transferTest');
const contractTest = require('./contractTest');
const accountPropertyTest = require('./accountPropertyTest');

const urlStr = 'http://192.168.50.171:19081';

// transferTest(urlStr);
// contractTest(urlStr);
// accountPropertyTest();

const test = async () => {
    
    const topjs = new TopJs('http://192.168.20.12:19081', {
        pollCount:5,
        pollDelayTime: 3000
    });
    let pAccount = topjs.accounts.generate({ privateKey: '0x6f9934428ffdf520dfd088ae59e25f1f25532e7e310d5fb2d930b0e978322c48' });
    await topjs.passport({
        account: pAccount
    });
    // const createAccountResult = await topjs.createAccount({
    //     account: pAccount
    // });
    // if (createAccountResult.errno != 0) {
    //     console.error('create account error > ', createAccountResult.errmsg, ' > hash > ', createAccountResult.data.params.transaction_hash);
    //     return;
    // }
    let accountInfo = await topjs.getAccount({
        account: pAccount
    });
    console.log('account balance >>> ', JSON.stringify(accountInfo.data));

    // pAccount.address = 'T-0-LiC6tHMcmS8Qpn6LQuWcLRXjvGuYXQGthd';
    // topjs.getAccount({
    //     account: pAccount
    // }).then(console.log);

    topjs.getTransaction({
            account: pAccount,
        txHash: '0xf0bc34ff1dbb0be4296b4178109b9a7c4585cad3c17b3983551e092335a0276a'
    }).then(r => {
        console.log(r.data.confirm_unit_info.exec_status);
        console.log(JSON.stringify(r))
    });
    
    // await topjs.updateNonceAndLastHash(pAccount);
    // topjs.transfer({
    //     account: pAccount,
    //     to: 'T-0-LiC6tHMcmS8Qpn6LQuWcLRXjvGuYXQGthd',
    //     amount: 140,
    //     data: 'hello top hahah hahah'
    // }).then(console.log);
    

    // await topjs.stakeVote({
    //     account: pAccount,
    //     amount: 10020000,
    //     lockTime: 30
    // }).then(console.log);

    // topjs.addProposal({
    //     account: pAccount,
    //     proposal: {
    //         "proposalId":"sss",
    //         "chainTimerHeight":40,
    //         "deposit":400,
    //         "modificationDescription":"ttt",
    //         "newValue":"26",
    //         "origValue":"10000",
    //         "parameter":"archive_deposit",
    //         "priority":3,
    //         "proposalClientAddress":"T-0-1Kc3sQi7wiX9STHjCYMpxbER9daPXc7wNe",
    //         "updateType":"update_action_parameter"
    //     }
    // }).then(console.log);
    // topjs.getProposal({
    //     account: pAccount,
    //     proposalId: 'sss'
    // }).then(console.log);
}
test();
