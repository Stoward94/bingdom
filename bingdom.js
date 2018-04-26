const https = require('https');

const letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
const chromeUserAgent = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/66.0.3359.117 Safari/537.36';
const iPhoneUserAgent = 'Mozilla/5.0 (iPhone; CPU iPhone OS 10_2_1 like Mac OS X) AppleWebKit/602.4.6 (KHTML, like Gecko) Version/10.0 Mobile/14D27 Safari/602.1';
const cookie = process.env.BINGDOM_COOKIE;
const oneDay = 8.64e+7;

const options = {
    hostname: 'www.bing.com',
    path: '',
    headers: {
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        'Cookie': cookie,
        'User-Agent': iPhoneUserAgent
    }
};

/**
 * Performs 20+ https requests with an iPhone user agent
 */
function sendMobileRequests() {
    console.log('Sending Mobile Requests');
    letters.forEach((l, i) => {

        // Fake a random interval, looks more human
        const randomInterval = Math.floor(Math.random() * 2000) + 2000;
        const path = '/search?q=' + l;

        setTimeout(() => {
            options.path = path;
            options.headers['User-Agent'] = iPhoneUserAgent;
            https.get(options, (res) => handleRes(res, path));
        }, i * randomInterval);
    });
};

/**
 * Performs 30 https requests with an desktop chrome user agent
 */
function sendDesktopRequests() {
    console.log('Sending Desktop Requests');
    for (let i = 1; i <= 31; i++) {

        // Fake a random interval, looks more human
        const randomInterval = Math.floor(Math.random() * 2000) + 2000;
        const path = '/search?q=' + i;

        setTimeout(() => {
            options.path = path;
            options.headers['User-Agent'] = chromeUserAgent;
            https.get(options, (res) => handleRes(res, path));
        }, i * randomInterval);
    }
}

/**
 * Logs the response status code and path to the console
 * @param {Object} res
 * @param {String} path
 */
function handleRes(res, path) {
    console.log(`${path}: ${res.statusCode}`);
};

// Ensure that this is run once a day.
setInterval(() => {
    sendMobileRequests();
    setTimeout(sendDesktopRequests, 60000);
}, oneDay);
