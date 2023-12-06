import { createClient } from 'redis';
import { promisify } from 'util';

class RedisClient {

    constructor() {
        this.client = createClient()
        this.client.on('error', err => console.error(err))

        this.client.setAsync = promisify(this.client.setex).bind(this.client);
        this.client.getAsync = promisify(this.client.get).bind(this.client);
        this.client.delAsync = promisify(this.client.del).bind(this.client);
    }

    isAlive() {
        return this.client.connected;
    }

    async get(key) {
        const data = await this.client.getAsync(key);
    }

    async set(key, value, duration) {
        await this.client.setAsync(key, duration, value);
    }
    async del(key) {
        await this.client.delAsync(key)
    }
}

const redisClient = new RedisClient();

export default redisClient;
