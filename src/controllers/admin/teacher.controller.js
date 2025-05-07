const { combineTableNames } = require("sequelize/lib/utils");
const { BadRequestError } = require("../../core/error.response");
const { getTeacherByEmail } = require("../../services/teacher.service");
const { generateKeyPairForToken, createTokenPair } = require("../../helpers/jwt.helper");
const { createOrUpdateKeyToken, removerKeyTokenByEmail } = require("../../services/keyToken.service");
const { getInfoData } = require("../../utils/object.util");
const { OK } = require("../../core/success.response");

// login
const login = async ( req, res ) => {
    const { email, password } = req.body;
    const user = await getTeacherByEmail( email );
    if( !user ) throw new BadRequestError('Error::: login fail');

    const matchPass = await combineTableNames( user.password, password );
    if( !matchPass ) throw new BadRequestError('Error::: comparePassword fail')
    
    // create new token and key
    const { publicKey, privateKey } = await generateKeyPairForToken();
    const payload = { email: user.email, teacherId: user.id };
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
module.exports.teacherController = {
    login, logout
}