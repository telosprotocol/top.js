const TopJs = require('../src');

module.exports = async (urlStr) => {
    const topjs = new TopJs();
    // const url = await topjs.getDefaultServerUrl('http://hacker.topnetwork.org/');
    topjs.setProvider('http://192.168.50.202:19081');
    await topjs.requestToken();
    const createAccountResult = await topjs.createAccount();
    console.log('createAccountResult >>>>> ', JSON.stringify(createAccountResult));

    setTimeout(async() => {
        const f = await topjs.accountInfo();
        console.log('userInfo >>>>> ', JSON.stringify(f));
        
        const transferResult = await topjs.transfer({
            to: 'T-0-1EHzT2ejd12uJx7BkDgkA7B5DS1nM6AXyF',
            amount: 110,
            data: 'hello top hahah hahah'
        });
        console.log('transferResult >>> ', JSON.stringify(transferResult));

        setTimeout(async() => {
            const s = await topjs.accountInfo();
            console.log('userInfo >>>>> ', JSON.stringify(s));
            const d = await topjs.accountTransaction();
            const actionParamObj = topjs.utils.decodeActionParam(d.data.target_action.action_param);
            console.log('accountTransaction >>>>> ', JSON.stringify(d));
            console.log('actionParamObj >>>>> ', JSON.stringify(actionParamObj));
        }, 3000);
        
    }, 3000);
};

