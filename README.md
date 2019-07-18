# TopJS - Top Net Work JavaScript API

>  top net work javascript api

### 安装
```javascript
npm install topjs
```

### 使用

```javascript
const TopJs = require('topjs');
const topjs = new TopJs('127.0.0.1:19090');
topjs.requestToken();
topjs.createAccount();
topjs.accountInfo();
...
```

### API 列表

------------------------------------------------------------
#### 获取请求token
方法名
> topjs.requestToken

参数
<table>
     <tr>
        <th>参数</th>
        <th>类型</th>
        <th>说明</th>
        <th>是否为必要字段</th>
    </tr>
     <tr>
        <th>callback</th>
        <th>function</th>
        <th>方法回调函数</th>
        <th>否</th>
    </tr>
</table>
返回值
```javascript
true
```
示例代码
```javascript
topjs.requestToken();
> RequestTokenResult {
  error: 0,
  err_msg: 'ok',
  sequence_id: 1563442019244,
  m_token: 'a54fc0a5-3c3b-4d2c-a96b-a3d182df1961',
  m_secret_key: 'c91501bc-e601-4ab0-ba94-4f6f666aba6c',
  m_sign_method: 'hmac_sha2',
  m_sign_version: undefined,
  set_sign_version: '1.0' }
```

------------------------------------------------------------
#### 创建账户
方法名
> topjs.createAccount

参数
<table>
     <tr>
        <th>参数</th>
        <th>类型</th>
        <th>说明</th>
        <th>是否为必要字段</th>
    </tr>
     <tr>
        <th>callback</th>
        <th>function</th>
        <th>方法回调函数</th>
        <th>否</th>
    </tr>
</table>
返回值
```javascript
true
```
示例代码
```javascript
topjs.createAccount();
> CreateAccountResult {
  error: 0,
  err_msg: 'ok',
  sequence_id: 1563442019245,
  account: undefined }
```

------------------------------------------------------------
#### 查询账户信息
方法名
> topjs.accountInfo

参数
<table>
     <tr>
        <th>参数</th>
        <th>类型</th>
        <th>说明</th>
        <th>是否为必要字段</th>
    </tr>
     <tr>
        <th>callback</th>
        <th>function</th>
        <th>方法回调函数</th>
        <th>否</th>
    </tr>
</table>
返回值
```javascript
true
```
示例代码
```javascript
topjs.accountInfo();
> AccountInfoResult {
  error: 0,
  err_msg: 'ok',
  sequence_id: 1563442019246,
  m_balance: 1000000,
  m_nonce: 1,
  m_account: 'T-0-1JYFEExg9KYPas1A3UL86qCN6iSjaUj1uc',
  m_last_hash:
   '0xe36808b3248984e6aeac66450c186aaddacfcc6611ebbfee957b5c6d6ae7dea3',
  m_last_hash_xxhash64: '0x6f233c11f9fec870',
  m_last_unit_height: 1 }
```

------------------------------------------------------------
#### 交易
方法名
> topjs.transfer

参数
<table>
     <tr>
        <th>参数</th>
        <th>类型</th>
        <th>说明</th>
        <th>是否为必要字段</th>
    </tr>
     <tr>
        <th>to_account</th>
        <th>string</th>
        <th>交易接收地址</th>
        <th>是</th>
    </tr>
     <tr>
        <th>callback</th>
        <th>function</th>
        <th>方法回调函数</th>
        <th>否</th>
    </tr>
</table>
返回值
```javascript
true
```
示例代码
```javascript
topjs.transfer(to_account, callback);
> TransferResult {
  error: 0,
  err_msg: 'ok',
  sequence_id: 1563442019247,
  m_info: '' }
```

### topjs sdk 待支持功能清单

#### topjs 主模块

- topjs.version 版本信息
- topjs.setProvider() 设置服务器提供器
- topjs.currentProvider() 当前请求提供器、
- topjs.getBlockNumber() 当前区块编号
- topjs.getBalance() 查询地址余额
- topjs.getTransaction() 查询指定交易
- topjs.sendTransaction() 发送交易
- topjs.sign() 对数据签名

#### topjs.accounts 账户管理

- topjs.accounts.create() 创建账户
- topjs.accounts.privateKeyToAccount() 使用指定私钥创建账户

#### topjs.utils 辅助工具类

- topjs.utils.isAddress() 判断是否是标准地址

#### topjs.contact 合约管理（待定）

#### topjs.wallet 钱包管理 （待定）