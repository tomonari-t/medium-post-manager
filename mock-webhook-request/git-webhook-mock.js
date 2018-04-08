const fs = require('fs');
const http = require('http');
const minimist = require('minimist');
const request = require('request-promise-native');

const parseStr = (val) => {
    return val;
};

const main = () => {
    const args = minimist(process.argv.slice(2));
    const path = args.path;
    const url = args.url;
    const bufData = fs.readFileSync(path, 'utf8');
    const data = JSON.parse(bufData);

    const req = http.request();
    const requestOption = {
        url: url,
        formData: data
    };
    request.post(requestOption, (err, res, body) => {
        if (err) console.error(err);
        console.log(res);
    });
};

main();
