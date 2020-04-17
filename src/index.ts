import express from 'express';
const weather = require('./weather');

require('dotenv').config();
const app = express();
const port = process.env.PORT || 8080; // default port to listen

// define a route handler for the default home page
app.get('/', (req, res) => {
    res.send('Hello world!');
});

app.use('/weather', weather);


// start the Express server
app.listen(port, () => {
    console.log(`server started at http://localhost:${port}`);
});
