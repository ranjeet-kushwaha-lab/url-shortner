import express from 'express'
import mongoose from 'mongoose'
import { shortUrl, getOriginalUrl } from './controllers/url.js';

import dns from 'dns'
dns.setServers(['1.1.1.1', '8.8.8.8']);

const app = express()

app.use(express.urlencoded({ extended: true }))
// app.use(express.json())

mongoose.connect(
    'mongodb+srv://rkrock63065r_db_user:rZu96z3bfQ9QkaYr@cluster0.hqzlyoa.mongodb.net/', {
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