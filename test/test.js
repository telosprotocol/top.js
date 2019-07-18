const TopJs = require('../index');

const tj = new TopJs('127.0.0.1:19090');
tj.requestToken(() => {
    tj.createAccount(() => {
        const start = Date.now();
        while(Date.now() - start < 3000) {}
        tj.accountInfo(() => {
            while(Date.now() - start < 8000) {}
            const to_account = "T-0-1EHzT2ejd12uJx7BkDgkA7B5DS1nM6AXyF";
            tj.transfer(to_account, () => {
                while(Date.now() - start < 15000) {}
                tj.accountInfo();
            });
        });
    });
});