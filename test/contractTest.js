const TopJs = require('../src');
const fs = require("fs");

module.exports = async (urlStr) => {
    const topjs = new TopJs(urlStr);
    let cAccount = topjs.accounts.generate();
    console.log('contractAccount >>> address >', cAccount.address);
    await topjs.requestToken();
    const createAccountResult = await topjs.createAccount();
    console.log('createAccountResult >>>>> ', createAccountResult);
    setTimeout(async()=>{
        const accountInfo = await topjs.accountInfo();
        console.log('accountInfo >>> ', accountInfo);
        var data = fs.readFileSync('D:/project/gerrit/js-sdk/test/map.lua');
        const publishContractResult = await topjs.publishContract({
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
        }, 1000)
    }, 1000)
};

