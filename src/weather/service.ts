import { WeatherData, Reading } from './model';
var moment = require('moment');

export function UTCtoDate(UTC: number): Date {
    const date = new Date(UTC * 1000);
    if (moment(date).isDST()) {
        incrementMonth(date);
    }
    return date;
}
function incrementMonth(date: Date): void {
    date.setHours(date.getHours() + 1);
}

export function formatResponse(data: WeatherData): string {
    let response = formatCurrent(data.current);
    const rainHours: string[] = whenWillItRain(data.hourly);
    if (rainHours.length > 0) {
        response += `\nIt will rain at ${rainHours.join(', ')}`;
    }
    const maxDailyTemp = getMaxDailyTemp(data.hourly);
    response += `\nThe maximum temperature will be ${maxDailyTemp} degrees`;

    return response;
}

export function formatCurrent(current: Reading): string {

    const temp = Math.round(current.temp);
    const weather = current.weather[0].main;
    const response = `The current temperature is ${temp} degrees,\nand the current weather is ${weather}`;
    return response;
}


function whenWillItRain(hourly: Reading[]): string[] {
    return hourly
        .filter(hourlyData => hourlyData.weather[0].description.includes('rain'))
        .map(hourlyData => UTCtoDate(hourlyData.dt).getHours())
        .map(hour => getTwelveHourClock(hour));
}

function getMaxDailyTemp(hourly: Reading[]): number {
    return Math.round(Math.max(...hourly.map(hourlyData => hourlyData.temp)));
}

function getTwelveHourClock(hour: number): string {
    if (hour >= 12) {
        return `${hour % 12}pm`;
    }

    if (hour === 0) {
        hour = 12;
    }

    return `${hour}am`;
}
