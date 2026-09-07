const cache = new Map();
const CACHE_TTL_MS = 10 * 60 * 1000;

function getCacheKey(lat, lon) {
  return `${parseFloat(lat).toFixed(3)},${parseFloat(lon).toFixed(3)}`;
}

async function fetchWeather(lat, lon) {
  const key = getCacheKey(lat, lon);
  const cached = cache.get(key);
  if (cached && Date.now() - cached.timestamp < CACHE_TTL_MS) {
    return cached.data;
  }

  const weatherUrl = new URL('https://api.open-meteo.com/v1/forecast');
  weatherUrl.searchParams.set('latitude', parseFloat(lat).toFixed(4));
  weatherUrl.searchParams.set('longitude', parseFloat(lon).toFixed(4));
  weatherUrl.searchParams.set('current', 'temperature_2m,relative_humidity_2m,apparent_temperature,is_day,precipitation,weather_code,cloud_cover,pressure_msl,surface_pressure,wind_speed_10m,wind_direction_10m,wind_gusts_10m');
  weatherUrl.searchParams.set('hourly', 'temperature_2m,relative_humidity_2m,dew_point_2m,apparent_temperature,precipitation_probability,precipitation,weather_code,pressure_msl,surface_pressure,cloud_cover,visibility,wind_speed_10m,wind_direction_10m,wind_gusts_10m,uv_index');
  weatherUrl.searchParams.set('daily', 'weather_code,temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min,sunrise,sunset,daylight_duration,uv_index_max,precipitation_sum,precipitation_probability_max,wind_speed_10m_max,wind_gusts_10m_max');
  weatherUrl.searchParams.set('timezone', 'auto');
  weatherUrl.searchParams.set('forecast_days', '8');

  const aqiUrl = new URL('https://air-quality-api.open-meteo.com/v1/air-quality');
  aqiUrl.searchParams.set('latitude', parseFloat(lat).toFixed(4));
  aqiUrl.searchParams.set('longitude', parseFloat(lon).toFixed(4));
  aqiUrl.searchParams.set('current', 'european_aqi,pm10,pm2_5,nitrogen_dioxide,ozone,sulphur_dioxide');
  aqiUrl.searchParams.set('timezone', 'auto');

  const [weatherRes, aqiRes] = await Promise.allSettled([
    fetch(weatherUrl.toString(), { headers: { 'User-Agent': 'NorthstarWeather/2.0' } }),
    fetch(aqiUrl.toString(), { headers: { 'User-Agent': 'NorthstarWeather/2.0' } })
  ]);

  if (weatherRes.status !== 'fulfilled' || !weatherRes.value.ok) {
    if (cached) return cached.data;
    throw new Error('Weather data service temporarily unavailable');
  }

  const weatherData = await weatherRes.value.json();
  let aqiData = null;
  if (aqiRes.status === 'fulfilled' && aqiRes.value.ok) {
    try {
      aqiData = await aqiRes.value.json();
    } catch {
      aqiData = null;
    }
  }

  const normalized = {
    latitude: weatherData.latitude,
    longitude: weatherData.longitude,
    timezone: weatherData.timezone,
    elevation: weatherData.elevation,
    current: weatherData.current,
    hourly: weatherData.hourly,
    daily: weatherData.daily,
    airQuality: aqiData ? aqiData.current : null,
    fetchedAt: new Date().toISOString()
  };

  cache.set(key, { data: normalized, timestamp: Date.now() });

  if (cache.size > 500) {
    const oldestKey = cache.keys().next().value;
    cache.delete(oldestKey);
  }

  return normalized;
}

module.exports = { fetchWeather };
