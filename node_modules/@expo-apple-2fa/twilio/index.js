var Twilio = require('twilio');
var core = require('@actions/core');

module.exports = function(url) {
    var accountSid = process.env.TWILIO_ACCOUNT_SID;
    var authToken = process.env.TWILIO_AUTH_TOKEN;

    var client = new Twilio(accountSid, authToken);

    return new Promise((resolve, reject) => {
        client.messages.create({
            body: url,
            to: core.getInput('tfa_phone_number'),
            from: process.env.TWILIO_FROM_NUMBER,
        }).then((msg) => {
            console.log('Message sent: ', JSON.stringify(msg));
            resolve();
        }).catch((reason) => {
            console.error('Twilio Error: ', JSON.stringify(reason));
            reject(reason);
        });
    });
}