'use strict'

const { hashPassword, comparePassword } = require("../../../src/helpers/bcrypt.helper");
const bcrypt = require('bcrypt');

jest.mock('bcrypt', () => ({
    hash: jest.fn(),
    compare: jest.fn()
}))

describe('bcrypt helper', () => {
    describe('hash password', () => {
        it('should hash password with round = 8', async () => {
            const password = 'xxx';

            bcrypt.hash.mockReturnValue('hash-xxx')

            const hashedPassword = await hashPassword(password);
            expect(bcrypt.hash).toHaveBeenCalledWith(password, 8);
            expect(hashedPassword).toEqual('hash-xxx');
        });
    });
    describe('compare password', () => {
        it('should compare password return true', async () => {
            const passwordInDb = 'hash-xxx';
            const passwordFromUser = 'xxx';

            bcrypt.compare.mockResolvedValue(true)

            const comparePass = await comparePassword( passwordFromUser, passwordInDb );

            expect(comparePass).toEqual(true);
            expect(bcrypt.compare).toHaveBeenCalledWith(passwordInDb, passwordFromUser);
            expect(bcrypt.compare).toHaveBeenCalledTimes(1);
        });

        it('should compare password return false', async () => {
            const passwordInDb = 'hash-xxx';
            const passwordFromUser = 'wrong-password';

            bcrypt.compare.mockResolvedValue(false)

            const comparePass = await comparePassword( passwordFromUser, passwordInDb );

            expect(comparePass).toEqual(false);
            expect(bcrypt.compare).toHaveBeenCalledWith(passwordInDb, passwordFromUser);
            expect(bcrypt.compare).toHaveBeenCalledTimes(1);
        });
    })
})