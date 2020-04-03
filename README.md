# top-sdk-js

You need to run a local or remote TOP node to use this library.

Please read the [documentation][docs] for more.

## Installation

### Node

```bash
npm i top-sdk-js
```

### browser

use script

```bash
npm build browser
```

[docs]: https://www.topnetwork.org/docs/#/docs-en/

## 1. Overview

This Is The Official TOP Network Javascript SDK

Currently supports:

Local DID management, cryptocurrency asset management, smart contract deployment and calling, asset transactions and so on. More features and applications will be supported in the future.

JavaScript SDK is Node.js module, supporting synchronous writing, which is uploaded to npmjs.com.

### For browser side use

If needed for browser side use, you can install the browserify module locally, and then execute npm run browser commands in the SDK directory. The TopJs.js file will be generated in the browser directory and can be used directly for web use.

### Major Functions
* Assets Management
* Deploying and Calling Smart Contracts
* Error Code

## 2. Interface

| Interface                                                | Description                                  |
| :-------------------------------------------------- | :-------------------                              |
| topj.requestToken()                                 | Obtain an access token                            |
| topj.createAccount()                                | Create an account on the blockchain               |
| topj.accountInfo()                                  | Search for account information on the blockchain  |
| topj.transfer()                                     | Transfer                                          |
| topj.accountTransaction()                           | Search for transaction details on the blockchain  |
| topj.publishContract()                              | Deploying Smart Contracts                                           |
| topj.callContract()                              | Calling Smart Contracts                   |
| topj.getProperty()                                  | Getting Properties                                           |

| Utility Method                                                | Description                              |
| :-------------------------------------------------- | :-------------------             |
| topjs.utils.decodeActionParam();                    | Parse amount and note data in traders   |

### 2.1 Getting Started
```javascript
const TopJs = require('topJs');
const topjs = new TopJs('http://localhost:19090');
```

### 2.2 Obtain a request token

Method Name
> topjs.requestToken


Parameter

|    Parameter Name          |    Type     |                        Introduction                         |Mandatory field?|
| :------------------: | :---------: | :-----------------------------------------------------: | :---------: 
|   account    | object  |        Account object         | no|
|   callback    | function  |        Method callback function         | no |

Parameter description:
account can be uploaded optionally. When it isn't uploaded, account created is defaultAccount under topjs object.
 The token returned will be used in subsequent transactions and assigned automatically in account object.

Example Code
```javascript
topjs.requestToken();
> RequestTokenResult 
{ data:
   { secret_key: 'd014f1ea-fecd-468d-9278-1e75b0275825',
     signature_method: 'hmac_sha2',
     signature_ver_code: '1.0',
     token: 'bb7e78f6-6498-4827-86cc-172dd30b6214' },
  errmsg: 'ok',
  errno: 0,
  sequence_id: '1568960180836' 
}
```

------------------------------------------------------------

### 2.2 Create an account on the blockchain

Every account is required to be created on the blockchain and then it can undertake transactions

Method Name
> topjs.createAccount

Parameter

|    Parameter Name          |    Type     |                        Introduction                         |Mandatory field?|
| :------------------: | :---------: | :-----------------------------------------------------: | :---------: 
|   account    | object  |        Account object         | no |
|   callback    | function  |        Method callback function         | no |


Parameter description:
account can be uploaded optionally. When it isn't uploaded, account created is defaultAccount under topjs object.

