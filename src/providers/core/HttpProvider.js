/**
 * @file HttpProvider.js
 * @author sawyer.song@topnetwork.org
 * @date 2019-7-19 16:13:42
 */

const http = require('http');
const https = require('https');
const axios = require('axios');

class HttpProvider {
    constructor(host = 'http://localhost:19090', options = {}) {
        this.host = host;
        this.timeout = options.timeout || 0;
        this.headers = options.headers;
        this.withCredentials = options.withCredentials || false;
        this.connected = true;
        this.agent = {};

        let keepAlive = false;
        if (options.keepAlive === true || options.keepAlive !== false) {
            keepAlive = true;
        }

        if (host.substring(0, 5) === 'https') {
            this.httpsAgent = new https.Agent({keepAlive});
        } else {
            this.httpAgent = new http.Agent({keepAlive});
        }
    }
    
    /**
     * Creates the JSON-RPC payload and sends it to the node.
     *
     * @method send
     *
     * @param {String} method
     * @param {Array} parameters
     *
     * @returns {Promise<any>}
     */
    async send(method) {
        console.log('http provider send ', method);
        const config = {
            url: this.host,
            method: 'post',
            headers: this.headers,
            timeout: this.timeout,
            withCredentials: this.withCredentials
        };
        if (this.httpAgent) {
            config.httpAgent = this.httpAgent;
        }
        if (this.httpsAgent) {
            config.httpsAgent = this.httpsAgent;
        }
        const response = await axios(config);
        if (response.status !== 200) {
            throw new Error('request failed, status ' + response.status);
        }

        return response.data;
    }
}

module.exports = HttpProvider;