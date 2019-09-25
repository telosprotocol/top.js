'use strict';

const ByteBuffer = require('./ByteBuffer');

class ActionParam{

    static ActionAssetOutParam(token_name,amount,memo) {
        let stream = new ByteBuffer().littleEndian();
        stream.string(token_name).int64(amount).string(memo);
        return stream.pack();
    };

    /**
     * 
     * @param {*} actionParam 
     */
    static genCallContractParam(actionParam){
        const XActionParamType = {
            number: '%ld',
            string: '%s',
            bool: '%c',
        };
        if (!actionParam || !Array.isArray(actionParam) || actionParam.length <= 0){
            return [];
        }
        let stream = new ByteBuffer().littleEndian();
        stream.byte(actionParam.length);
        for(var i=0;i<actionParam.length;i++){
            let temp = actionParam[i];
            if (temp && XActionParamType[temp.type]) {
                if (temp.type == 'number') {
                    stream.byte(1);
                    stream.int64(temp.value);
                } else if (temp.type == 'string') {
                    stream.byte(2);
                    stream.string(temp.value);
                } else if (temp.type == 'bool') {
                    stream.byte(2);
                    stream.byte(temp.value);
                } else {
                    throw new Error('do not support type');
                }
            }
        }
        return stream.pack();
    }
}

module.exports = ActionParam;