Example code:
```javascript
topjs.createAccount();
> CreateAccountResult 
{
    "data": {
        "authority_keys": "",
        "authorization": "0x0188ec058b02b894440346e86b554454caaa186f768f3691a8d1f4c4064b4cc37d6254433d21ddf63f02b0b9872a6d14c3b0f09722356af559007def87e13d1943",
        "deposit": 100000,
        "expire_duration": 100,
        "fire_timestamp": 1568110075,
        "from_account_id": 0,
        "from_network_id": 0,
        "hash_work_proof": 0,
        "last_trans_hash": "0xF6E9BE5D70632CF5",
        "last_trans_nonce": 0,
        "last_unit_hash": 0,
        "last_unit_hight": 0,
        "parent_account": "",
        "public_key": "0x0459dae3dbb66c13fd475e1759534fd1366ff340738b3d6b07ef9db423a741d1e1853e0e33ff57d54034751da8efed13bf4f295e30aafc4c7368cb4da1c9822afe",
        "source_action": {
            "account_addr": "T-0-17MJiMxiw4dcMX6YApQ3XdKVGZAkcbL6SB",
            "action_authorization": "",
            "action_hash": 0,
            "action_name": "",
            "action_param": "0x",
            "action_size": 0,
            "action_type": 1
        },
        "target_action": {
            "account_addr": "T-0-17MJiMxiw4dcMX6YApQ3XdKVGZAkcbL6SB",
            "action_authorization": "",
            "action_hash": 0,
            "action_name": "",
            "action_param": "0x26000000542d302d31374d4a694d7869773464634d5836594170513358644b56475a416b63624c365342",
            "action_size": 0,
            "action_type": 2
        },
        "to_account_id": 0,
        "to_network_id": 0,
        "trans_random_nounce": 0,
        "transaction_hash": "0x7aee6eb5063cbb123ae3105d9904e89177a1aa3d8ec5c370ea95bb6057ba629e",
        "transaction_len": 0,
        "transaction_type": 0,
        "version": 0
    },
    "errmsg": "ok",
    "errno": 0,
    "sequence_id": "1568110075437"
}
```

------------------------------------------------------------

### 2.3 Search for account information

Method Name
> topjs.accountInfo

Description: When a user send the transaction to the blockchain, it is required to use the latest nonce and last_hash_xxhash64 of the user. The two properties can be got in the returned value of this method.

Parameter

|    Parameter Name          |    Type     |                        Introduction                         |Mandatory field?|
| :------------------: | :---------: | :-----------------------------------------------------: | :---------: 
|   account    | object  |        Account object         | no|
|   callback    | function  |        Method callback function         | no |

Parameter description:
account can be uploaded optionally. When it isn't uploaded, account created is defaultAccount under topjs object.Nonce and last_hash_xxhash64 returned will be assigned automatically in account object.

Example code:
```javascript
topjs.accountInfo();
> AccountInfoResult 
{
    "data": {
        "account": "T-0-17MJiMxiw4dcMX6YApQ3XdKVGZAkcbL6SB",
        "balance": 1000000,
        "contract_address": "",
        "freeze": 200,
        "last_hash": "0x7aee6eb5063cbb123ae3105d9904e89177a1aa3d8ec5c370ea95bb6057ba629e",
        "last_hash_xxhash64": "0xed70922781a3c5b7",
        "last_unit_height": 1,
        "nonce": 1,
        "random_seed": "0x0106000000545f636f6e3120000000d8d7b42640f6d7d9045bebb835871aa9566537a221a7906e58e791a972c0c7e82100000002d3b3ebc33bd2d474291d58505d57f4038966cf0012bbe605476fcdbe49aacba30100080000000700000000000000400000000300000001000800000007000000000000000300000003000000000006000000545f61647631200000004681a583b8b1aaf4e02801299be43a383405e5c580ac8c1b0d805eb39b0d9c402100000002a491a216804be9e6a60a33d2211e9f892bb3fe8c0626ad872cdbd92607724be90100080000000700000000000000400000000300000001000800000007000000000000000300000003000000000006000000545f636f6e3120000000ce6fdea065e706753649b37481e55e1d389055fd0bc9e3e8b5b0c3fa6bf8c8dd21000000034267b79fa1c3023ec81a9e1fc7f8bf3dd65291535fddbf60e695be9b228b395501000800000000000000000000000300000000000000010008000000070000000000000003000000030000000000"
    },
    "errmsg": "ok",
    "errno": 0,
    "sequence_id": "1568110352489"
}
```

