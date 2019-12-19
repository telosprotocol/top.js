const TopJs = require('../src');

module.exports = async (urlStr) => {
    const topjs = new TopJs();
    // const url = await topjs.getDefaultServerUrl('http://hacker.topnetwork.org/');
    topjs.setProvider('http://192.168.50.31:19081');
    let pAccount = topjs.accounts.generate({ privateKey: '0xf157bbac5e40852ec8908f817e55dbfb10c9a281c709ea507d7c328a7a7492c1' });
    topjs.defaultAccount = pAccount;
    await topjs.requestToken();
    await topjs.createAccount({
        account: pAccount
    });

    setTimeout(async() => {
        const f = await topjs.accountInfo();
        console.log('userInfo >>>>> ', JSON.stringify(f));
        const pledgeResult = await topjs.nodeDeRegister({
            account: pAccount,
            amount: 10000,
            nodeType: 8
        });
        console.log('pledgeResult >>>>> ', JSON.stringify(pledgeResult));

        setTimeout(async() => {
            
            let propertyResult = await topjs.getProperty({
                contractAddress: pAccount.address,
                type: 'string',
                data: '@29'
            });
            console.log('pledge tgas Result >>> ', JSON.stringify(propertyResult));
            propertyResult = await topjs.getProperty({
                contractAddress: pAccount.address,
                type: 'string',
                data: '@33'
            });
            console.log('pledge disk Result >>> ', JSON.stringify(propertyResult));
            propertyResult = await topjs.getProperty({
                contractAddress: 'T-x-qNaehjjvgj8zdsy6H1kcJjUrD4NxxWjJLV',
                type: 'map',
                data: ['#101', pAccount.address]
            });
            console.log('node register Result >>> ', JSON.stringify(propertyResult));
        }, 5000);
        
    }, 5000);
};

