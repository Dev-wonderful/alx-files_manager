import { createClient } from 'redis';

class RedisClient {

    constructor() {
        return (async () => {
            this.client = createClient()
            this.client.on('error', err => console.error(err))
            await this.client.connect();
            this.connected = this.client.isReady();
            return this
        })()
    }

    isAlive() {
        return this.connected;
    }

    async get(key) {
        const data = await this.client.get(key);
    }

    async set(key, value, duration) {
        await this.client.set(key, value, duration);
    }
    async del(key) {
        await this.client.del(key)
    }
}

const redisClient = await new RedisClient();

export default redisClient;
