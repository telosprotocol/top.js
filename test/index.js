const TopJs = require('../src');

const topjs = new TopJs();
topjs.setProvider('http://localhost:19090');
// topjs.setProvider('http://128.199.181.220:19085')
topjs.defaultAccount = topjs.accounts.generateByPrivateKey('47ce7e773f76df0a43ebfb243e7fffcc0f67a37fd4b8c05700ec107e2c25b7a5');
topjs.requestToken();
// setTimeout(topjs.createAccount, 5000);
setTimeout(topjs.accountInfo, 5000);
// setTimeout(() => {
//     topjs.transfer({
//         to: 'T-0-1EHzT2ejd12uJx7BkDgkA7B5DS1nM6AXyF',
//         amont: 110,
//         data: 'hello top hahah hahah '
//     });
// }, 15000);
// setTimeout(topjs.accountInfo, 25000);
setTimeout(topjs.accountTransaction, 15000);
// setTimeout(topjs.accountInfo, 45000);
// topjs.createAccount();