export interface WeatherData {
    lat: number,
    lon: number,
    timezone: string,
    current: Reading,
    hourly: Reading[],
    daily: DailyReading[]
}

interface DailyReading {
    dt: number,
    sunrise: number,
    sunset: number,
    temp: Temp,
    feels_like: FeelsLikeTemp,
    pressure: number,
    humidity: number,
    dew_point: number,
    wind_speed: number,
    wind_deg: number,
    weather: Weather[]
    clouds: number,
    uvi: number
}

interface Temp {
    day: number,
    min: number,
    max: number,
    night: number,
    eve: number,
    morn: number
}

interface FeelsLikeTemp {
    day: number,
    night: number,
    eve: number,
    morn: number
}


export interface Reading {
    dt: number,
    sunrise: number,
    sunset: number,
    temp: number,
    feels_like: number,
    pressure: number,
    humidity: number,
    dew_point: number,
    uvi: number,
    clouds: number,
    visibility: number,
    wind_speed: number,
    wind_deg: number,
    weather: Weather[]
}

export interface Weather {
    id: number,
    main: string,
    description: string,
    icon: string
}



