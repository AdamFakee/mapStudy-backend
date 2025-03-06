const { createClient } = require('redis');

class RedisConfig {
    static async getConnection() {
        if( this.instance ) {
            return this.instance;
        }
        return this.instance = new RedisConfig().connection();
    }
    async connection () {
        const client = createClient({
            url: "redis://default:eFBMNI2zx6LWqjaFw2hPPpJiov6bZ8En@redis-16812.c261.us-east-1-4.ec2.redns.redis-cloud.com:16812"
        });        
        return this.instance = await client.connect().catch((e) => console.error(e));
    }
}

module.exports = { RedisConfig };
