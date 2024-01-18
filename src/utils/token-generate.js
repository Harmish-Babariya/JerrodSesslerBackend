const crypto = require('crypto');

const generateRandomToken = length => {
    return crypto.randomBytes(length).toString('hex');
}

module.exports = generateRandomToken;