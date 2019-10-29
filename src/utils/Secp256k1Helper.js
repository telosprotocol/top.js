const secp256k1 = require('secp256k1');
const ByteBuffer = require('./ByteBuffer');
const Convert = require('./Convert');

class Secp256k1Helper {

    static signData(privateKeyBytes, dataBytes){
        const hash_buffer = Buffer.from(dataBytes);
        const private_key_buffer = Buffer.from(privateKeyBytes);
        const secp256k1_sign = secp256k1.sign(hash_buffer, private_key_buffer);
        let stream = new ByteBuffer().littleEndian();
        stream.byte(secp256k1_sign.recovery).byteArray(secp256k1_sign.signature,secp256k1_sign.signature.length);
        const stream_array =  new Uint8Array(stream.pack());
        const auth_hex = "0x" + Convert.bytes2hex(stream_array);
        return auth_hex;
    }
}

module.exports = Secp256k1Helper;