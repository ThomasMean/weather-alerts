import express from 'express';
import axios from 'axios';
import { UTCtoDate, formatResponse } from './service';
const router = express.Router();

// Main message send route.
router.get('/', async (req: express.Request, res: express.Response) => {

    console.log(req);

    const openWeatherUrl = process.env.OPEN_WEATHER_URL;
    const lat = process.env.LATITUDE;
    const lon = process.env.LONGITUDE;
    const appid = process.env.OPEN_WEATHER_APP_ID;

    const URL = `${openWeatherUrl}?lat=${lat}&lon=${lon}&appid=${appid}&units=metric`;

    let weather: string;

    await axios.get(URL).then(response => {
        console.log(UTCtoDate(response.data.current.dt));
        weather = formatResponse(response.data);
    }).catch(err => {
        const error = err.response.data;
        console.error(error);
    });

    const data = { id: process.env.MESSAGING_SERVICE_ID, message: weather };

    await axios.post(process.env.MESSAGING_SERVICE_URL, data).then(() => {
        res.send('Notification Sent');
        return;
    }).catch(err => {
        res.status(400).send(err);
        console.error(err);
        return;
    });
});

module.exports = router;