------------------------------------------------------------

### 2.4 Transfer

Method Name
> topjs.transfer

Parameter

|    Parameter Name          |    Type     |                        Introduction                         |Mandatory field?|
| :------------------: | :---------: | :-----------------------------------------------------: | :---------: 
|   account    | object  |        Account object         | 否|
|   to    | string  |        Receiving address         | no |
|   data    | string  |        Remark         | no|
|   amount    | string  |        Amount         | yes|
|   callback    | function  |        Method callback function         | no |

Parameter description:
- account can be uploaded optionally. When it isn't uploaded, account created is defaultAccount under topjs object.
- Before sending transactions, it is required to get the latest nonce and last_hash_xxhash64 first and assign them in the account object. The two parameters can be added in the account object automatically by calling directly the topjs.accountInfo() method.
- The account balance of the initiator should be more than 100,000 before the transaction, it will be used as deposit.
- Receiving address is in the account_addr property under the target_action object

Example code:
```javascript
topjs.transfer({
    to: 'T-0-1EHzT2ejd12uJx7BkDgkA7B5DS1nM6AXyF',
    amount: 110,
    data: 'hello top hahah hahah'
});
> TransferResult
{
    "data": {
        "authority_keys": "",
        "authorization": "0x0105ee81c54cbc4055a221033fde7ff0e4b53dc5985f0f51306cbab34b8468655923581ec3d657499e48e580d13ca0eaff5077b3837719bf67c52a0989f54e93cb",
        "deposit": 100000,
        "expire_duration": 100,
        "fire_timestamp": 1568110640,
        "from_account_id": 0,
        "from_network_id": 0,
        "hash_work_proof": 0,
        "last_trans_hash": "0x6a095742ce5c169c",
        "last_trans_nonce": 2,
        "last_unit_hash": 0,
        "last_unit_hight": 0,
        "parent_account": "",
        "public_key": "0x0459dae3dbb66c13fd475e1759534fd1366ff340738b3d6b07ef9db423a741d1e1853e0e33ff57d54034751da8efed13bf4f295e30aafc4c7368cb4da1c9822afe",
        "source_action": {
            "account_addr": "T-0-17MJiMxiw4dcMX6YApQ3XdKVGZAkcbL6SB",
            "action_authorization": "",
            "action_hash": 0,
            "action_name": "",
            "action_param": "0x000000008c0000000000000000000000",
            "action_size": 0,
            "action_type": 0
        },
        "target_action": {
            "account_addr": "T-0-1B75FnoqfrNu6fuADADzwohLdzJ7Lm29bV",
            "action_authorization": "",
            "action_hash": 0,
            "action_name": "",
            "action_param": "0x000000008c0000000000000000000000",
            "action_size": 0,
            "action_type": 6
        },
        "to_account_id": 0,
        "to_network_id": 0,
        "trans_random_nounce": 0,
        "transaction_hash": "0x6b42b566d8fc51534720902851203aa0c8651af5413abf8f8fc1c321c9af600a",
        "transaction_len": 0,
        "transaction_type": 4,
        "version": 0
    },
    "errmsg": "ok",
    "errno": 0,
    "sequence_id": "1568110640805"
}
```

------------------------------------------------------------
### 2.5 Search for account information on the blockchain

Method Name
> topjs.accountTransaction


Parameter

|    Parameter Name          |    Type     |                        Introduction                         |Mandatory field?|
| :------------------: | :---------: | :-----------------------------------------------------: | :---------: 
|   account    | object  |        Account object         | no|
|   txHash    | string  |        Transaction hash         | no |
|   callback    | function  |        Method callback function         | no |

Parameter description:
account can be uploaded optionally. When it isn't uploaded, account created is defaultAccount under topjs object.

