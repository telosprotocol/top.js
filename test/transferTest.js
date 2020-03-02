const TopJs = require('../src');

module.exports = async (urlStr) => {
    const topjs = new TopJs();
    // const url = await topjs.getDefaultServerUrl('http://hacker.topnetwork.org/');
    topjs.setProvider('http://192.168.50.136:19081');
    let pAccount = topjs.accounts.generate({ privateKey: '0xe7cd3bc643e84c6d7cc2ccfefa3b4a56eff21bf600b7998a1a748efc61b9ac65' });
    topjs.defaultAccount = pAccount;
    await topjs.requestToken();
    await topjs.createAccount({
        account: pAccount
    });

    const f = await topjs.accountInfo();
    console.log('userInfo balance >>>>> ', JSON.stringify(f.data.balance));

    const transferResult = await topjs.transfer({
        to: 'T-0-LPBt6yVRd65kjGZiPZy3oec63CtX1F4bmT',
        amount: 110,
        data: 'hello top hahah hahah'
    });
    // console.log('transferResult >>> ', JSON.stringify(transferResult));

    const s = await topjs.accountInfo();
    console.log('user balance >>>>> ', JSON.stringify(s.data.balance));
    const d = await topjs.accountTransaction();
    const actionParamObj = topjs.utils.decodeActionParam(d.data.target_action.action_param);
    console.log('actionParamObj >>>>> ', JSON.stringify(actionParamObj));

    const b = await topjs.getBlock();
    console.log('get block >>>>> ', JSON.stringify(b));
};

