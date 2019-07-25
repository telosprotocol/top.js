const TopJs = require('../src');

const topjs = new TopJs();
topjs.setProvider('http://localhost:19090');
// topjs.requestToken();
topjs.getAccounts();