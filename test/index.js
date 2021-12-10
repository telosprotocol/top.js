const TopJs = require('../src');
const Accounts = require('../src/accounts');
const transferTest = require('./transferTest');
const contractTest = require('./contractTest');
const accountPropertyTest = require('./accountPropertyTest');

const test = async () => {
    
    const topjs = new TopJs('http://161.35.98.159:19081', {
        pollCount:5,
        pollDelayTime: 3000
    });
    // const topjs = new TopJs('http://192.168.50.214:19081', {
    //     pollCount:5,
    //     pollDelayTime: 3000
    // });
    // let pAccount = topjs.accounts.generate({ privateKey: 'R9Pd5vh/dyI3IkKQrUsYFVq8t2L44JWWf4PW+RwwgQE='});
    let pAccount = topjs.accounts.generate({ privateKey: '0x497a926c1ede4e2bb709b2de662c15cd886466609fa0c7cba513a7d21bb7023b'});
    let accountInfo = await topjs.getAccount({
        address: pAccount.address
    });

    console.log('account address >>> ', pAccount.address);
    console.log('account balance >>> ', accountInfo.data.balance);
    console.log('account nonce >>> ', accountInfo.data.nonce);
    console.log('account gas_staked_token >>> ', JSON.stringify(accountInfo.data.gas_staked_token));
    console.log('account unused_vote_amount >>> ', accountInfo.data.unused_vote_amount);
    console.log('account vote_staked_token >>> ', accountInfo.data.vote_staked_token);
    console.log('account vote_staked_index >>> ', JSON.stringify(accountInfo.data.vote_staked_index));
    // console.log('account  >>> ', JSON.stringify(accountInfo.data));

    // let cgpInfo = await topjs.getCGP();
    // console.log('cgp > ' + JSON.stringify(cgpInfo));

    // topjs.getTransaction({
    //     address: pAccount.address,
    //     txHash: '0xd25d37c40f5c608a6d4caa72462601435f9dcbe12f03be0e99e33b1888854715'
    // }).then(r => {
    //     console.log('tx hash > ' + JSON.stringify(r))
    // });

    let {nonce} = await topjs.getNonceAndLastxxHash64(pAccount.address)

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
    //     to: 'T8000062819fdf4499ec425def452e46cfdc3f283348e8',
    //     amount: 200,
    //     note: 'transfer test'
    // });

    /** stake gas */
    // let tx = await topjs.generateTx({
    //     txMethod: 'stakeGas',
    //     from: pAccount.address,
    //     nonce,
    //     amount: 10
    // });

    /** un stake gas */
    // let tx = await topjs.generateTx({
    //     txMethod: 'unStakeGas',
    //     from: pAccount.address,
    //     nonce,
    //     amount: 100
    // });

    /** stake vote */
    // let tx = await topjs.generateTx({
    //     txMethod: 'stakeVote',
    //     from: pAccount.address,
    //     nonce,
    //     amount: 10002,
    //     lockTime: 30
    // });

    /** un stake vote */
    // let tx = await topjs.generateTx({
    //     txMethod: 'unStakeVote',
    //     from: pAccount.address,
    //     nonce,
    //     amount: 10002
    // });

     /** vote node */
    // let tx = await topjs.generateTx({
    //     txMethod: 'voteNode',
    //     from: pAccount.address,
    //     nonce,
    //     voteInfoArray: [
    //         {
    //             nodeAddress: 'T80000fa6cde6e87a95d5370b827200e5345a2414d0387',
    //             voteCount: 100
    //         }
    //     ]
    // });

    /** un vote node */
    let tx = await topjs.generateTx({
        txMethod: 'unVoteNode',
        from: pAccount.address,
        nonce,
        voteInfoArray: [
            {
                nodeAddress: 'T80000fa6cde6e87a95d5370b827200e5345a2414d0387',
                voteCount: 50
            }
        ]
    });

    /** claim voter dividend */
    // let tx = await topjs.generateTx({
    //     txMethod: 'claimVoterDividend',
    //     from: pAccount.address,
    //     nonce
    // });

    // let signedTx = await signTransaction(data)

    // console.log('transfer tx > ' + JSON.stringify(tx));
    let signedTx = await topjs.signTransaction(tx, pAccount.privateKey);
    // console.log('tx json > ' + JSON.stringify(signedTx))
    // let result = await topjs.sendSignedTransaction(signedTx);
    // console.log('transfer tx > ' + JSON.stringify(result));


    let voteUsedResult = await topjs.listVoteUsed({
        account_addr: pAccount.address
    })
    console.log('voteUsedResult > ' + JSON.stringify(voteUsedResult));
}
test();
