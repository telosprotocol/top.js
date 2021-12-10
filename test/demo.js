const TopJs = require('../src');

const demo = async () => {
    const topjs = new TopJs('http://grpc.topscan.io:19081', {
        pollCount:5,
        pollDelayTime: 3000
    });

    // 1. 生成地址
    // 通过私钥生成地址
    // 直接调用时是随机生成私钥
    // 返回对象中包括 address 地址，privateKey 私钥
    let firstAccount = topjs.accounts.generate({ privateKey: '0x638785b5e9bb9271f031f6ef852e3d5f33b9f46bff6d920b8622d44e69d6666f'});
    let secondAccount = topjs.accounts.generate();

    // 2. 获取余额
    // 链上获取账户信息
    // balance 余额
    // available_gas 可用gas
    let accountInfo = await topjs.getAccount({
        address: 'T80000786a77663b66d4febcc0f88970757e4d6b5ff68b' //firstAccount.address
    });
    console.log('firstAccount info >>> ', JSON.stringify(accountInfo));

    // 3. 转账
    // TOP的单位有2个，top 和 utop ; 换算关系为 1top = 1000000utop
    // 转账函数中第二个参数的单位为 utop，下面的例子是转账1top
    // note 就是memo
    // 3.1 获取nonce
    let {nonce} = await topjs.getNonceAndLastxxHash64(firstAccount.address)
    // 3.2 生成交易对象，tx 对象中 tx_hash  即为交易hash
    let tx = await topjs.generateTx({
        txMethod: 'transfer',
        from: firstAccount.address,
        nonce,
        to: secondAccount.address,
        amount: 1000000,
        note: 'transfer test'
    });
    // 3.3 签名
    // let signedTx = await topjs.signTransaction(tx, firstAccount.privateKey);
    // console.log('signed tx json > ' + JSON.stringify(signedTx))
    // 3.4 发送交易
    // let result = await topjs.sendSignedTransaction(signedTx);
    // console.log('transfer result > ' + JSON.stringify(result))

    // 4. 查询交易详情，该对象中 tx_state 字段值为 success 即为成功
    topjs.getTransaction({
        address: firstAccount.address,
        txHash: '0xf92df27a09c8c52589e76046e14c4648a560a520865c5d5c12eea443c0a453a2'
    }).then(r => {
        let action_param = r.data.original_tx_info.receiver_action_param;
        const actionParamObj = topjs.utils.decodeActionParam(action_param);
        console.log('tx action param > ' + JSON.stringify(actionParamObj))
        console.log('tx hash > ' + JSON.stringify(r))
    });

    // 5. 获取table block某高度详情
    // topjs.getBlock({
    //     tableBlockAddress: 'Ta0000@17',
    //     height: 55
    // }).then(r => {
    //     console.log('table block result > ' + JSON.stringify(r))
    // });

    // // 6. 所有table block的最新高度
    // topjs.getLatestTables().then(r => {
    //     console.log('latest tables result > ' + JSON.stringify(r))
    // });
}

demo();