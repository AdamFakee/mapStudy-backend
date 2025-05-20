'use strict'

const { BadRequestError, ConflictRequestError, AuthFailureError } = require("../../core/error.response");
const { CREATED, CONFLICT, OK } = require("../../core/success.response");
const { comparePassword, hashPassword } = require("../../helpers/bcrypt.helper");
const { hashEmailToInt } = require("../../helpers/hash.helper");
const { generateKeyPairForToken, createTokenPair } = require('../../helpers/jwt.helper');
const { createNewKeyToken, createOrUpdateKeyToken, removerKeyTokenByEmail } = require("../../services/keyToken.service");
const { redisService } = require("../../services/redis.service");
const { createNewUser, getUserByEmail, updateUserByEmail } = require("../../services/user.service");
const { getInfoData } = require("../../utils/object.util");

// signup 
const signup = async ( req, res ) => {
    // skip validation
    const { email, password } = req.body;
    const key = 'signup:user';
    const offset = hashEmailToInt(email);
    // check from redis 
    const existUser = await redisService.getBitMap(key, offset)
    if( existUser ) throw new ConflictRequestError('Error::: user existed');

    const hashPass = await hashPassword( password );
    if( !hashPass ) throw new AuthFailureError('Error::: hash password fails');

    const newUser = await createNewUser({
        ...req.body,
        password: hashPass
    });
    if( !newUser ) throw new BadRequestError('Error::: created fail');

    // create key and token
    const { publicKey, privateKey } = await generateKeyPairForToken();
    const payload = { email: newUser.email };
    const { accessToken, refreshToken } = await createTokenPair( payload, publicKey, privateKey );
    if( !accessToken || !refreshToken ) throw new BadRequestError('Error::: create new pair tokens fail') ;

    const newKeyToken = await createNewKeyToken(newUser.email, { accessToken, refreshToken, privateKey, publicKey });
    if( !newKeyToken ) throw new BadRequestError('Error::: create new key token fail');

    // set redis 
    await redisService.setBitMap(key, offset);

    const fields = [ 'thumbnail', 'name', 'id', 'email' ];
    const metadata = { 
        tokens: {
            accessToken, refreshToken
        }, 
        data: getInfoData({ fields, object: newUser })
    };
    const message = 'signup successfull';
    return new CREATED({ metadata, message }).send(res);
}

// login
const login = async ( req, res ) => {
    const { email, password } = req.body;
    const user = await getUserByEmail( email );
    if( !user ) throw new BadRequestError('Error::: login fail');

    const matchPass = await comparePassword( user.password, password );
    if( !matchPass ) throw new BadRequestError('Error::: comparePassword fail')
    
    // create new token and key
    const { publicKey, privateKey } = await generateKeyPairForToken();
    const payload = { email: user.email };
    const { accessToken, refreshToken } = await createTokenPair( payload, publicKey, privateKey );
    if( !accessToken || !refreshToken ) throw new BadRequestError('Error::: create new pair tokens fail') ;

    await createOrUpdateKeyToken( user.email, { accessToken, refreshToken, privateKey, publicKey });

    const fields = [ 'thumbnail', 'name', 'id', 'email' ];
    const metadata = { 
        tokens: {
            accessToken, refreshToken
        }, 
        data: getInfoData({ fields, object: user })
    };
    const message = 'login successfull';
    return new OK({ metadata, message }).send(res );
}

// logout 
const logout = async ( req, res ) => {
    const keyToken = req.keyToken;
    const delKey = await removerKeyTokenByEmail(keyToken.email);

    if( !delKey ) {
        throw new Error('Error: logout fail')
    }

    const message = 'logout success'
    return new OK({ message }).send(res );
}

const _getUserByEmail = async ( req, res ) => {
    const { email } = req.user;
    const user = await getUserByEmail(email);
    delete user.password;
    const message = 'success';

    const metadata = {user};
    return new OK({ message, metadata }).send(res);
}

// edit profile 
const editProfile = async ( req, res ) => {
    const { email } = req.user;
    const payload = req.body;
    delete payload.password;
    payload.thumbnail = req.imgUrl || null;
    console.log(payload)

    await updateUserByEmail(email, payload)
    const message = 'edit profile'
    return new OK({ message }).send(res );
}

module.exports.userController = {
    login, signup, logout, editProfile, _getUserByEmail
}