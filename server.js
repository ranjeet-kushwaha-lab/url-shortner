import express from 'express';
import mongoose from 'mongoose';
import { shortUrl, getOriginalUrl } from './controllers/url.js';

import dns from 'dns'
dns.setServers(['1.1.1.1', '8.8.8.8']);

import "dotenv/config";
const mongoDB_url = process.env.MongoDB_url;

const app = express()

app.use(express.urlencoded({ extended: true }))
// app.use(express.json())

mongoose.connect(
    mongoDB_url, {
    dbName: "nodejs_course",
}).then(() => console.log('mongoDB connected..!')).catch((err) => console.log(err))

// rendering the ejs file.
app.get('/', (req, res) => res.render('index.ejs', { shortUrl: null }));

// shorting url logic.
app.post('/short', shortUrl)

// redirect the original url using short code :- dynamic routing.
app.get('/:shortCode', getOriginalUrl)

const port = 3000
app.listen(port, () => console.log(`Example app listening at ${port}`))