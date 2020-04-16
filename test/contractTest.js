const TopJs = require('../src');
const fs = require("fs");

module.exports = async () => {
    const topjs = new TopJs('http://192.168.50.35:19081', {
        pollCount:5,
        pollDelayTime: 3000
    });
    const contractAccount = topjs.accounts.generateContractAccount({privateKey: '0xe3555c4e321916a04ea02bc8ba0c13e15da15b32cda2ad1f6414050dcc333639', parentAddress: 'T-0-Lb4Tk23sKM7jkAfKoM7eME16Dy5RLJLPf1'});
    // topjs.setProvider('http://192.168.50.35:19081');
    // let pAccount = topjs.accounts.generate({ privateKey: '0x915055d92a6fca8eeae72f0515e3be84d69a5af79aa10f818881f654f755b877' });
    let pAccount = topjs.accounts.generate();
    await topjs.requestToken({
        account: pAccount
    });
    const createAccountResult = await topjs.createAccount({
        account: pAccount
    });
    if (createAccountResult.errno != 0) {
        console.error('create account error > ', createAccountResult.errmsg);
        return;
    }
    let accountInfo = await topjs.accountInfo({
        account: pAccount
    });
    console.log('account balance >>> ', JSON.stringify(accountInfo.data.balance));
    await topjs.updateNonceAndLastHash(pAccount);
    var data = fs.readFileSync('D:/project/gerrit/js-sdk/test/map.lua');
    const publishContractResult = await topjs.publishContract({
        account: pAccount,
        contractCode: data.toString(),
        deposit: 400000,
        note: 'test_tx',
        // contractAccount
    });
    if (publishContractResult.errno != 0) {
        console.error('publish contract error > ',  publishContractResult.errmsg);
        return;
    }
    console.log('publish contract result >>> ', publishContractResult.data.exec_status == 1);
    const contract_address = publishContractResult.data.target_action.account_addr;
    
    let result = await topjs.getProperty({
        contractAddress: contract_address,
        type: 'map',
        data: ['hmap', 'key']
    });
    console.log('getProperty Result >>> ', JSON.stringify(result));
    let accountInfoResult = await topjs.getProperty({
        contractAddress: contract_address,
        type: 'string',
        data: 'temp_1'
    });
    console.log('getProperty Result >>> ', JSON.stringify(accountInfoResult));

    
    accountInfo = await topjs.accountInfo({
        account: pAccount
    });
    await topjs.updateNonceAndLastHash(pAccount);
    result = await topjs.callContract({
        account: pAccount,
        contractAddress: contract_address,
        actionName: 'opt_map',
        actionParam: [{
            type: 'string',
            value: 'inkey'
        }, {
            type: 'number',
            value: 65
        }]
    });
    console.log('callContract Result >>> ', JSON.stringify(result));
    
    let getpResult = await topjs.getProperty({
        contractAddress: contract_address,
        type: 'map',
        data: ['hmap', 'inkey']
    });
    console.log('getProperty Result >>> ', JSON.stringify(getpResult));
    
    result = await topjs.getProperty({
        contractAddress: contract_address,
        type: 'map',
        data: ['hmap', 'key']
    });
    console.log('getProperty Result >>> ', JSON.stringify(result));
};

