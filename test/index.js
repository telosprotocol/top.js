const TopJs = require('../src');

const topjs = new TopJs();
topjs.setProvider('http://localhost:19090');
topjs.defaultAccount = topjs.accounts.generateByPrivateKey('47ce7e773f76df0a43ebfb243e7fffcc0f67a37fd4b8c05700ec107e2c25b7a5');
topjs.requestToken();
setTimeout(topjs.createAccount, 5000);
// setTimeout(topjs.accountInfo, 15000);
setTimeout(() => {
    topjs.transfer({
        to: 'T-0-1EHzT2ejd12uJx7BkDgkA7B5DS1nM6AXyF',
        amont: 100,
        data: 'hello top'
    });
}, 15000);
setTimeout(topjs.accountInfo, 25000);
// topjs.createAccount();