Example code:
```javascript
topjs.accountTransaction('');
> AccountTransactionResult
{
    "data": {
        "authority_keys": "",
        "authorization": "0x0105ee81c54cbc4055a221033fde7ff0e4b53dc5985f0f51306cbab34b8468655923581ec3d657499e48e580d13ca0eaff5077b3837719bf67c52a0989f54e93cb",
        "deposit": 100000,
        "expire_duration": 100,
        "fire_timestamp": 1568110640,
        "from_account_id": 0,
        "from_network_id": 0,
        "hash_work_proof": 0,
        "last_trans_hash": "7640734187252356764",
        "last_trans_nonce": 2,
        "last_unit_hash": 0,
        "last_unit_hight": 0,
        "parent_account": "",
        "source_action": {
            "account_addr": "T-0-17MJiMxiw4dcMX6YApQ3XdKVGZAkcbL6SB",
            "action_authorization": "0x",
            "action_hash": 0,
            "action_name": "",
            "action_param": "0x000000008c0000000000000000000000",
            "action_size": 0,
            "action_type": 0
        },
        "target_action": {
            "account_addr": "T-0-1B75FnoqfrNu6fuADADzwohLdzJ7Lm29bV",
            "action_authorization": "0x",
            "action_hash": 0,
            "action_name": "",
            "action_param": "0x000000008c0000000000000000000000",
            "action_size": 0,
            "action_type": 6
        },
        "to_account_id": 0,
        "to_network_id": 0,
        "trans_random_nounce": 0,
        "transaction_hash": "0x6b42b566d8fc51534720902851203aa0c8651af5413abf8f8fc1c321c9af600a",
        "transaction_len": 0,
        "transaction_type": 4,
        "version": 0
    },
    "errmsg": "ok",
    "errno": 0,
    "sequence_id": "1568111059548"
}
```
-----------------------------------------------------------------------------------

### 2.6 Deploying Smart Contracts

Method Name
> topjs.publishContract


Parameter

|    Parameter Name              |    Type     |          Introduction          |Mandatory field?|
| :---------------:     | :---------: | :--------------------: | :---------:
|   account             | object      |        Account object         | no| 
|   contractAccount     | Account     |        Smart contract account object      |yes|
|   contractCode        | string      |        Smart contract code         | yes|
|   deposit             | int64       |        contract deposit       | yes|
|   gasLimit            | int32       |        Contract gas      | no|
|   type                | string      |        coin type         | no|
|   note                | string      |        note             | no|
|   callback            | function    |        callback      |no|


Parameter description:
- account can be uploaded optionally. When it isn't uploaded, account created is defaultAccount under topjs object.
- Before sending transactions, it is required to get the latest nonce and last_hash_xxhash64 first and assign them in the account object. The two parameters can be added in the account object automatically by calling directly the topjs.accountInfo() method.
- The account balance of the initiator should be more than 100,000 before the transaction, it will be used as deposit.
- gasLimit is the fee for future transactions in smart contracts account
- It can't return the calling results if calling smart contracts interface. The data saved in smart contracts will be in smart contracts account as property which can be got in getProperty.

Example code:
```javascript
topjs.publishContract({
            contractAccount: cAccount,
            contractCode: '',
            deposit: 200
        });
> PublishContractResult
{data: Object, errmsg: "ok", errno: 0, sequence_id: "1569343835062"}
```
-----------------------------------------------------------------------------------

### 2.7 Calling Smart Contracts

Method Name
> topjs.callContract


Parameter

|    Parameter Name          |    Type     |                        Description                         |Mandatory field?|
| :------------------: | :---------: | :-----------------------------------------------------: | :---------:
|   account    | object  |        Account object         | no| 
|   contractAddress    | string  |        Smart contract account object          | yes|
|   actionName    | string  |        Action name         | yes|
|   actionParam    | object  |       Action param         | yes|
|   gasLimit    | int64  |        contract gas balance         | no|
|   coinType    | string  |        coinType         | no|
|   amount    | int64  |        amount         | no|
|   note    | string  |        note         | no|
|   callback    | function  |        callback         | no|

