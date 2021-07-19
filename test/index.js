const TopJs = require('../src');
const Accounts = require('../src/accounts');
const transferTest = require('./transferTest');
const contractTest = require('./contractTest');
const accountPropertyTest = require('./accountPropertyTest');

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
    console.log('account unused_vote_amount >>> ', accountInfo.data.unused_vote_amount);
    console.log('account vote_staked_token >>> ', accountInfo.data.vote_staked_token);
    console.log('account vote_staked_index >>> ', JSON.stringify(accountInfo.data.vote_staked_index));

    topjs.getTransaction({
        address: pAccount.address,
        txHash: '0x0dfb56f4eed918455f430d07c33433775c2b276f671010181bceaa16589f8558'
    }).then(r => {
        console.log('tx hash > ' + JSON.stringify(r))
    });
    
    let {nonce, latest_tx_hash_xxhash64} = await topjs.getNonceAndLastxxHash64(pAccount.address)

    /** transfer */
    // let tx = await topjs.generateTx({
    //     txMethod: 'transfer',
    //     from: pAccount.address,
    //     nonce,
    //     latest_tx_hash_xxhash64,
    //     to: 'T80000d50f507f4d81e5bff6759815dc3892d8a2909098',
    //     amount: 10,
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

    // let signedTx = await topjs.signTransaction(tx, pAccount.privateKey);
    // console.log('tx json > ' + JSON.stringify(signedTx))
    // let result = await topjs.sendSignedTransaction(signedTx);
    // console.log('transfer tx > ' + JSON.stringify(result));


    let voteUsedResult = await topjs.listVoteUsed({
        account_addr: pAccount.address
    })
    console.log('voteUsedResult > ' + JSON.stringify(voteUsedResult));
}
test();
