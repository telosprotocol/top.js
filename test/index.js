const TopJs = require('../src');
const Accounts = require('../src/accounts');
const transferTest = require('./transferTest');
const contractTest = require('./contractTest');
const accountPropertyTest = require('./accountPropertyTest');

const urlStr = 'http://192.168.50.171:19081';

// transferTest(urlStr);
// contractTest(urlStr);
accountPropertyTest();
