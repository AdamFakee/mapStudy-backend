'use strict'

const { HEADER } = require("../../consts/header.const");
const { AuthFailureError, NotFoundError } = require("../../core/error.response");
const asyncHandler = require("../../helpers/asyncHandler.helper");
const { verifyToken } = require("../../helpers/jwt.helper");
const { getOneKeyTokenByEmail } = require("../../services/keyToken.service");

const authentication = asyncHandler ( async ( req, res, next ) => {
    /*
        1. check userId missing?
        2. check accessToken
        3. check user in dbs
        4. check keyStore with this userId
        5. ok all => return next
    */
    const userEmail = req.headers[HEADER.CLIENT_EMAIL];
    if(!userEmail) {
        throw new AuthFailureError('Error::: userEmail missing')
    }

    const keyToken = await getOneKeyTokenByEmail(userEmail);
    if(!keyToken) {
        throw new NotFoundError('Error::: user is not exists')
    }

    // chứa refreshToken => trường hợp token hết hạn
    const refreshToken = req.headers[HEADER.REFRESHTOKEN];
    if(refreshToken) {
        try {
            const decoded = verifyToken(refreshToken, keyToken.publicKey);
            if(decoded.email !== userEmail) {
                throw new AuthFailureError('Error::: invalid token')
            }
            req.user = decoded;
            req.refreshToken = refreshToken;
            req.keyToken = keyToken;
            return next();
        } catch (error) {
            throw error
        }
    }

    // trường hợp client gửi req bình thường 
    const accessToken = req.headers[HEADER.AUTHORIZATION];
    if(!accessToken) {
        throw new AuthFailureError('Error::: accessToken missing')
    }

    try {
        const decoded = verifyToken(accessToken, keyToken.publicKey);
        if(decoded.email !== userEmail) {
            throw new AuthFailureError('Error::: invalid token')
        }
        req.user = decoded;
        req.keyToken = keyToken;
        return next();
    } catch (error) {
        throw error
    }
})

module.exports = {
    authentication
}