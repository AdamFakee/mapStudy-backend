'use strict';

const { sequelize } = require('../../../src/configs/database.config');
const { QueryTypes } = require('sequelize');

// mock
jest.mock('../../../src/configs/database.config', () => ({
    sequelize: {
        query: jest.fn()
    }
}));


describe('raw query frame helper', () => {
    it('should return results of raw query', async () => {
        const query = 'SELECT * FROM users WHERE id = 1';
        const mockResults = [ { id: 1, name: 'John Doe' } ];

        sequelize.query.mockResolvedValue(mockResults);

        const results = await sequelize.query(
            query,
            {
                type: QueryTypes.SELECT
            }
        );

        expect(results).toEqual(mockResults);
        expect(sequelize.query).toBeCalledWith(query, { type: QueryTypes.SELECT });
        expect(sequelize.query).toHaveBeenCalledTimes(1);
    })
}); 