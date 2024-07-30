console.log('Main');
import 'dotenv/config';
import express from 'express';
import colors from 'colors';
import { createClient } from 'redis';
import connectDB from '@configs/db.mjs';
const port = process.env.PORT || 3000;
const redisClient = createClient({});
redisClient.on('error', (err) => {
    console.log(err);
    console.log(colors.red('Redis Client Error'));
    process.exit(1);
});
redisClient.on('connect', () => {
    console.log(colors.green('Redis plugged in.'));
});
await redisClient.connect();
// await connectDB()
const startServer = () => {
    const app = express();
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));
    app.get('/', (req, res) => {
        return res.send('Welcome to the server');
    });
    app.get('/ok', (req, res) => {
        return res.send('Hello, world');
    });
    app.listen(port, () => {
        console.log(`Server is running on http://localhost:${port}`);
    }).on('error', (e) => {
        console.log(`Error: ${e.message}`);
    });
};

connectDB()
    .then(() => {
        startServer();
    })
    .catch((err) => {
        console.log(`Error: ${err.message}`);
    });
