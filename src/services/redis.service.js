const { RedisConfig } = require("../configs/redis.config");

class RedisService {
    constructor() {
        this.redis = null;
        this.initializeRedis();
    }

    async initializeRedis() {
        this.redis = await RedisConfig.getConnection();
    }

    // string 
    async setString(key, value, ttl = null) {
        const jsonValue = JSON.stringify(value);
        if (ttl) {
            await this.redis.setex(key, ttl, jsonValue);
        } else {
            await this.redis.set(key, jsonValue);
        }
    }

    async getString(key) {
        const value = await this.redis.get(key);
        return JSON.parse(value);
    }

    // bit map
    async setBitMap(key, offset, value = 1) {
        await this.redis.setBit(key, offset, value);
    }

    async getBitMap(key, offset) {
        return await this.redis.getBit(key, offset);
    }
}

module.exports.redisService = new RedisService;
