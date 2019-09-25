const TopJs = require('../src');
const fs = require("fs");

module.exports = async () => {
    const topjs = new TopJs();
    const url = await topjs.getDefaultServerUrl();
    topjs.setProvider(url);
    let pAccount = topjs.accounts.generate();
    let cAccount = topjs.accounts.generate();
    console.log('contractAccount >>> address >', cAccount.address);
    await topjs.requestToken();
    const createAccountResult = await topjs.createAccount({
        account: pAccount
    });
    console.log('createAccountResult >>>>> ', createAccountResult);
    setTimeout(async()=>{
        const accountInfo = await topjs.accountInfo({
            account: pAccount
        });
        if (accountInfo.data) {
            pAccount.nonce = accountInfo.data.nonce;
            pAccount.last_hash_xxhash64 = accountInfo.data.last_hash_xxhash64;
        }
        console.log('accountInfo >>> ', accountInfo);
        var data = fs.readFileSync('D:/project/gerrit/js-sdk/test/map.lua');
        const publishContractResult = await topjs.publishContract({
            account: pAccount,
            contractAccount: cAccount,
            contractCode: data.toString(),
            deposit: 200
        });
        console.log('publishContractResult >>> ', publishContractResult);
        setTimeout(async() => {
            const contractAccountInfo = await topjs.accountInfo({
                account: cAccount
            });
            console.log('contractAccountInfo >>> ', contractAccountInfo);
            const result = await topjs.getProperty({
                contractAddress: cAccount.address,
                type: 'map',
                data: ['hmap', 'key']
            });
            console.log('getProperty Result >>> ', result);
            const accountInfoResult = await topjs.getProperty({
                contractAddress: cAccount.address,
                type: 'string',
                data: 'temp_1'
            });
            console.log('getProperty Result >>> ', accountInfoResult);
        }, 3000)
    }, 1000)
};

