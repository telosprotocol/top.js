const TopJs = require('../src');

module.exports = async (urlStr) => {
    const topjs = new TopJs(urlStr);
    await topjs.requestToken();
    topjs.defaultAccount = topjs.accounts.generateByPrivateKey('')
    console.log('createAccountResult >>>>> ', createAccountResult);

    setTimeout(async() => {
        const f = await topjs.accountInfo();
        console.log('userInfo >>>>> ', f);
        
        const transferResult = await topjs.transfer({
            to: 'T-0-1EHzT2ejd12uJx7BkDgkA7B5DS1nM6AXyF',
            amount: 110,
            data: 'hello top hahah hahah'
        });
        console.log('transferResult >>> ', transferResult);

        setTimeout(async() => {
            const s = await topjs.accountInfo();
            console.log('userInfo >>>>> ', s);
            const d = await topjs.accountTransaction();
            console.log('userInfo >>>>> ', d);
        }, 1000);
        
    }, 1000);
};