Parameter description:
- account can be uploaded optionally. When it isn't uploaded, account created is defaultAccount under topjs object.
- Before sending transactions, it is required to get the latest nonce and last_hash_xxhash64 first and assign them in the account object. The two parameters can be added in the account object automatically by calling directly the topjs.accountInfo() method.
- The account balance of the initiator should be more than 100,000 before the transaction, it will be used as deposit.
- It can't return the calling results if calling smart contracts interface. The data saved in smart contracts will be in smart contracts account as property which can be got in getProperty.
- in actionParam，the type only support string、number、bool。

Example code:
```javascript
topjs.callContract({
                account: pAccount,
                contractAddress: cAccount.address,
                actionName: 'opt_map',
                actionParam: [{
                    type: 'string',
                    value: 'inkey'
                }, {
                    type: 'number',
                    value: 65
                }]
            });
> CallContractResult
{data: Object, errmsg: "ok", errno: 0, sequence_id: "1569343835062"}
```
-----------------------------------------------------------------------------------

### 2.8 Getting Properties

Method Name
> topjs.getProperty

Parameter

|    Parameter Name          |    Type     |                        Description                         |Mandatory field?|
| :------------------: | :---------: | :-----------------------------------------------------: | :---------: 
|   account    | object  |        Account object         | no| 
|   contractAddress    | string  |        Smart Contract address         | yes|
|   type    | string  |        data type         | yes|
|   data    | string or list   |        data         | yes|
|   callback    | function  |        callback         | no|

Parameter description:
- account can be uploaded optionally. When it isn't uploaded, account created is defaultAccount under topjs object.
- type and data are respectively type and key of the target parameter. There're 3 types in type field: string, map, list.

> The map type data needs 2 keys. The first key corresponds the key of map itself. The second key corresponds the key of map's key-value. So data is an arrey which includes two keys. For example:
```javascript
{
    contractAddress,
    type: 'map',
    data: ['mapKey', 'key'],
}
```
The string and list type data only have the keys themselves. So data is a string. For example:
```javascript
{
    contractAddress,
    type: 'list',
    data: 'listKey',
}
```
```javascript
{
    contractAddress,
    type: 'string',
    data: 'stringKey',
}
```
Supplemental instruction: when getting list data, return directly all data in list.

Example code:
```javascript
topjs.getProperty({
                contractAddress: cAccount.address,
                type: 'map',
                data: ['hmap', 'key']
            });
> AccountTransactionResult
{"data":{"property_value":["val"]},"errmsg":"ok","errno":0,"sequence_id":"1569343835065"}
```
-----------------------------------------------------------------------------------

### 2.9 Parse amount and note data in traders

method
> topjs.utils.decodeActionParam

Parse amount and note data in traders

code
```javascript
const d = await topjs.accountTransaction();
const actionParamObj = topjs.utils.decodeActionParam(d.data.target_action.action_param);
> actionParamObj 
{
    "coinType": "",
    "amount": 110,
    "note": "transfer note"
}
```
------------------------------------------------------------

## Example code

Instruction: When a transaction is sent to the blockchain, signature result verified will be returned immediately. The transaction hasn't been executed at this point. It will be executed successfully after the validation of nodes. So there's setTimeout delay operation in Example Code. code:中存在setTimeout延迟操作。

