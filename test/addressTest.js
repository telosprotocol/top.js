const keystore = require('../src/accounts/keystore');

const TopAccounts = require('../src/accounts');

const keyInfo = {
    "account address" : "T00000LTT1eq9qG6tv2yEKHNfkwMmtV6Lwf7F1XL",
    "crypto" : {
       "cipher" : "aes-256-cbc",
       "cipherparams" : {
          "iv" : "0x736091f787f9a6644c2d8762b1cd339a861c02483cf8cbde4235fd2a4c63ffd9"
       },
       "ciphertext" : "0xfba85e09f625752c3fa4ccde7ab6a56591bf8109c77bbe62d76804e81a56ac3e505ede9b82b834a2b3a381ffd9064d3e",
       "kdf" : "hkdf",
       "kdfparams" : {
          "dklen" : 64,
          "info" : "0x1f82290c82936be7",
          "prf" : "sha3-256",
          "salt" : "0x21ae2d329af87e38a2b98e584ce25979d687e87d6345a24ac42bb96d447c1c25"
       },
       "mac" : "0x2a038ba664a0deaf04e23ec42e626237abbf65f93c61d654e40f41bd2e7ab63c"
    },
    "hint" : "",
    "key_type" : "owner",
    "public_key" : "BH9OtVlI8kB9xGlKXW32CuuNTvJGt/VVdiZfs7ITmdrpYFdPRFAJjmfvJBul/L+eYPsJm0c37m/foYvzN6BZUog="
 }

 const ethKeyInfo = {
    "account_address" : "T80000968927100f3cb7b23e8d477298311648978d8613",
    "address" : "968927100f3cb7b23e8d477298311648978d8613",
    "crypto" : {
       "cipher" : "aes-128-ctr",
       "cipherparams" : {
          "iv" : "e40a554c807b913c6e882e933ee6c103"
       },
       "ciphertext" : "762381ac2219511c647d27424761e81fecc14170eeff6e20412d6c9311149060",
       "kdf" : "scrypt",
       "kdfparams" : {
          "dklen" : 32,
          "n" : 262144,
          "p" : 1,
          "r" : 8,
          "salt" : "69c473d9a1ae16ad7cbab057101ccb9632d4109bf7f44e7ff2eba59e269f9932"
       },
       "mac" : "7d3c31b6aa3f43885682259e6e632b44799700cc7030bdbc1dddb2f587066dac"
    },
    "hint" : "",
    "id" : "b2951865-c391-9d98-ff85-83e149f88990",
    "key_type" : "owner",
    "public_key" : "BK2CfxnSP0cL9/dbi6b3krWUlQP1jP4EIHu5Y5c2vMBNLMYMOE8K3mqOubDPQXBXc/D4ydtR0LDyWUEyxHO/ZZU=",
    "version" : 3
 }

 let topPk = keystore.decodeAes256(' ', keyInfo);
 let ethPk = keystore.decodeEthAes(' ', ethKeyInfo);

 let topHexPk = Buffer.from(topPk, 'base64').toString('hex')
 console.log('top hex pk > ' + topHexPk)

 let accounts = new TopAccounts();
 let user = accounts.generate({ privateKey: topHexPk });
 console.log(user)