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
            short : '%c',
        
            // uint32_t
            int : '%d',
        
            // uint64_t
            long: '%ld',
        
            string: '%s',
        };
        let paramPre = '';
        if (!actionParam || !Array.isArray(actionParam) || actionParam.length <= 0){
            return [];
        }
        for(var i=0;i<actionParam.length;i++){
            let temp = actionParam[i];
            if (temp && XActionParamType[temp.type] && temp.value) {
                paramPre += XActionParamType[temp.type];
            }
        }
        let stream = new ByteBuffer().littleEndian();
        stream.string(paramPre);
        for(var i=0;i<actionParam.length;i++){
            let temp = actionParam[i];
            if (temp && XActionParamType[temp.type] && temp.value) {
                if (temp.type == 'short') {
                    stream.ushort(temp.value);
                } else if (temp.type == 'int') {
                    stream.uint32(temp.value);
                } else if (temp.type == 'long') {
                    stream.int64(temp.value);
                } else if (temp.type == 'string') {
                    stream.string(temp.value);
                } else {
                    throw new Error('do not support type');
                }
            }
        }
        return stream.pack();
    }
}

module.exports = ActionParam;