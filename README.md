topjs sdk 功能清单

topjs 主模块，
    1. topjs.version 版本信息
    2. topjs.setProvider() 设置服务器提供器
    3. topjs.currentProvider() 当前请求提供器
    4. topjs.getBlockNumber() 当前区块编号
    5. topjs.getBalance() 查询地址余额
    6. topjs.getTransaction() 查询指定交易
    7. topjs.sendTransaction() 发送交易
    8. topjs.sign() 对数据签名

topjs.accounts 账户管理
    1. topjs.accounts.create() 创建账户
    2. topjs.accounts.privateKeyToAccount() 使用指定私钥创建账户

topjs.utils 辅助工具类
    1. topjs.utils.isAddress() 判断是否是标准地址

topjs.contact 合约管理（待定）

topjs.wallet 钱包管理 （待定）
