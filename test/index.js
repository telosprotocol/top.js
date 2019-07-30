const TopJs = require('../src');

const topjs = new TopJs();
topjs.setProvider('http://localhost:19090');
topjs.requestToken();
setTimeout(topjs.createAccount, 5000);
setTimeout(topjs.accountInfo, 15000);
setTimeout(() => {
    topjs.transfer('T-0-1EHzT2ejd12uJx7BkDgkA7B5DS1nM6AXyF');
}, 25000);
setTimeout(topjs.accountInfo, 35000);
// topjs.createAccount();