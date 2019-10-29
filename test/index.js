const TopJs = require('../src');
const Accounts = require('../src/accounts');
const transferTest = require('./transferTest');
const contractTest = require('./contractTest');

const urlStr = 'http://192.168.50.171:19081';
// a3aab9c186458ffd07ce1c01ba7edf9919724224c34c800514c60ac34084c63e
// 7279ed1b5b541ebc92796c5c07ab2a8add8e065ec17aaa91dfe97210b52b7a8a

// transferTest(urlStr);
contractTest(urlStr);

// const accounts = new Accounts();
// const privateKey = '0xde8f82d02b87b9a1d59bca84cb0a99016159c6679968839ba9e3eeeb661499e9';
// const parentAddress = 'T-0-1C89ydMtmXVTcDyp6qjRF11jgLxKtYVQfT';
// let pAccount = accounts.generateByPrivateKey(privateKey);
// let cAccount = accounts.generateContractAccountByPrivateKey(privateKey, parentAddress);