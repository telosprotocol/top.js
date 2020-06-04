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
    
    const topjs = new TopJs('http://192.168.50.187:19081', {
        pollCount:5,
        pollDelayTime: 3000
    });
    let pAccount = topjs.accounts.generate({ privateKey: '0x915055d92a6fca8eeae72f0515e3be84d69a5af79aa10f818881f654f755b877' });
    await topjs.passport({
        account: pAccount
    });
    const createAccountResult = await topjs.createAccount({
        account: pAccount
    });
    if (createAccountResult.errno != 0) {
        console.error('create account error > ', createAccountResult.errmsg, ' > hash > ', createAccountResult.data.params.transaction_hash);
        return;
    }
    let accountInfo = await topjs.accountInfo({
        account: pAccount
    });
    console.log('account balance >>> ', JSON.stringify(accountInfo.data.balance));
    await topjs.updateNonceAndLastHash(pAccount);
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
