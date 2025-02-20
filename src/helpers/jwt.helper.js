'use strict'

const jwt = require('jsonwebtoken');
const { generateKeyPairSync } = require('node:crypto');

const generateKeyPairForToken = async () => {
    const { publicKey, privateKey } = generateKeyPairSync('rsa', {
        modulusLength: 4096,
        publicKeyEncoding: {
            type: 'spki',
            format: 'pem',
        },
        privateKeyEncoding: {
            type: 'pkcs8',
            format: 'pem',
        },
    });

    return { publicKey, privateKey };
}

const verifyToken = ( token, publicKey ) => {
    return jwt.verify(token, publicKey);
}

const createTokenPair = async (payload, publicKey, privateKey) => {
    try {
        // access token
        const accessToken = jwt.sign(payload, privateKey, {
            algorithm: 'RS256',
            expiresIn: '10h'
        });

        // refresh token
        const refreshToken = jwt.sign(payload, privateKey, {
            algorithm: 'RS256',
            expiresIn: '30d'
        });

        // test verify
        verifyToken( accessToken, publicKey )


        return { accessToken, refreshToken };
    } catch (error) {
        throw Error(`Error verifying::: ${error.message}`);
    }
}


module.exports = {
    generateKeyPairForToken,
    createTokenPair,
    verifyToken
};
