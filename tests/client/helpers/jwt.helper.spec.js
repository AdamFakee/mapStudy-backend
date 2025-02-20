'use strict';

const jwt = require('jsonwebtoken');
const { generateKeyPairForToken, verifyToken, createTokenPair } = require('../../../src/helpers/jwt.helper');

jest.mock('jsonwebtoken', () => ({
    sign: jest.fn(), 
    verify: jest.fn(), 
}));

describe('JWT Helper Functions', () => {
    describe('generateKeyPairForToken', () => {
        it('should generate a valid public-private key pair', async () => {
            const { publicKey, privateKey } = await generateKeyPairForToken();

            expect(publicKey).toBeDefined();
            expect(privateKey).toBeDefined();
            expect(typeof publicKey).toBe('string');
            expect(typeof privateKey).toBe('string');
        });
    });

    describe('verifyToken', () => {
        it('should verify and return the decoded token payload', () => {
            const mockToken = 'valid.token.string';
            const mockPublicKey = 'mock-public-key';
            const mockPayload = { email: 'test@example.com' };

            jwt.verify.mockReturnValue(mockPayload);

            const decoded = verifyToken(mockToken, mockPublicKey);

            expect(decoded).toEqual(mockPayload);
            expect(jwt.verify).toHaveBeenCalledWith(mockToken, mockPublicKey);
            expect(jwt.verify).toHaveBeenCalledTimes(1);
        });

        it('should throw an error for an invalid token', () => {
            const mockToken = 'invalid.token';
            const mockPublicKey = 'mock-public-key';

            jwt.verify.mockImplementation(() => {
                throw new Error('Invalid token');
            });

            expect(() => verifyToken(mockToken, mockPublicKey)).toThrow('Invalid token');
            expect(jwt.verify).toHaveBeenCalledWith(mockToken, mockPublicKey);
        });
    });

    describe('createTokenPair', () => {
        it('should return access token and refresh token', async () => {
            const payload = { email: 'test@example.com' };
            const publicKey = 'mock-public-key';
            const privateKey = 'mock-private-key';

            jwt.sign.mockImplementationOnce(() => 'mock-access-token');
            jwt.sign.mockImplementationOnce(() => 'mock-refresh-token');

            jwt.verify.mockReturnValue(payload);

            const { accessToken, refreshToken } = await createTokenPair(payload, publicKey, privateKey);

            expect(accessToken).toEqual('mock-access-token');
            expect(refreshToken).toEqual('mock-refresh-token');

            expect(jwt.sign).toHaveBeenCalledWith(payload, privateKey, { algorithm: 'RS256', expiresIn: '10h' });
            expect(jwt.sign).toHaveBeenCalledWith(payload, privateKey, { algorithm: 'RS256', expiresIn: '30d' });

            expect(jwt.sign).toHaveBeenCalledTimes(2);
            expect(jwt.verify).toHaveBeenCalledWith('mock-access-token', publicKey);
        });

        it('should throw an error when token verification fails', async () => {
            const payload = { email: 'test@example.com' };
            const publicKey = 'mock-public-key';
            const privateKey = 'mock-private-key';

            jwt.sign.mockImplementationOnce(() => 'mock-access-token');
            jwt.sign.mockImplementationOnce(() => 'mock-refresh-token');

            jwt.verify.mockImplementation(() => {
                throw new Error('Verification failed');
            });

            await expect(createTokenPair(payload, publicKey, privateKey)).rejects.toThrow('Error verifying::: Verification failed');

            expect(jwt.verify).toHaveBeenCalledWith('mock-access-token', publicKey);
        });
    });
});