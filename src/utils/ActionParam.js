'use strict';

const ByteBuffer = require('./ByteBuffer');

class ActionParam{

    static ActionAssetOutParam(token_name,amount,memo) {
        let stream = new ByteBuffer().littleEndian();
        stream.string(token_name).int64(amount).string(memo);
        return stream.pack();
    };
}

module.exports = ActionParam;