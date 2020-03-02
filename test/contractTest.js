const TopJs = require('../src');
const fs = require("fs");

module.exports = async () => {
    const topjs = new TopJs();
    topjs.setProvider('http://192.168.50.136:19081');
    // let pAccount = topjs.accounts.generate({ privateKey: '0xf157bbac5e40852ec8908f817e55dbfb10c9a281c709ea507d7c328a7a7492c9' });
    let pAccount = topjs.accounts.generate();
    await topjs.requestToken();
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
    var data = fs.readFileSync('D:/project/gerrit/js-sdk/test/map.lua');
    const publishContractResult = await topjs.publishContract({
        account: pAccount,
        contractCode: data.toString(),
        deposit: 200,
        note: 'test_tx'
    });
    if (publishContractResult.errno != 0) {
        console.error('publish contract error > ', publishContractResult.errmsg);
        return;
    }
    console.log('publish contract result >>> ', publishContractResult.data.exec_status == 1);
    if (publishContractResult.errno != 0) {
        return;
    }
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

