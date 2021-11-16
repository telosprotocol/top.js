const TopJs = require('../src');
const Accounts = require('../src/accounts');
const transferTest = require('./transferTest');
const contractTest = require('./contractTest');
const accountPropertyTest = require('./accountPropertyTest');

const test = async () => {
    
    const topjs = new TopJs('http://grpc.topscan.io:19081', {
        pollCount:5,
        pollDelayTime: 3000
    });
    // const topjs = new TopJs('http://192.168.50.214:19081', {
    //     pollCount:5,
    //     pollDelayTime: 3000
    // });
    let pAccount = topjs.accounts.generate({ privateKey: 'R9Pd5vh/dyI3IkKQrUsYFVq8t2L44JWWf4PW+RwwgQE='});
    // let pAccount = topjs.accounts.generate({ privateKey: 'f747c28d65a36ba1b1bd38efb26f1e0639fbc992dbe2b185a50db30a3c3fd5f8'});
    let accountInfo = await topjs.getAccount({
        address: 'T00000LXfWvHrkHxuPbYdrax9Dit6f1rw2DcsEEy' //pAccount.address
    });

    // console.log('account address >>> ', pAccount.address);
    // console.log('account balance >>> ', accountInfo.data.balance);
    // console.log('account nonce >>> ', accountInfo.data.nonce);
    // console.log('account unused_vote_amount >>> ', accountInfo.data.unused_vote_amount);
    // console.log('account vote_staked_token >>> ', accountInfo.data.vote_staked_token);
    // console.log('account vote_staked_index >>> ', JSON.stringify(accountInfo.data.vote_staked_index));
    console.log('account  >>> ', JSON.stringify(accountInfo.data));

    // let cgpInfo = await topjs.getCGP();
    // console.log('cgp > ' + JSON.stringify(cgpInfo));

    // topjs.getTransaction({
    //     address: pAccount.address,
    //     txHash: '0x8820aef3393ad3870236a807fdb5ee1214e47b574b7cfcf115af91958ee4fe03'
    // }).then(r => {
    //     console.log('tx hash > ' + JSON.stringify(r))
    // });

    // let {nonce, latest_tx_hash_xxhash64} = await topjs.getNonceAndLastxxHash64(pAccount.address)

    // topjs.getBlock({
    //     tableBlockAddress: 'Ta0000@3',
    //     height: 13
    // }).then(r => {
    //     console.log('table block result > ' + JSON.stringify(r))
    // });

    // topjs.getLatestTables().then(r => {
    //     console.log('latest tables result > ' + JSON.stringify(r))
    // });

    /** transfer */
    // let tx = await topjs.generateTx({
    //     txMethod: 'transfer',
    //     from: pAccount.address,
    //     nonce,
    //     latest_tx_hash_xxhash64,
    //     to: 'T8000062819fdf4499ec425def452e46cfdc3f283348e8',
    //     amount: 600000000000,
    //     note: 'transfer test'
    // });


    /** stake vote */
    // let tx = await topjs.generateTx({
    //     txMethod: 'stakeVote',
    //     from: pAccount.address,
    //     nonce,
    //     latest_tx_hash_xxhash64,
    //     amount: 10002,
    //     lockTime: 30
    // });

    // /** un stake vote */
    // // let tx = await topjs.generateTx({
    // //     txMethod: 'unStakeVote',
    // //     from: pAccount.address,
    // //     nonce,
    // //     latest_tx_hash_xxhash64,
    // //     amount: 10002
    // // });

     /** vote node */
    // let tx = await topjs.generateTx({
    //     txMethod: 'voteNode',
    //     from: pAccount.address,
    //     nonce,
    //     latest_tx_hash_xxhash64,
    //     voteInfoArray: [
    //         {
    //             nodeAddress: 'T00000LKF18dpN5yGuBBpg38ZQyC8vpdzy6YQfPe',
    //             voteCount: 100
    //         }
    //     ]
    // });

    /** un vote node */
    // let tx = await topjs.generateTx({
    //     txMethod: 'unVoteNode',
    //     from: pAccount.address,
    //     nonce,
    //     latest_tx_hash_xxhash64,
    //     voteInfoArray: [
    //         {
    //             nodeAddress: 'T00000LKF18dpN5yGuBBpg38ZQyC8vpdzy6YQfPe',
    //             voteCount: 50
    //         }
    //     ]
    // });

    /** claim voter dividend */
    // let tx = await topjs.generateTx({
    //     txMethod: 'claimVoterDividend',
    //     from: pAccount.address,
    //     nonce,
    //     latest_tx_hash_xxhash64
    // });

    // let signedTx = await signTransaction(data)

    // console.log('transfer tx > ' + JSON.stringify(tx));
    // let signedTx = await topjs.signTransaction(tx, pAccount.privateKey);
    // console.log('tx json > ' + JSON.stringify(signedTx))
    // let result = await topjs.sendSignedTransaction(signedTx);
    // console.log('transfer tx > ' + JSON.stringify(result));


    let voteUsedResult = await topjs.listVoteUsed({
        account_addr: 'T00000LXfWvHrkHxuPbYdrax9Dit6f1rw2DcsEEy'//pAccount.address
    })
    console.log('voteUsedResult > ' + JSON.stringify(voteUsedResult));
}
test();
