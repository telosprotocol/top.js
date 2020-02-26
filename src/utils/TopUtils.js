const xxhash = require('xxhashjs');
class TopUtils{
    static addressToTableId(adress) {
        const result = xxhash.h32(adress).digest().toNumber();
        return result & 1023;
    }
}
module.exports = TopUtils;