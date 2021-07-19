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
    
    const topjs = new TopJs('http://142.93.30.153:19081', {
        pollCount:5,
        pollDelayTime: 3000
    });
    let pAccount = topjs.accounts.generate({ privateKey: 'R9Pd5vh/dyI3IkKQrUsYFVq8t2L44JWWf4PW+RwwgQE='});
    let accountInfo = await topjs.getAccount({
        address: pAccount.address
    });
    console.log('account balance >>> ', accountInfo.data.balance);
    console.log('account nonce >>> ', accountInfo.data.nonce);

    // topjs.getTransaction({
    //         account: pAccount,
    //     txHash: '0xf0bc34ff1dbb0be4296b4178109b9a7c4585cad3c17b3983551e092335a0276a'
    // }).then(r => {
    //     console.log(r.data.confirm_unit_info.exec_status);
    //     console.log(JSON.stringify(r))
    // });
    
    let {nonce, latest_tx_hash_xxhash64} = await topjs.getNonceAndLastxxHash64(pAccount.address)

    // nonce = 1;
    // latest_tx_hash_xxhash64 = "0x27836cb7e51d9d3b";

    let tx = await topjs.generateTx({
        txMethod: 'transfer',
        from: pAccount.address,
        nonce,
        latest_tx_hash_xxhash64,
        to: 'T80000d50f507f4d81e5bff6759815dc3892d8a2909098',
        amount: 10,
        note: 'transfer test'
    });


    let signedTx = await topjs.signTransaction(tx, pAccount.privateKey);
    console.log('tx json > ' + JSON.stringify(signedTx))
    let result = await topjs.sendSignedTransaction(signedTx);
    console.log('transfer tx > ' + JSON.stringify(result));
    

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