### Deploying and Calling Smart Contracts
```javascript
const TopJs = require('../src');
const fs = require("fs");

module.exports = async () => {
    const topjs = new TopJs();
    const url = await topjs.getDefaultServerUrl('http://hacker.topnetwork.org/');
    topjs.setProvider(url);
    let pAccount = topjs.accounts.generate();
    let cAccount = topjs.accounts.generate();
    console.log('contractAccount >>> address >', cAccount.address);
    await topjs.requestToken();
    const createAccountResult = await topjs.createAccount({
        account: pAccount
    });
    setTimeout(async()=>{
        const accountInfo = await topjs.accountInfo({
            account: pAccount
        });
        if (accountInfo.data) {
            pAccount.nonce = accountInfo.data.nonce;
            pAccount.last_hash_xxhash64 = accountInfo.data.last_hash_xxhash64;
        }
        var data = fs.readFileSync('D:/project/gerrit/js-sdk/test/map.lua');
        const publishContractResult = await topjs.publishContract({
            account: pAccount,
            contractAccount: cAccount,
            contractCode: data.toString(),
            deposit: 200,
        });
        setTimeout(async() => {
            const contractAccountInfo = await topjs.accountInfo({
                account: cAccount
            });
            const result = await topjs.getProperty({
                contractAddress: cAccount.address,
                type: 'map',
                data: ['hmap', 'key']
            });
            console.log('getProperty Result >>> ', JSON.stringify(result));
            const accountInfoResult = await topjs.getProperty({
                contractAddress: cAccount.address,
                type: 'string',
                data: 'temp_1'
            });
            console.log('getProperty Result >>> ', JSON.stringify(accountInfoResult));
        }, 3000)

        
        setTimeout(async() => {
            const accountInfo = await topjs.accountInfo({
                account: pAccount
            });
            if (accountInfo.data) {
                pAccount.nonce = accountInfo.data.nonce;
                pAccount.last_hash_xxhash64 = accountInfo.data.last_hash_xxhash64;
            }
            const result = await topjs.callContract({
                account: pAccount,
                contractAddress: cAccount.address,
                actionName: 'opt_map',
                actionParam: [{
                    type: 'string',
                    value: 'inkey'
                }, {
                    type: 'number',
                    value: 65
                }]
            });
            console.log('callContract Result >>> ', JSON.stringify(result));
            
            setTimeout(async ()=> {
                const accountInfoResult = await topjs.getProperty({
                    contractAddress: cAccount.address,
                    type: 'map',
                    data: ['hmap', 'inkey']
                });
                console.log('getProperty Result >>> ', JSON.stringify(accountInfoResult));
                
                const result = await topjs.getProperty({
                    contractAddress: cAccount.address,
                    type: 'map',
                    data: ['hmap', 'key']
                });
                console.log('getProperty Result >>> ', JSON.stringify(result));
            }, 3000)

        }, 3000)
    }, 1000)
};
```

Smart Contract
```lua
function init()
    create_key('temp_1')
    create_key('temp_2')
    hcreate('hmap')
    set_key('temp_1', '0')
    set_key('temp_2', '0')
    hset('hmap', 'key', 'val')
    hcreate('empty_map')
    create_key('map_len')
    create_key('map_str')

    lcreate('mlist')
    rpush('mlist', '44')
end

function opt_map(key, value)
    hset('hmap', tostring(key), tostring(value))
    lpush("mlist", tostring(value))
end

function check_map(key)
    local map_len = hlen('hmap')
    set_key('temp_1', tostring(map_len))
    local map_str = hget('hmap', tostring(key))
    set_key('temp_2', tostring(map_str))
    hdel('hmap', tostring(key))
end

function get_empty_map()
    set_key('map_len', tostring(hlen('empty_map')))
    set_key('map_str', tostring(hget('empty_map', 'unexist')))
end

function get_empty_key()
    set_key('map_str', tostring(hget('empty_map', '')))
end

function del_empty_key()
    hdel('hmap', '')
    set_key('map_len', tostring(hlen('empty_map')))
end

function del_not_exist_key()
    hdel('hmap', 'unexist')
    set_key('map_len', tostring(hlen('empty_map')))
end

```

### Transfer
```javascript
const TopJs = require('../src');

module.exports = async () => {
    const topjs = new TopJs();
    const url = await topjs.getDefaultServerUrl('http://hacker.topnetwork.org/');
    topjs.setProvider(url);
    await topjs.requestToken();
    const createAccountResult = await topjs.createAccount();
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
            const actionParamObj = topjs.utils.decodeActionParam(d.data.target_action.action_param);
            console.log('userInfo >>>>> ', d);
        }, 1000);
        
    }, 1000);
};


```
