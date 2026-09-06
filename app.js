const storage = {
  get(key, fallback = null) {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : fallback;
    } catch {
      return fallback;
    }
  },
  set(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch {
      return false;
    }
  },
  remove(key) {
    try {
      localStorage.removeItem(key);
      return true;
    } catch {
      return false;
    }
  }
};

function escapeHtml(str) {
  if (str == null) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

const elements = {
  
  updatedAt: document.querySelector('#updatedAt'),
  weatherAlertsContainer: document.querySelector('#weatherAlertsContainer'),

  
  form: document.querySelector('#searchForm'),
  input: document.querySelector('#cityInput'),
  suggestions: document.querySelector('#searchSuggestions'),
  locationButton: document.querySelector('#locationButton'),
  status: document.querySelector('#formStatus'),
  recentContainer: document.querySelector('#recentSearchesContainer'),
  recentPills: document.querySelector('#recentPills'),
  clearRecentBtn: document.querySelector('#clearRecentBtn'),

  
  unitOptions: document.querySelectorAll('[data-unit]'),
  windUnitOptions: document.querySelectorAll('[data-wind-unit]'),
  refreshButton: document.querySelector('#refreshButton'),
  shareButton: document.querySelector('#shareButton'),
  shareFeedback: document.querySelector('#shareFeedback'),

  
  card: document.querySelector('#skyCard'),
  location: document.querySelector('#locationName'),
  region: document.querySelector('#locationRegion'),
  localTimeDisplay: document.querySelector('#localTimeDisplay'),
  favButton: document.querySelector('#favButton'),
  summary: document.querySelector('#weatherSummary'),
  temperature: document.querySelector('#temperature'),
  temperatureUnit: document.querySelector('#temperatureUnit'),
  feelsLike: document.querySelector('#feelsLike'),
  daylight: document.querySelector('#daylight'),
  coordinates: document.querySelector('#coordinates'),

  
  favoritesSection: document.querySelector('#favoritesSection'),
  favoritesCount: document.querySelector('#favoritesCount'),
  favoritesGrid: document.querySelector('#favoritesGrid'),

  
  dateStamp: document.querySelector('#dateStamp'),
  windSpeed: document.querySelector('#windSpeed'),
  windSpeedUnit: document.querySelector('#windSpeedUnit'),
  windDirection: document.querySelector('#windDirection'),
  windArrow: document.querySelector('#windArrow'),
  humidity: document.querySelector('#humidity'),
  humidityBar: document.querySelector('#humidityBar'),
  humidityNote: document.querySelector('#humidityNote'),
  highTemp: document.querySelector('#highTemp'),
  highTempUnit: document.querySelector('#highTempUnit'),
  lowTemp: document.querySelector('#lowTemp'),
  rangeTrack: document.querySelector('#rangeTrack'),
  rangeNote: document.querySelector('#rangeNote'),
  visibility: document.querySelector('#visibility'),
  visibilityUnit: document.querySelector('#visibilityUnit'),
  pressure: document.querySelector('#pressure'),
  pressureNote: document.querySelector('#pressureNote'),
  dewPoint: document.querySelector('#dewPoint'),
  dewPointUnit: document.querySelector('#dewPointUnit'),
  dewPointNote: document.querySelector('#dewPointNote'),
  cloudCover: document.querySelector('#cloudCover'),
  cloudCoverBar: document.querySelector('#cloudCoverBar'),
  cloudCoverNote: document.querySelector('#cloudCoverNote'),
  uvIndex: document.querySelector('#uvIndex'),
  uvMax: document.querySelector('#uvMax'),
  uvScaleFill: document.querySelector('#uvScaleFill'),
  uvNote: document.querySelector('#uvNote'),

  
  hourlyList: document.querySelector('#hourlyList'),
  hourlyNote: document.querySelector('#hourlyNote'),
  hourlyPrevBtn: document.querySelector('#hourlyPrevBtn'),
  hourlyNextBtn: document.querySelector('#hourlyNextBtn'),

  
  temperatureChart: document.querySelector('#temperatureChart'),
  chartTooltip: document.querySelector('#chartTooltip'),
  intelligenceTitle: document.querySelector('#intelligenceTitle'),
  intelligenceText: document.querySelector('#intelligenceText'),
  insightTags: document.querySelector('#insightTags'),
  bestTimeSection: document.querySelector('#bestTimeSection'),
  bestTimeGrid: document.querySelector('#bestTimeGrid'),

  
  rainCallout: document.querySelector('#rainCallout'),
  precipProbability: document.querySelector('#precipProbability'),
  precipAmount: document.querySelector('#precipAmount'),
  precipUnit: document.querySelector('#precipUnit'),
  precipBars: document.querySelector('#precipBars'),

  
  daylightStatus: document.querySelector('#daylightStatus'),
  sunrise: document.querySelector('#sunrise'),
  sunset: document.querySelector('#sunset'),
  daylightDuration: document.querySelector('#daylightDuration'),
  solarArcContainer: document.querySelector('#solarArcContainer'),
  moonSymbol: document.querySelector('#moonSymbol'),
  moonPhase: document.querySelector('#moonPhase'),
  moonIllumination: document.querySelector('#moonIllumination'),
  nextMoonPhase: document.querySelector('#nextMoonPhase'),
  lunarGraphicContainer: document.querySelector('#lunarGraphicContainer'),

  
  aqCategory: document.querySelector('#aqCategory'),
  airQualityGrid: document.querySelector('#airQualityGrid'),
  airQualityEmpty: document.querySelector('#airQualityEmpty'),

  
  mapSection: document.querySelector('#mapSection'),
  weatherMap: document.querySelector('#weatherMap'),
  mapCoordDisplay: document.querySelector('#mapCoordDisplay'),
  mapHint: document.querySelector('#mapHint'),

  
  compareSection: document.querySelector('#compareSection'),
  compareSlot1Name: document.querySelector('#compareSlot1Name'),
  compareSlot1Region: document.querySelector('#compareSlot1Region'),
  compareSlot2Card: document.querySelector('#compareSlot2Card'),
  compareSlot2SearchWrap: document.querySelector('#compareSlot2SearchWrap'),
  compareSlot2Input: document.querySelector('#compareSlot2Input'),
  compareSlot2Suggestions: document.querySelector('#compareSlot2Suggestions'),
  compareSlot2Info: document.querySelector('#compareSlot2Info'),
  compareSlot2Name: document.querySelector('#compareSlot2Name'),
  compareSlot2Region: document.querySelector('#compareSlot2Region'),
  compareSlot2Clear: document.querySelector('#compareSlot2Clear'),
  compareSlot3Card: document.querySelector('#compareSlot3Card'),
  compareSlot3SearchWrap: document.querySelector('#compareSlot3SearchWrap'),
  compareSlot3Input: document.querySelector('#compareSlot3Input'),
  compareSlot3Suggestions: document.querySelector('#compareSlot3Suggestions'),
  compareSlot3Info: document.querySelector('#compareSlot3Info'),
  compareSlot3Name: document.querySelector('#compareSlot3Name'),
  compareSlot3Region: document.querySelector('#compareSlot3Region'),
  compareSlot3Clear: document.querySelector('#compareSlot3Clear'),
  compareEmptyPrompt: document.querySelector('#compareEmptyPrompt'),
  compareTable: document.querySelector('#compareTable'),
  compareTableBody: document.querySelector('#compareTableBody'),
  thCity1: document.querySelector('#thCity1'),
  thCity2: document.querySelector('#thCity2'),
  thCity3: document.querySelector('#thCity3'),

  
  forecast: document.querySelector('#forecastList')
};

let currentPlace = null;
let currentData = null;
let temperatureUnit = storage.get('northstar_preferences', {})?.tempUnit || 'celsius';
let windUnit = storage.get('northstar_preferences', {})?.windUnit || 'kmh';

const WEATHER_CACHE_TTL_MS = 10 * 60 * 1000; 
const weatherCache = new Map(); 
const inFlightRequests = new Map(); 
let activeWeatherAbortController = null;
let activeSearchAbortController = null;
let pendingMapData = null;
let mapObserver = null;

let leafletMap = null;
let mapMarker = null;

let comparisonSlots = {
  slot1: null, 
  slot2: null,
  slot3: null
};

let suggestionDebounceTimer = null;
let selectedSuggestionIndex = -1;
let currentSuggestions = [];

const weatherDescriptions = {
  0: ['Clear sky', 'Clear'],
  1: ['Mainly clear', 'Clear'],
  2: ['Partly cloudy', 'PartlyCloudy'],
  3: ['Overcast', 'Overcast'],
  45: ['Foggy', 'Fog'],
  48: ['Rime fog', 'Fog'],
  51: ['Light drizzle', 'Drizzle'],
  53: ['Drizzle', 'Drizzle'],
  55: ['Heavy drizzle', 'Drizzle'],
  56: ['Freezing drizzle', 'Drizzle'],
  57: ['Freezing drizzle', 'Drizzle'],
  61: ['Light rain', 'Rain'],
  63: ['Moderate rain', 'Rain'],
  65: ['Heavy rain', 'Rain'],
  66: ['Freezing rain', 'Rain'],
  67: ['Freezing rain', 'Rain'],
  71: ['Light snow', 'Snow'],
  73: ['Snow', 'Snow'],
  75: ['Heavy snow', 'Snow'],
  77: ['Snow grains', 'Snow'],
  80: ['Light showers', 'Showers'],
  81: ['Rain showers', 'Showers'],
  82: ['Heavy showers', 'Showers'],
  85: ['Snow showers', 'Snow'],
  86: ['Heavy snow showers', 'Snow'],
  95: ['Thunderstorm', 'Storm'],
  96: ['Thunderstorm with hail', 'Storm'],
  99: ['Severe thunderstorm with hail', 'Storm']
};

function getWeatherLabel(code) {
  return weatherDescriptions[code] || ['Changing conditions', 'PartlyCloudy'];
}

function getWeatherIconSvg(type, isDay = true) {
  const commonAttrs = 'viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"';

  switch (type) {
    case 'Clear':
      if (isDay) {
        return `<svg ${commonAttrs}><circle cx="12" cy="12" r="4"></circle><line x1="12" y1="2" x2="12" y2="4"></line><line x1="12" y1="20" x2="12" y2="22"></line><line x1="4.93" y1="4.93" x2="6.34" y2="6.34"></line><line x1="17.66" y1="17.66" x2="19.07" y2="19.07"></line><line x1="2" y1="12" x2="4" y2="12"></line><line x1="20" y1="12" x2="22" y2="12"></line><line x1="4.93" y1="19.07" x2="6.34" y2="17.66"></line><line x1="17.66" y1="6.34" x2="19.07" y2="4.93"></line></svg>`;
      }
      return `<svg ${commonAttrs}><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>`;

    case 'PartlyCloudy':
      if (isDay) {
        return `<svg ${commonAttrs}><path d="M12 2v2M4.93 4.93l1.41 1.41M2 12h2M20 12h2M17.66 6.34l1.41-1.41"></path><path d="M17.5 19H9a5 5 0 0 1 0-10c.34 0 .67.03 1 .1A6 6 0 0 1 21 14a4 4 0 0 1-3.5 5z"></path></svg>`;
      }
      return `<svg ${commonAttrs}><path d="M17.5 19H9a5 5 0 0 1 0-10c.34 0 .67.03 1 .1A6 6 0 0 1 20 14a4 4 0 0 1-2.5 5z"></path><path d="M16 4a5 5 0 0 0-5 5"></path></svg>`;

    case 'Overcast':
    case 'Cloudy':
      return `<svg ${commonAttrs}><path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"></path></svg>`;

    case 'Drizzle':
      return `<svg ${commonAttrs}><path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"></path><line x1="8" y1="21" x2="8" y2="23"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="16" y1="21" x2="16" y2="23"></line></svg>`;

    case 'Rain':
      return `<svg ${commonAttrs}><path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"></path><line x1="8" y1="19" x2="6" y2="23"></line><line x1="13" y1="19" x2="11" y2="23"></line><line x1="18" y1="19" x2="16" y2="23"></line></svg>`;

    case 'Showers':
      return `<svg ${commonAttrs}><path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"></path><line x1="7" y1="19" x2="5" y2="23"></line><line x1="11" y1="19" x2="9" y2="23"></line><line x1="15" y1="19" x2="13" y2="23"></line><line x1="19" y1="19" x2="17" y2="23"></line></svg>`;

    case 'Storm':
      return `<svg ${commonAttrs}><path d="M19 13.5h-1.26A8 8 0 1 0 9 20h3"></path><polyline points="13 14 10 19 14 19 11 24"></polyline></svg>`;

    case 'Snow':
      return `<svg ${commonAttrs}><path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"></path><line x1="8" y1="20" x2="8" y2="20.01"></line><line x1="12" y1="22" x2="12" y2="22.01"></line><line x1="16" y1="20" x2="16" y2="20.01"></line></svg>`;

    case 'Fog':
      return `<svg ${commonAttrs}><path d="M5 9h14"></path><path d="M3 13h18"></path><path d="M7 17h10"></path><path d="M4 21h16"></path></svg>`;

    default:
      return `<svg ${commonAttrs}><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line></svg>`;
  }
}

const compass = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];

function getWindDirection(degrees) {
  if (!Number.isFinite(degrees)) return 'Variable';
  const direction = compass[Math.round(degrees / 45) % 8];
  const names = {
    N: 'Northerly',
    NE: 'Northeasterly',
    E: 'Easterly',
    SE: 'Southeasterly',
    S: 'Southerly',
    SW: 'Southwesterly',
    W: 'Westerly',
    NW: 'Northwesterly'
  };
  return `${names[direction]} breeze`;
}

function safeNumber(value, fallback = 0) {
  const num = Number(value);
  return Number.isFinite(num) ? num : fallback;
}

function hasNumber(value) {
  return value !== null && value !== undefined && Number.isFinite(Number(value));
}

function convertTemperature(value) {
  if (!hasNumber(value)) return '--';
  const num = Number(value);
  return temperatureUnit === 'fahrenheit' ? Math.round((num * 9) / 5 + 32) : Math.round(num);
}

function temperatureSuffix() {
  return temperatureUnit === 'fahrenheit' ? '°F' : '°C';
}

function convertWind(kmh) {
  if (!hasNumber(kmh)) return '--';
  const num = Number(kmh);
  return windUnit === 'mph' ? Math.round(num * 0.621371) : Math.round(num);
}

function windSuffix() {
  return windUnit === 'mph' ? 'mph' : 'km/h';
}

function formatClock(value, timeZone = null) {
  if (!value) return '--';
  if (value instanceof Date) {
    const opts = { hour: 'numeric', minute: '2-digit' };
    if (timeZone) opts.timeZone = timeZone;
    return new Intl.DateTimeFormat('en-US', opts).format(value);
  }
  const match = String(value).match(/T(\d{2}):(\d{2})/);
  if (!match) return '--';
  const hour = Number(match[1]);
  const suffix = hour >= 12 ? 'PM' : 'AM';
  return `${hour % 12 || 12}:${match[2]} ${suffix}`;
}

function formatLocalTime(timeZone) {
  try {
    const now = new Date();
    const opts = {
      timeZone: timeZone || 'UTC',
      hour: 'numeric',
      minute: '2-digit',
      timeZoneName: 'short'
    };
    return new Intl.DateTimeFormat('en-US', opts).format(now);
  } catch {
    return formatClock(new Date());
  }
}

function formatDuration(sunrise, sunset) {
  if (!sunrise || !sunset) return '--';
  const difference = new Date(sunset) - new Date(sunrise);
  if (!Number.isFinite(difference) || difference < 0) return '--';
  const hours = Math.floor(difference / 3600000);
  const minutes = Math.round((difference / 60000) % 60);
  return `${hours}h ${String(minutes).padStart(2, '0')}m`;
}

function formatDay(date, index) {
  if (index === 0) return 'Today';
  const calendarDate = typeof date === 'string' ? new Date(`${date}T00:00:00Z`) : date;
  return new Intl.DateTimeFormat('en', { weekday: 'short', timeZone: 'UTC' }).format(calendarDate);
}

function formatDate(date, timeZone = null) {
  if (!date) return '--';
  const calendarDate = typeof date === 'string' ? new Date(`${date}T12:00:00Z`) : date;
  const opts = {
    weekday: 'short',
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    timeZone: timeZone || 'UTC'
  };
  return new Intl.DateTimeFormat('en', opts).format(calendarDate).toUpperCase().replace(',', ' /');
}

function formatMetric(value, decimals = 0) {
  if (!hasNumber(value)) return '--';
  return decimals ? Number(value).toFixed(decimals) : Math.round(Number(value)).toString();
}

function formatAmount(value) {
  if (!hasNumber(value)) return '0.0';
  const amount = safeNumber(value);
  return amount < 10 ? amount.toFixed(1) : Math.round(amount).toString();
}

function getUvCategory(value) {
  if (!hasNumber(value)) return ['Unavailable', 'UV risk unavailable'];
  const uv = Number(value);
  if (uv <= 2) return ['Low', 'Low UV risk'];
  if (uv <= 5) return ['Moderate', 'Moderate UV risk'];
  if (uv <= 7) return ['High', 'High UV risk'];
  if (uv <= 10) return ['Very high', 'Very high UV risk'];
  return ['Extreme', 'Extreme UV risk'];
}

function getDewPointNote(value) {
  if (!hasNumber(value)) return 'Unavailable';
  if (value < 10) return 'Dry-feeling, crisp air';
  if (value < 16) return 'Comfortable air moisture';
  if (value < 21) return 'Somewhat humid air';
  return 'Humid, heavy air';
}

function getVisibilityNote(km) {
  if (!hasNumber(km)) return 'Unavailable';
  if (km >= 10) return 'Excellent';
  if (km >= 4) return 'Good';
  if (km >= 1) return 'Reduced';
  return 'Low';
}

function getMoonData(date = new Date()) {
  const days = (date - new Date('2000-01-06T18:14:00Z')) / 86400000;
  const phase = ((days / 29.53058867) % 1 + 1) % 1;
  const illumination = Math.round((1 - Math.cos(phase * Math.PI * 2)) * 50);
  const phases = [
    'New Moon',
    'Waxing Crescent',
    'First Quarter',
    'Waxing Gibbous',
    'Full Moon',
    'Waning Gibbous',
    'Last Quarter',
    'Waning Crescent'
  ];
  const index = Math.round(phase * 8) % 8;
  const next = phase < 0.25 ? 'First Quarter' : phase < 0.5 ? 'Full Moon' : phase < 0.75 ? 'Last Quarter' : 'New Moon';
  return { name: phases[index], phase, illumination, next };
}

function getCurrentHourIndex(times, currentTime) {
  if (!Array.isArray(times) || !times.length) return 0;
  const currentHour = String(currentTime || '').slice(0, 13);
  const exactHour = times.findIndex((time) => String(time).slice(0, 13) === currentHour);
  if (exactHour >= 0) return exactHour;
  const nextHour = times.findIndex((time) => time >= currentTime);
  return nextHour >= 0 ? nextHour : 0;
}

function getErrorMessage(error) {
  if (!error) return 'Atmospheric observations are temporarily unavailable.';
  const msg = typeof error === 'string' ? error : (error.message || '');
  const name = error.name || '';
  if (error.code === 1 || /denied/i.test(msg)) {
    return 'Location access was not granted. Please search for your city above.';
  }
  if (error.code === 2 || error.code === 3 || /position|timeout/i.test(msg)) {
    return 'Unable to retrieve current geographical position. Please search for your city above.';
  }
  if (name === 'TypeError' || /failed to fetch|network|offline|load failed/i.test(msg)) {
    return 'Unable to reach atmospheric services. Please check your network connection.';
  }
  if (/not found/i.test(msg)) {
    return 'Location could not be found. Please check spelling and try again.';
  }
  if (/abort/i.test(name) || /abort/i.test(msg)) {
    return 'Request superseded. Refreshing weather data...';
  }
  if (msg && msg.length < 90 && !/\[object|\{|\bnull\b|\bundefined\b/i.test(msg)) {
    return msg;
  }
  return 'Atmospheric observations are temporarily unavailable. Please try again.';
}

function getCoordKey(lat, lon) {
  return `${Number(lat).toFixed(2)},${Number(lon).toFixed(2)}`;
}

function getWeatherFromCache(key, maxAge = WEATHER_CACHE_TTL_MS) {
  
  if (weatherCache.has(key)) {
    const entry = weatherCache.get(key);
    if (Date.now() - entry.timestamp < maxAge) {
      return entry;
    }
  }
  
  const pool = storage.get('northstar_weather_cache_pool', {});
  if (pool[key]) {
    const entry = pool[key];
    if (Date.now() - entry.timestamp < maxAge) {
      weatherCache.set(key, entry);
      return entry;
    }
  }
  return null;
}

function saveWeatherToCache(key, payload, place) {
  const entry = {
    payload,
    place,
    timestamp: Date.now()
  };
  weatherCache.set(key, entry);

  try {
    const pool = storage.get('northstar_weather_cache_pool', {});
    pool[key] = entry;
    const keys = Object.keys(pool);
    if (keys.length > 20) {
      keys.sort((a, b) => pool[a].timestamp - pool[b].timestamp);
      while (keys.length > 20) {
        delete pool[keys.shift()];
      }
    }
    storage.set('northstar_weather_cache_pool', pool);
  } catch {}
}

async function searchCities(query, signal = null) {
  const url = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(query)}&count=5&language=en&format=json`;
  try {
    const fetchOptions = signal ? { signal } : {};
    const response = await fetch(url, fetchOptions);
    if (!response.ok) return [];
    const data = await response.json();
    return (data.results || []).map((item) => ({
      name: item.name,
      admin1: item.admin1 || '',
      country: item.country || '',
      countryCode: item.country_code || '',
      latitude: item.latitude,
      longitude: item.longitude,
      timezone: item.timezone || 'auto'
    }));
  } catch (err) {
    return [];
  }
}

async function findCity(city, signal = null) {
  const results = await searchCities(city, signal);
  if (!results.length) {
    throw new Error(`We couldn't find “${city}”. Try another city name.`);
  }
  return results[0];
}

async function getForecast(place, { forceRefresh = false, signal = null } = {}) {
  const coordKey = getCoordKey(place.latitude, place.longitude);

  
  if (!forceRefresh) {
    const cachedEntry = getWeatherFromCache(coordKey);
    if (cachedEntry) {
      return {
        ...cachedEntry.payload,
        _isCached: true,
        _cachedTimestamp: cachedEntry.timestamp
      };
    }
  }

  
  if (inFlightRequests.has(coordKey)) {
    return inFlightRequests.get(coordKey);
  }

  const fetchPromise = (async () => {
    try {
      const params = new URLSearchParams({
        latitude: place.latitude,
        longitude: place.longitude,
        timezone: 'auto',
        forecast_days: '7',
        current: [
          'temperature_2m',
          'relative_humidity_2m',
          'apparent_temperature',
          'is_day',
          'weather_code',
          'wind_speed_10m',
          'wind_direction_10m',
          'wind_gusts_10m',
          'visibility',
          'pressure_msl',
          'dew_point_2m',
          'cloud_cover',
          'uv_index',
          'precipitation',
          'rain',
          'snowfall',
          'showers'
        ].join(','),
        hourly: [
          'temperature_2m',
          'apparent_temperature',
          'weather_code',
          'precipitation_probability',
          'precipitation',
          'rain',
          'snowfall',
          'showers',
          'wind_speed_10m',
          'wind_direction_10m',
          'cloud_cover',
          'visibility',
          'uv_index'
        ].join(','),
        daily: [
          'weather_code',
          'temperature_2m_max',
          'temperature_2m_min',
          'apparent_temperature_max',
          'precipitation_probability_max',
          'precipitation_sum',
          'rain_sum',
          'snowfall_sum',
          'wind_speed_10m_max',
          'wind_gusts_10m_max',
          'wind_direction_10m_dominant',
          'sunrise',
          'sunset',
          'uv_index_max'
        ].join(',')
      });

      const fetchOptions = signal ? { signal } : {};
      const forecastResponse = await fetch(`https://api.open-meteo.com/v1/forecast?${params}`, fetchOptions);

      if (!forecastResponse.ok) {
        throw new Error('Weather forecast service is temporarily unavailable.');
      }

      const forecastData = await forecastResponse.json();

      
      const existing = getWeatherFromCache(coordKey, 24 * 60 * 60 * 1000);
      const existingAir = existing?.payload?.airQuality || null;

      const payload = {
        forecast: forecastData,
        airQuality: existingAir,
        _isCached: false,
        _cachedTimestamp: Date.now()
      };

      saveWeatherToCache(coordKey, payload, place);
      return payload;
    } finally {
      inFlightRequests.delete(coordKey);
    }
  })();

  inFlightRequests.set(coordKey, fetchPromise);
  return fetchPromise;
}

async function loadAirQualityAsync(place, currentTime) {
  const airParams = new URLSearchParams({
    latitude: place.latitude,
    longitude: place.longitude,
    timezone: 'auto',
    hourly: 'us_aqi,pm2_5,pm10,ozone,nitrogen_dioxide,sulphur_dioxide,carbon_monoxide',
    forecast_days: '1'
  });

  try {
    const res = await fetch(`https://air-quality-api.open-meteo.com/v1/air-quality?${airParams}`);
    if (res.ok) {
      const airData = await res.json();
      
      if (
        currentPlace &&
        Math.abs(currentPlace.latitude - place.latitude) < 0.01 &&
        Math.abs(currentPlace.longitude - place.longitude) < 0.01
      ) {
        renderAirQuality(airData, currentTime);
        if (currentData) {
          currentData.airQuality = airData;
          const key = getCoordKey(place.latitude, place.longitude);
          saveWeatherToCache(key, currentData, place);
        }
      }
    }
  } catch {
    
  }
}

async function reverseGeocode(latitude, longitude) {
  const response = await fetch(
    `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`
  );
  if (!response.ok) {
    return {
      name: 'Your Location',
      region: '',
      latitude,
      longitude,
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone || 'UTC'
    };
  }
  const result = await response.json();
  return {
    name: result.city || result.locality || result.principalSubdivision || 'Your Location',
    region: result.countryName || result.principalSubdivision || '',
    latitude,
    longitude,
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone || 'UTC'
  };
}

function getFavorites() {
  return storage.get('northstar_favorites', []);
}

function isCurrentPlaceFavorite() {
  if (!currentPlace) return false;
  const favs = getFavorites();
  return favs.some(
    (f) => Math.abs(f.latitude - currentPlace.latitude) < 0.01 && Math.abs(f.longitude - currentPlace.longitude) < 0.01
  );
}

function updateFavoriteButton() {
  const isFav = isCurrentPlaceFavorite();
  elements.favButton.classList.toggle('is-favorite', isFav);
  elements.favButton.setAttribute('aria-pressed', isFav ? 'true' : 'false');
  elements.favButton.title = isFav ? 'Remove from favorites' : 'Save location to favorites';
}

function toggleFavorite() {
  if (!currentPlace) return;
  let favs = getFavorites();
  const idx = favs.findIndex(
    (f) => Math.abs(f.latitude - currentPlace.latitude) < 0.01 && Math.abs(f.longitude - currentPlace.longitude) < 0.01
  );

  if (idx >= 0) {
    favs.splice(idx, 1);
  } else {
    favs.push({
      name: currentPlace.name,
      region: currentPlace.region || '',
      latitude: currentPlace.latitude,
      longitude: currentPlace.longitude,
      timezone: currentPlace.timezone || 'auto'
    });
  }

  storage.set('northstar_favorites', favs);
  updateFavoriteButton();
  renderFavoritesTray();
}

async function renderFavoritesTray() {
  const favs = getFavorites();
  if (!favs.length) {
    elements.favoritesSection.hidden = true;
    return;
  }

  elements.favoritesSection.hidden = false;
  elements.favoritesCount.textContent = `${favs.length} saved location${favs.length === 1 ? '' : 's'}`;

  
  elements.favoritesGrid.innerHTML = favs
    .map((fav, index) => {
      const safeName = escapeHtml(fav.name);
      const safeRegion = escapeHtml(fav.region);
      return `
      <article class="fav-snapshot-card" data-index="${index}" role="listitem">
        <div class="fav-card-top">
          <div>
            <div class="fav-card-city">${safeName}</div>
            <div class="fav-card-region">${safeRegion}</div>
          </div>
          <button type="button" class="fav-remove-btn" data-remove="${index}" title="Remove from favorites">&times;</button>
        </div>
        <div class="fav-card-metrics">
          <span class="fav-card-temp" id="favTemp_${index}">--</span>
          <span class="fav-card-range" id="favRange_${index}">-- / --</span>
        </div>
        <div class="fav-card-footer">
          <span id="favSummary_${index}">Loading atmospheric snapshot...</span>
          <span id="favRain_${index}">--% rain</span>
        </div>
      </article>
    `;
    })
    .join('');

  
  favs.forEach(async (fav, index) => {
    try {
      const data = await getForecast(fav);
      const cur = data.forecast.current;
      const daily = data.forecast.daily;
      const [desc] = getWeatherLabel(cur.weather_code);

      const tempEl = document.querySelector(`#favTemp_${index}`);
      const rangeEl = document.querySelector(`#favRange_${index}`);
      const summaryEl = document.querySelector(`#favSummary_${index}`);
      const rainEl = document.querySelector(`#favRain_${index}`);

      if (tempEl) tempEl.textContent = `${convertTemperature(cur.temperature_2m)}${temperatureSuffix()}`;
      if (rangeEl)
        rangeEl.textContent = `${convertTemperature(daily.temperature_2m_max?.[0])}° / ${convertTemperature(
          daily.temperature_2m_min?.[0]
        )}°`;
      if (summaryEl) summaryEl.textContent = desc;
      if (rainEl) rainEl.textContent = `${safeNumber(daily.precipitation_probability_max?.[0])}% rain`;
    } catch {
      const summaryEl = document.querySelector(`#favSummary_${index}`);
      if (summaryEl) summaryEl.textContent = 'Weather snapshot unavailable';
    }
  });
}

function addToRecentSearches(place) {
  if (!place || !place.name) return;
  let recents = storage.get('northstar_recent_searches', []);
  
  recents = recents.filter(
    (r) => !(r.name.toLowerCase() === place.name.toLowerCase() && r.region === place.region)
  );
  recents.unshift({
    name: place.name,
    region: place.region || '',
    latitude: place.latitude,
    longitude: place.longitude,
    timezone: place.timezone || 'auto'
  });
  recents = recents.slice(0, 6); 
  storage.set('northstar_recent_searches', recents);
  renderRecentSearches();
}

function renderRecentSearches() {
  const recents = storage.get('northstar_recent_searches', []);
  if (!recents.length) {
    elements.recentContainer.hidden = true;
    return;
  }
  elements.recentContainer.hidden = false;
  elements.recentPills.innerHTML = recents
    .map(
      (r, i) => `
      <button type="button" class="recent-pill-btn" data-recent-index="${i}">
        ${escapeHtml(r.name)}
      </button>
    `
    )
    .join('');
}

function evaluateWeatherRisks(current, daily, hourly) {
  const alerts = [];
  const curTemp = safeNumber(current.temperature_2m);
  const uv = safeNumber(current.uv_index);
  const gust = safeNumber(current.wind_gusts_10m);
  const wind = safeNumber(current.wind_speed_10m);
  const precipProb = safeNumber(daily.precipitation_probability_max?.[0]);

  
  if (precipProb >= 70 || safeNumber(daily.precipitation_sum?.[0]) >= 15) {
    
    let peakHours = [];
    if (hourly && hourly.time) {
      hourly.time.slice(0, 24).forEach((time, i) => {
        if (safeNumber(hourly.precipitation_probability?.[i]) >= 60) {
          peakHours.push(formatClock(time));
        }
      });
    }
    const windowText = peakHours.length
      ? `Highest concentration expected around ${peakHours[0]}${peakHours.length > 1 ? '–' + peakHours[peakHours.length - 1] : ''}.`
      : 'Expect sustained rainfall.';

    alerts.push({
      badge: 'Advisory',
      title: 'Heavy Precipitation Risk',
      desc: `High probability of significant rainfall (${precipProb}% chance, ${formatAmount(
        daily.precipitation_sum?.[0]
      )} mm expected). ${windowText} Plan for reduced roadway traction.`
    });
  }

  
  if (uv >= 8 || safeNumber(daily.uv_index_max?.[0]) >= 8) {
    alerts.push({
      badge: 'Alert',
      title: 'Extreme UV Index',
      desc: `UV radiation is forecast to peak at ${Math.max(
        uv,
        safeNumber(daily.uv_index_max?.[0])
      ).toFixed(1)} around midday. Direct sun exposure without protective measures can cause skin burns in under 15 minutes.`
    });
  }

  
  if (gust >= 50 || wind >= 38) {
    alerts.push({
      badge: 'Advisory',
      title: 'Strong Wind & Gust Hazard',
      desc: `Sustained wind of ${Math.round(wind)} km/h with peak gusts reaching ${Math.round(
        gust
      )} km/h. Secure lightweight outdoor fixtures.`
    });
  }

  
  if (curTemp >= 38) {
    alerts.push({
      badge: 'Alert',
      title: 'Excessive Heat Advisory',
      desc: `Dangerous temperatures reaching ${Math.round(
        curTemp
      )}°C. Stay hydrated and avoid strenuous outdoor exercise during peak heat hours.`
    });
  } else if (curTemp <= 0) {
    alerts.push({
      badge: 'Advisory',
      title: 'Sub-Zero Freezing Conditions',
      desc: `Sub-freezing temperatures (${Math.round(
        curTemp
      )}°C). Risk of frost on elevated surfaces and black ice formation.`
    });
  }

  return alerts;
}

function renderWeatherAlerts(alerts) {
  if (!alerts || !alerts.length) {
    elements.weatherAlertsContainer.hidden = true;
    elements.weatherAlertsContainer.innerHTML = '';
    return;
  }

  elements.weatherAlertsContainer.hidden = false;
  elements.weatherAlertsContainer.innerHTML = alerts
    .map(
      (alert) => `
      <article class="weather-alert-card" role="alert">
        <div class="alert-header">
          <span class="alert-badge">${escapeHtml(alert.badge)}</span>
          <strong class="alert-title">${escapeHtml(alert.title)}</strong>
        </div>
        <p class="alert-desc">${escapeHtml(alert.desc)}</p>
        <span class="alert-disclaimer">Forecast-derived advisory based on meteorological data. Not an official government emergency broadcast.</span>
      </article>
    `
    )
    .join('');
}

function calculateBestTimes(hourly) {
  if (!hourly || !hourly.time || !hourly.time.length) return [];

  const hours = hourly.time.slice(0, 24);
  const temps = hourly.temperature_2m.slice(0, 24).map((v) => safeNumber(v));
  const rains = hourly.precipitation_probability.slice(0, 24).map((v) => safeNumber(v));
  const winds = hourly.wind_speed_10m.slice(0, 24).map((v) => safeNumber(v));
  const uvs = (hourly.uv_index || []).slice(0, 24).map((v) => safeNumber(v));

  
  let bestScore = -Infinity;
  let bestIdx = 0;

  hours.forEach((time, i) => {
    const hourNum = Number(String(time).slice(11, 13));
    if (hourNum >= 7 && hourNum <= 19) {
      
      const rainPenalty = rains[i] * 1.5;
      const windPenalty = winds[i] * 0.8;
      const tempDist = Math.abs(temps[i] - 21); 
      const uvPenalty = uvs[i] > 6 ? (uvs[i] - 6) * 10 : 0;
      const score = 100 - rainPenalty - windPenalty - tempDist * 2 - uvPenalty;
      if (score > bestScore) {
        bestScore = score;
        bestIdx = i;
      }
    }
  });

  const outdoorStart = formatClock(hours[bestIdx]);
  const outdoorEnd = formatClock(hours[Math.min(hours.length - 1, bestIdx + 2)]);

  
  let minRain = Infinity;
  let minRainIdx = 0;
  hours.forEach((_, i) => {
    if (rains[i] < minRain) {
      minRain = rains[i];
      minRainIdx = i;
    }
  });

  
  const maxTemp = Math.max(...temps);
  const maxTempIdx = temps.indexOf(maxTemp);
  const minTemp = Math.min(...temps);
  const minTempIdx = temps.indexOf(minTemp);

  return [
    {
      label: 'Optimal outdoor window',
      value: `${outdoorStart} – ${outdoorEnd}`,
      note: `${convertTemperature(temps[bestIdx])}${temperatureSuffix()}, ${rains[bestIdx]}% rain chance`
    },
    {
      label: 'Driest period today',
      value: `${formatClock(hours[minRainIdx])} (${minRain}% chance)`,
      note: 'Lowest atmospheric moisture probability'
    },
    {
      label: 'Peak daytime warmth',
      value: `${formatClock(hours[maxTempIdx])} · ${convertTemperature(maxTemp)}${temperatureSuffix()}`,
      note: `Freshest air: ${formatClock(hours[minTempIdx])} (${convertTemperature(minTemp)}${temperatureSuffix()})`
    }
  ];
}

function renderBestTimes(windows) {
  if (!windows || !windows.length) {
    elements.bestTimeSection.hidden = true;
    return;
  }
  elements.bestTimeSection.hidden = false;
  elements.bestTimeGrid.innerHTML = windows
    .map(
      (w) => `
      <div class="best-time-card">
        <div>
          <div class="best-time-label">${escapeHtml(w.label)}</div>
          <div style="font-size: 11px; color: var(--ink-muted);">${escapeHtml(w.note)}</div>
        </div>
        <div class="best-time-value">${escapeHtml(w.value)}</div>
      </div>
    `
    )
    .join('');
}

function requestMapUpdate(latitude, longitude, name, temp, condition) {
  pendingMapData = { latitude, longitude, name, temp, condition };
  if (elements.mapCoordDisplay) {
    elements.mapCoordDisplay.textContent = `${Math.abs(latitude).toFixed(2)}° ${latitude >= 0 ? 'N' : 'S'}, ${Math.abs(
      longitude
    ).toFixed(2)}° ${longitude >= 0 ? 'E' : 'W'}`;
  }

  if (leafletMap) {
    initOrUpdateMap();
  } else {
    setupMapObserver();
  }
}

function setupMapObserver() {
  if (mapObserver || !elements.mapSection) return;
  if ('IntersectionObserver' in window) {
    mapObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            initOrUpdateMap();
            if (mapObserver) {
              mapObserver.disconnect();
              mapObserver = null;
            }
          }
        });
      },
      { rootMargin: '250px' }
    );
    mapObserver.observe(elements.mapSection);
  } else {
    initOrUpdateMap();
  }
}

function initOrUpdateMap() {
  if (!pendingMapData) return;
  const { latitude, longitude, name, temp, condition } = pendingMapData;
  initMap(latitude, longitude, name, temp, condition);
}

function initMap(latitude, longitude, name, temp, condition) {
  if (typeof L === 'undefined') {
    if (elements.mapSection) elements.mapSection.hidden = true;
    return;
  }

  if (elements.mapSection) elements.mapSection.hidden = false;
  if (elements.mapCoordDisplay) {
    elements.mapCoordDisplay.textContent = `${Math.abs(latitude).toFixed(2)}° ${latitude >= 0 ? 'N' : 'S'}, ${Math.abs(
      longitude
    ).toFixed(2)}° ${longitude >= 0 ? 'E' : 'W'}`;
  }

  const customIcon = L.divIcon({
    className: 'northstar-map-marker',
    html: '<div class="northstar-marker-pin"></div>',
    iconSize: [18, 18],
    iconAnchor: [9, 9]
  });

  if (!leafletMap) {
    leafletMap = L.map('weatherMap', {
      center: [latitude, longitude],
      zoom: 11,
      scrollWheelZoom: false,
      zoomControl: true
    });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      maxZoom: 18
    }).addTo(leafletMap);

    mapMarker = L.marker([latitude, longitude], { icon: customIcon }).addTo(leafletMap);
    mapMarker.bindPopup(`<b>${escapeHtml(name)}</b><br>${escapeHtml(temp)} · ${escapeHtml(condition)}`).openPopup();

    
    leafletMap.on('click', async (e) => {
      const { lat, lng } = e.latlng;
      elements.status.className = 'form-status is-loading';
      elements.status.textContent = `Loading weather for clicked coordinate (${lat.toFixed(2)}, ${lng.toFixed(2)})...`;
      try {
        const place = await reverseGeocode(lat, lng);
        await loadWeatherWithPlace(place);
      } catch (error) {
        elements.status.className = 'form-status is-error';
        elements.status.textContent = getErrorMessage(error);
      }
    });

    setTimeout(() => {
      if (leafletMap) leafletMap.invalidateSize();
    }, 120);
  } else {
    leafletMap.setView([latitude, longitude], 11);
    if (mapMarker) {
      mapMarker.setLatLng([latitude, longitude]);
      mapMarker.setPopupContent(`<b>${escapeHtml(name)}</b><br>${escapeHtml(temp)} · ${escapeHtml(condition)}`).openPopup();
    }
    setTimeout(() => {
      if (leafletMap) leafletMap.invalidateSize();
    }, 120);
  }
}

function updateComparisonSlot1(place, data) {
  comparisonSlots.slot1 = { place, data };
  elements.compareSlot1Name.textContent = place.name;
  elements.compareSlot1Region.textContent = place.region || '';
  elements.thCity1.textContent = place.name;
  renderComparisonTable();
}

async function setComparisonSlot(slotNum, city) {
  const isSlot2 = slotNum === 2;
  const inputEl = isSlot2 ? elements.compareSlot2Input : elements.compareSlot3Input;
  const infoEl = isSlot2 ? elements.compareSlot2Info : elements.compareSlot3Info;
  const nameEl = isSlot2 ? elements.compareSlot2Name : elements.compareSlot3Name;
  const regionEl = isSlot2 ? elements.compareSlot2Region : elements.compareSlot3Region;
  const clearEl = isSlot2 ? elements.compareSlot2Clear : elements.compareSlot3Clear;
  const searchWrapEl = isSlot2 ? elements.compareSlot2SearchWrap : elements.compareSlot3SearchWrap;
  const thEl = isSlot2 ? elements.thCity2 : elements.thCity3;

  try {
    const data = await getForecast(city);
    const slotData = { place: city, data };
    if (isSlot2) comparisonSlots.slot2 = slotData;
    else comparisonSlots.slot3 = slotData;

    nameEl.textContent = city.name;
    regionEl.textContent = city.region || '';
    thEl.textContent = city.name;

    searchWrapEl.hidden = true;
    infoEl.hidden = false;
    clearEl.hidden = false;

    renderComparisonTable();
  } catch {
    elements.status.className = 'form-status is-error';
    elements.status.textContent = `Could not load weather for comparison city “${city.name}”.`;
  }
}

function clearComparisonSlot(slotNum) {
  const isSlot2 = slotNum === 2;
  if (isSlot2) comparisonSlots.slot2 = null;
  else comparisonSlots.slot3 = null;

  const infoEl = isSlot2 ? elements.compareSlot2Info : elements.compareSlot3Info;
  const clearEl = isSlot2 ? elements.compareSlot2Clear : elements.compareSlot3Clear;
  const searchWrapEl = isSlot2 ? elements.compareSlot2SearchWrap : elements.compareSlot3SearchWrap;
  const inputEl = isSlot2 ? elements.compareSlot2Input : elements.compareSlot3Input;
  const thEl = isSlot2 ? elements.thCity2 : elements.thCity3;

  infoEl.hidden = true;
  clearEl.hidden = true;
  searchWrapEl.hidden = false;
  inputEl.value = '';
  thEl.textContent = `City ${slotNum}`;

  renderComparisonTable();
}

function setupSlotSearch(inputEl, suggestionsEl, slotNum) {
  let timer = null;
  inputEl.addEventListener('input', (e) => {
    const query = e.target.value.trim();
    clearTimeout(timer);
    if (query.length < 2) {
      suggestionsEl.hidden = true;
      suggestionsEl.innerHTML = '';
      return;
    }
    timer = setTimeout(async () => {
      const results = await searchCities(query);
      if (!results.length) {
        suggestionsEl.hidden = true;
        return;
      }
      suggestionsEl.hidden = false;
      suggestionsEl.innerHTML = results
        .map(
          (r, idx) => `
        <div class="slot-suggestion-item" data-slot-idx="${idx}">
          <strong>${escapeHtml(r.name)}</strong> <small style="color:var(--ink-muted);">${escapeHtml([r.admin1, r.country]
            .filter(Boolean)
            .join(', '))}</small>
        </div>
      `
        )
        .join('');

      suggestionsEl.querySelectorAll('.slot-suggestion-item').forEach((item) => {
        item.addEventListener('click', () => {
          const idx = Number(item.dataset.slotIdx);
          suggestionsEl.hidden = true;
          const chosen = results[idx];
          chosen.region = [chosen.admin1, chosen.country].filter(Boolean).join(', ');
          setComparisonSlot(slotNum, chosen);
        });
      });
    }, 280);
  });
}

function renderComparisonTable() {
  const s1 = comparisonSlots.slot1;
  const s2 = comparisonSlots.slot2;
  const s3 = comparisonSlots.slot3;

  if (!s2 && !s3) {
    elements.compareEmptyPrompt.hidden = false;
    elements.compareTable.hidden = true;
    return;
  }

  elements.compareEmptyPrompt.hidden = true;
  elements.compareTable.hidden = false;

  const getMetrics = (slot) => {
    if (!slot) return null;
    const cur = slot.data.forecast.current;
    const daily = slot.data.forecast.daily;
    const [desc] = getWeatherLabel(cur.weather_code);
    const aqi = slot.data.airQuality?.hourly?.us_aqi?.[0] || '--';

    return {
      temp: `${convertTemperature(cur.temperature_2m)}${temperatureSuffix()}`,
      feels: `${convertTemperature(cur.apparent_temperature)}${temperatureSuffix()}`,
      condition: desc,
      range: `${convertTemperature(daily.temperature_2m_max?.[0])}° / ${convertTemperature(
        daily.temperature_2m_min?.[0]
      )}°`,
      rain: `${safeNumber(daily.precipitation_probability_max?.[0])}%`,
      wind: `${convertWind(cur.wind_speed_10m)} ${windSuffix()} (${getWindDirection(cur.wind_direction_10m)})`,
      humidity: `${cur.relative_humidity_2m}%`,
      uv: `${hasNumber(cur.uv_index) ? Number(cur.uv_index).toFixed(1) : '--'}`,
      aqi: hasNumber(aqi) ? Math.round(aqi) : '--'
    };
  };

  const m1 = getMetrics(s1);
  const m2 = getMetrics(s2);
  const m3 = getMetrics(s3);

  const rows = [
    ['Temperature', m1?.temp, m2?.temp || '--', m3?.temp || '--'],
    ['Feels Like', m1?.feels, m2?.feels || '--', m3?.feels || '--'],
    ['Condition', m1?.condition, m2?.condition || '--', m3?.condition || '--'],
    ['Day High / Low', m1?.range, m2?.range || '--', m3?.range || '--'],
    ['Rain Probability', m1?.rain, m2?.rain || '--', m3?.rain || '--'],
    ['Wind', m1?.wind, m2?.wind || '--', m3?.wind || '--'],
    ['Humidity', m1?.humidity, m2?.humidity || '--', m3?.humidity || '--'],
    ['UV Index', m1?.uv, m2?.uv || '--', m3?.uv || '--'],
    ['Air Quality (AQI)', m1?.aqi, m2?.aqi || '--', m3?.aqi || '--']
  ];

  elements.compareTableBody.innerHTML = rows
    .map(
      ([metric, v1, v2, v3]) => `
      <tr>
        <td><strong>${escapeHtml(metric)}</strong></td>
        <td><strong>${escapeHtml(v1)}</strong></td>
        <td>${escapeHtml(v2)}</td>
        <td>${escapeHtml(v3)}</td>
      </tr>
    `
    )
    .join('');
}

function render(place, payload, options = false) {
  const isCached = typeof options === 'boolean' ? options : Boolean(options.isCached);
  const cachedTimestamp = typeof options === 'object' && options.cachedTimestamp ? options.cachedTimestamp : Date.now();

  const data = payload.forecast;
  const current = data.current || {};
  const daily = data.daily || {};
  const hourly = data.hourly || {};

  const [summary, type] = getWeatherLabel(current.weather_code);
  const isDay = current.is_day === 1;
  const todayHigh = safeNumber(daily.temperature_2m_max?.[0]);
  const todayLow = safeNumber(daily.temperature_2m_min?.[0]);
  const temp = hasNumber(current.temperature_2m) ? convertTemperature(current.temperature_2m) : null;
  const apparent = hasNumber(current.apparent_temperature) ? convertTemperature(current.apparent_temperature) : null;
  const humidity = hasNumber(current.relative_humidity_2m) ? Math.round(current.relative_humidity_2m) : null;
  const visibility = hasNumber(current.visibility) ? Number(current.visibility) / 1000 : null;
  const uv = hasNumber(current.uv_index) ? Number(current.uv_index) : null;
  const uvMax = hasNumber(daily.uv_index_max?.[0]) ? Number(daily.uv_index_max[0]) : null;
  const [uvLabel, uvText] = getUvCategory(uv);
  const sunrise = daily.sunrise?.[0];
  const sunset = daily.sunset?.[0];
  const precipitationProbability = hasNumber(daily.precipitation_probability_max?.[0])
    ? Number(daily.precipitation_probability_max[0])
    : null;

  
  elements.location.textContent = place.name || 'Your location';
  elements.region.textContent = place.region || '';
  elements.localTimeDisplay.textContent = `Local time: ${formatLocalTime(place.timezone || data.timezone)}`;
  elements.summary.textContent = summary;
  elements.temperature.textContent = temp ?? '--';
  elements.temperatureUnit.textContent = temperatureUnit === 'fahrenheit' ? 'F' : 'C';

  if (temp !== null && apparent !== null) {
    const diff = apparent - temp;
    const diffText = diff === 0 ? 'as expected' : `${Math.abs(diff)}° ${diff > 0 ? 'warmer' : 'cooler'}`;
    elements.feelsLike.textContent = `Feels like ${apparent}${temperatureSuffix()} · ${diffText}`;
  } else {
    elements.feelsLike.textContent = 'Feels like --';
  }

  elements.daylight.textContent = `Daylight ${formatDuration(sunrise, sunset)}`;
  elements.coordinates.textContent = `${Math.abs(place.latitude).toFixed(2)} ${
    place.latitude >= 0 ? 'N' : 'S'
  } / ${Math.abs(place.longitude).toFixed(2)} ${place.longitude >= 0 ? 'E' : 'W'}`;

  elements.card.dataset.weather = type.toLowerCase();
  elements.card.dataset.isDay = isDay ? 'true' : 'false';

  
  elements.windSpeed.textContent = convertWind(current.wind_speed_10m);
  elements.windSpeedUnit.textContent = windSuffix();
  const gusts = Number.isFinite(Number(current.wind_gusts_10m))
    ? ` · Gusts ${convertWind(current.wind_gusts_10m)} ${windSuffix()}`
    : '';
  elements.windDirection.textContent = hasNumber(current.wind_direction_10m)
    ? `${getWindDirection(current.wind_direction_10m)} · ${Math.round(current.wind_direction_10m)}°${gusts}`
    : 'Direction unavailable';
  elements.windArrow.style.transform = hasNumber(current.wind_direction_10m)
    ? `rotate(${current.wind_direction_10m}deg)`
    : '';

  elements.humidity.textContent = humidity !== null ? humidity : '--';
  elements.humidityBar.style.width = `${Math.max(0, Math.min(100, humidity || 0))}%`;
  elements.humidityNote.textContent =
    humidity !== null
      ? humidity < 35
        ? 'Dry air'
        : humidity <= 65
        ? 'Comfortable air'
        : 'Humid moisture'
      : 'Humidity unavailable';

  elements.highTemp.textContent = convertTemperature(todayHigh);
  elements.highTempUnit.textContent = `${temperatureSuffix()} high`;
  elements.lowTemp.textContent = `Low ${convertTemperature(todayLow)}${temperatureSuffix()}`;
  const maxRange = Math.max(1, todayHigh - todayLow);
  const rangePos = Math.max(8, Math.min(92, ((safeNumber(current.temperature_2m) - todayLow) / maxRange) * 100));
  elements.rangeTrack.style.width = `${rangePos}%`;
  elements.rangeNote.textContent = type === 'Clear' ? 'Bright afternoon' : summary;

  elements.visibility.textContent = visibility !== null ? formatAmount(visibility) : '--';
  const visCard = elements.visibility.closest('.metric-card');
  if (visCard) {
    const statusSpan = visCard.querySelector('.visibility-status');
    if (statusSpan) statusSpan.textContent = getVisibilityNote(visibility);
  }

  elements.pressure.textContent = formatMetric(current.pressure_msl);
  elements.dewPoint.textContent = hasNumber(current.dew_point_2m) ? convertTemperature(current.dew_point_2m) : '--';
  elements.dewPointUnit.textContent = temperatureSuffix();
  elements.dewPointNote.textContent = getDewPointNote(safeNumber(current.dew_point_2m));

  elements.cloudCover.textContent = formatMetric(current.cloud_cover);
  elements.cloudCoverBar.style.width = `${Math.max(0, Math.min(100, safeNumber(current.cloud_cover)))}%`;
  elements.cloudCoverNote.textContent =
    safeNumber(current.cloud_cover) < 20
      ? 'Clear skies'
      : safeNumber(current.cloud_cover) < 70
      ? 'Scattered clouds'
      : 'Overcast sky';

  elements.uvIndex.textContent = uv !== null ? uv.toFixed(1) : '--';
  elements.uvMax.textContent = uvMax !== null ? uvMax.toFixed(1) : '--';
  elements.uvScaleFill.style.left = uv !== null ? `${Math.min(98, (uv / 11) * 100)}%` : '0%';
  elements.uvNote.textContent = uvText;

  elements.dateStamp.textContent = daily.time?.[0] ? formatDate(daily.time[0], place.timezone || data.timezone) : '--';

  if (isCached) {
    const elapsedMinutes = Math.max(1, Math.round((Date.now() - cachedTimestamp) / 60000));
    const timeStr = elapsedMinutes < 60 ? `${elapsedMinutes}m ago` : formatClock(new Date(cachedTimestamp));
    elements.updatedAt.textContent = `Updated ${timeStr} (cached)`;
  } else {
    elements.updatedAt.textContent = `Updated ${formatClock(new Date())}`;
  }

  
  const { start } = renderHourly(hourly, current.time || new Date().toISOString());
  renderTemperatureChart(hourly, start);

  
  const rainPhrase =
    precipitationProbability === null
      ? 'Precipitation unavailable'
      : precipitationProbability >= 60
      ? 'Rain likely today'
      : precipitationProbability >= 30
      ? 'Chance of showers'
      : 'Mostly dry today';

  elements.rainCallout.textContent = rainPhrase;
  elements.precipProbability.textContent = precipitationProbability !== null ? precipitationProbability : '--';
  elements.precipAmount.textContent = formatAmount(daily.precipitation_sum?.[0]);
  elements.precipUnit.textContent = `mm expected · ${formatAmount(daily.rain_sum?.[0])} mm rain`;

  if (hourly.time && hourly.time.length) {
    elements.precipBars.innerHTML = hourly.time
      .slice(start, start + 12)
      .map((time, idx) => {
        const prob = safeNumber(hourly.precipitation_probability?.[start + idx]);
        return `
          <div class="precip-bar-col" title="${formatClock(time)}: ${prob}% probability">
            <div class="precip-bar-fill" style="height: ${Math.max(6, prob)}%;"></div>
            <span class="precip-bar-time">${formatClock(time).replace(':00', '')}</span>
          </div>
        `;
      })
      .join('');
  }

  
  elements.sunrise.textContent = formatClock(sunrise, place.timezone || data.timezone);
  elements.sunset.textContent = formatClock(sunset, place.timezone || data.timezone);
  elements.daylightDuration.textContent = formatDuration(sunrise, sunset);
  elements.daylightStatus.textContent = isDay ? 'Daylight now' : 'Nightfall now';
  renderSolarArc(sunrise, sunset, isDay);

  const moon = getMoonData(new Date());
  elements.moonPhase.textContent = moon.name;
  elements.moonIllumination.textContent = `${moon.illumination}%`;
  elements.nextMoonPhase.textContent = moon.next;

  
  if (payload.airQuality) {
    renderAirQuality(payload.airQuality, current.time);
  } else {
    loadAirQualityAsync(place, current.time);
  }

  
  render7DayForecast(daily);

  
  synthesizeWeatherIntelligence({
    current,
    daily,
    summary,
    todayHigh,
    todayLow,
    precipProb: precipitationProbability,
    uv,
    apparent,
    temp
  });
  renderBestTimes(calculateBestTimes(hourly));

  
  const risks = evaluateWeatherRisks(current, daily, hourly);
  renderWeatherAlerts(risks);

  
  requestMapUpdate(place.latitude, place.longitude, place.name, `${temp}${temperatureSuffix()}`, summary);
  updateComparisonSlot1(place, payload);
  updateFavoriteButton();

  currentPlace = place;
  currentData = payload;

  
  if (!isCached) {
    const newUrl = `?lat=${place.latitude.toFixed(4)}&lon=${place.longitude.toFixed(4)}&name=${encodeURIComponent(
      place.name
    )}`;
    window.history.replaceState(null, '', newUrl);
  }
}

function renderHourly(hourly, currentTime) {
  if (!hourly || !hourly.time || !hourly.time.length) {
    elements.hourlyList.innerHTML = '<div class="air-quality-empty">Hourly forecast unavailable.</div>';
    elements.hourlyNote.textContent = 'No hourly data';
    return { start: 0, hours: [] };
  }

  const start = Math.max(0, getCurrentHourIndex(hourly.time, currentTime));
  const hours = hourly.time.slice(start, start + 24);

  elements.hourlyList.innerHTML = hours
    .map((time, index) => {
      const srcIdx = start + index;
      const [desc, type] = getWeatherLabel(hourly.weather_code[srcIdx]);
      const precip = safeNumber(hourly.precipitation_probability[srcIdx]);
      const wind = convertWind(hourly.wind_speed_10m[srcIdx]);
      const temp = convertTemperature(hourly.temperature_2m[srcIdx]);
      const feels = convertTemperature(hourly.apparent_temperature[srcIdx]);
      const isCurrent = index === 0;

      const hourNum = Number(String(time).slice(11, 13));
      const isDayHour = hourNum >= 6 && hourNum < 20;

      return `
        <article class="hour-item ${isCurrent ? 'is-current' : ''}">
          <div class="hour-time">${isCurrent ? 'Now' : formatClock(time)}</div>
          <div class="hour-icon" aria-hidden="true">${getWeatherIconSvg(type, isDayHour)}</div>
          <strong>${temp}${temperatureSuffix()}</strong>
          <span class="hour-feels">Feels ${feels}${temperatureSuffix()}</span>
          <span class="hour-condition">${desc}</span>
          <span class="hour-rain">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"></path></svg>
            ${precip}%
          </span>
          <span class="hour-meta">${formatAmount(hourly.precipitation[srcIdx])} mm · ${wind} ${windSuffix()}</span>
        </article>
      `;
    })
    .join('');

  elements.hourlyNote.textContent = `${hours.length} hours · scroll for more`;
  return { start, hours };
}

function renderTemperatureChart(hourly, start) {
  if (!hourly || !hourly.time || !hourly.time.length) {
    elements.temperatureChart.innerHTML = '<div class="air-quality-empty">Temperature trend unavailable.</div>';
    return;
  }

  const times = hourly.time.slice(start, start + 12);
  const actualTemps = hourly.temperature_2m.slice(start, start + 12).map((v) => safeNumber(v));
  const feelsTemps = hourly.apparent_temperature.slice(start, start + 12).map((v) => safeNumber(v));

  const all = actualTemps.concat(feelsTemps);
  const minTemp = Math.min(...all) - 2;
  const maxTemp = Math.max(...all) + 2;
  const range = Math.max(1, maxTemp - minTemp);

  const getCoord = (val, idx, total) => {
    const x = Math.round((idx / Math.max(1, total - 1)) * 100);
    const y = Math.round(100 - ((val - minTemp) / range) * 85 - 8);
    return { x, y };
  };

  const actualPoints = actualTemps.map((v, i) => getCoord(v, i, actualTemps.length));
  const feelsPoints = feelsTemps.map((v, i) => getCoord(v, i, feelsTemps.length));

  const actualPolyline = actualPoints.map((p) => `${p.x},${p.y}`).join(' ');
  const feelsPolyline = feelsPoints.map((p) => `${p.x},${p.y}`).join(' ');
  const areaPolygon = `0,100 ${actualPolyline} 100,100`;

  elements.temperatureChart.innerHTML = `
    <svg viewBox="0 0 100 100" preserveAspectRatio="none" role="img" aria-label="Temperature trendline">
      <defs>
        <linearGradient id="tempGradient" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#eb7c3b" stop-opacity="0.35"/>
          <stop offset="100%" stop-color="#eb7c3b" stop-opacity="0.0"/>
        </linearGradient>
      </defs>
      <line class="chart-grid" x1="0" y1="20" x2="100" y2="20"></line>
      <line class="chart-grid" x1="0" y1="50" x2="100" y2="50"></line>
      <line class="chart-grid" x1="0" y1="80" x2="100" y2="80"></line>
      <polygon class="chart-area" points="${areaPolygon}"></polygon>
      <polyline class="chart-line chart-feels" points="${feelsPolyline}"></polyline>
      <polyline class="chart-line" points="${actualPolyline}"></polyline>
      ${actualPoints
        .map(
          (p, i) => `
        <circle class="chart-point" cx="${p.x}" cy="${p.y}" data-idx="${i}" tabindex="0" aria-label="${formatClock(
            times[i]
          )}: ${convertTemperature(actualTemps[i])}${temperatureSuffix()}"></circle>
      `
        )
        .join('')}
    </svg>
    <div class="chart-labels">
      ${times
        .filter((_, i) => i % 3 === 0 || i === times.length - 1)
        .map((t) => `<span>${formatClock(t)}</span>`)
        .join('')}
    </div>
  `;

  elements.temperatureChart.querySelectorAll('.chart-point').forEach((point) => {
    point.addEventListener('mouseenter', () => {
      const idx = Number(point.dataset.idx);
      const time = formatClock(times[idx]);
      const act = convertTemperature(actualTemps[idx]);
      const app = convertTemperature(feelsTemps[idx]);
      elements.chartTooltip.hidden = false;
      elements.chartTooltip.textContent = `${time} · ${act}${temperatureSuffix()} (Feels ${app}${temperatureSuffix()})`;
      const rect = point.getBoundingClientRect();
      const parentRect = elements.temperatureChart.getBoundingClientRect();
      elements.chartTooltip.style.left = `${rect.left - parentRect.left + rect.width / 2}px`;
      elements.chartTooltip.style.top = `${rect.top - parentRect.top - 8}px`;
    });

    point.addEventListener('mouseleave', () => {
      elements.chartTooltip.hidden = true;
    });
  });
}

function renderSolarArc(sunrise, sunset, isDay) {
  if (!sunrise || !sunset) {
    elements.solarArcContainer.innerHTML = '';
    return;
  }
  const now = new Date();
  const srDate = new Date(sunrise);
  const ssDate = new Date(sunset);
  const totalDaylightMs = ssDate - srDate;
  const currentMs = now - srDate;

  let progress = 0;
  if (now >= srDate && now <= ssDate) {
    progress = Math.max(0, Math.min(1, currentMs / totalDaylightMs));
  } else if (now > ssDate) {
    progress = 1;
  }

  const px = Math.round(progress * 100);
  const py = Math.round(42 - 32 * Math.sin(progress * Math.PI));

  elements.solarArcContainer.innerHTML = `
    <svg class="solar-arc-svg" viewBox="0 0 100 48" preserveAspectRatio="none">
      <path d="M 5,42 Q 50,-5 95,42" fill="none" stroke="rgba(15, 39, 48, 0.15)" stroke-width="1.5" stroke-dasharray="2 3"></path>
      <line x1="0" y1="42" x2="100" y2="42" stroke="rgba(15, 39, 48, 0.12)" stroke-width="1"></line>
      <circle cx="${px}" cy="${py}" r="4" fill="${isDay ? '#eb7c3b' : '#6f8890'}" stroke="#ffffff" stroke-width="1.5"></circle>
    </svg>
  `;
}

function renderAirQuality(airQuality, currentTime) {
  const current = airQuality?.hourly;
  if (!current || !current.time || !current.time.length) {
    elements.aqCategory.textContent = 'Unavailable';
    elements.aqCategory.className = 'aq-badge';
    elements.airQualityGrid.innerHTML =
      '<div class="air-quality-empty">Air quality sensor data is currently unavailable for this geographic coordinate.</div>';
    return;
  }

  const idx = Math.max(0, getCurrentHourIndex(current.time, currentTime));
  const aqi = safeNumber(current.us_aqi?.[idx], NaN);

  let category = 'Unavailable';
  let badgeClass = '';

  if (Number.isFinite(aqi)) {
    if (aqi <= 50) {
      category = 'Good';
    } else if (aqi <= 100) {
      category = 'Moderate';
      badgeClass = 'aq-moderate';
    } else if (aqi <= 150) {
      category = 'Sensitive';
      badgeClass = 'aq-unhealthy-sensitive';
    } else if (aqi <= 200) {
      category = 'Unhealthy';
      badgeClass = 'aq-unhealthy';
    } else {
      category = 'Hazardous';
      badgeClass = 'aq-unhealthy';
    }
  }

  elements.aqCategory.textContent = category;
  elements.aqCategory.className = `aq-badge ${badgeClass}`.trim();

  const pollutants = [
    ['US AQI', Number.isFinite(aqi) ? Math.round(aqi) : '--', 'Primary Index', true],
    ['PM2.5', current.pm2_5?.[idx], 'µg/m³', false],
    ['PM10', current.pm10?.[idx], 'µg/m³', false],
    ['Ozone (O₃)', current.ozone?.[idx], 'µg/m³', false],
    ['NO₂', current.nitrogen_dioxide?.[idx], 'µg/m³', false]
  ];

  elements.airQualityGrid.innerHTML = pollutants
    .map(([name, value, unit, isPrimary]) => {
      const displayVal = hasNumber(value) ? (isPrimary ? value : Number(value).toFixed(1)) : '--';
      return `
      <article class="air-stat ${isPrimary ? 'is-primary-aqi' : ''}">
        <span>${name}</span>
        <strong>${displayVal}</strong>
        <small>${unit}</small>
      </article>
    `;
    })
    .join('');
}

function render7DayForecast(daily) {
  if (!daily || !daily.time || !daily.time.length) {
    elements.forecast.innerHTML = '<div class="air-quality-empty">Weekly forecast unavailable.</div>';
    return;
  }

  elements.forecast.innerHTML = daily.time
    .map((day, idx) => {
      const [desc, type] = getWeatherLabel(daily.weather_code?.[idx]);
      const maxT = convertTemperature(daily.temperature_2m_max?.[idx]);
      const minT = convertTemperature(daily.temperature_2m_min?.[idx]);
      const rainProb = safeNumber(daily.precipitation_probability_max?.[idx]);
      const windMax = convertWind(daily.wind_speed_10m_max?.[idx]);
      const isToday = idx === 0;

      return `
        <article class="forecast-item ${isToday ? 'is-today' : ''}">
          <div class="forecast-day">
            ${formatDay(day, idx)}
            <small>${day.slice(5).replace('-', '/')}</small>
          </div>
          <div class="forecast-icon" aria-hidden="true">${getWeatherIconSvg(type, true)}</div>
          <div class="forecast-temp">
            ${maxT}${temperatureSuffix()}
            <span>/ ${minT}${temperatureSuffix()}</span>
          </div>
          <div class="forecast-note">${desc}</div>
          <div class="forecast-rain">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width:11px;height:11px;"><path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"></path></svg>
            ${rainProb}% · ${windMax} ${windSuffix()}
          </div>
        </article>
      `;
    })
    .join('');
}

function synthesizeWeatherIntelligence({ current, daily, summary, todayHigh, todayLow, precipProb, uv, apparent, temp }) {
  const insights = [];
  let headline = 'Steady atmosphere';
  let narrative = `${summary} conditions make for a consistent day across the region.`;

  const delta = Math.abs(todayHigh - todayLow);
  const gust = safeNumber(current.wind_gusts_10m);
  const wind = safeNumber(current.wind_speed_10m);

  if (precipProb !== null && precipProb >= 60) {
    headline = 'Rain gear recommended';
    narrative = `Significant chance of precipitation (${precipProb}%). Keep an umbrella on hand and anticipate slick roadway conditions.`;
    insights.push('Rain gear useful');
  } else if (uv !== null && uv >= 6) {
    headline = 'Intense midday sunshine';
    narrative = `UV levels will peak around ${uv.toFixed(1)} during early afternoon. Seek shade and use sun protection during midday hours.`;
    insights.push('Sun protection needed');
  } else if (gust >= 40 || wind >= 30) {
    headline = 'Noticeable wind and gusts';
    narrative = `Breezy conditions with peak gusts reaching ${convertWind(gust)} ${windSuffix()}. Wind may make temperatures feel cooler.`;
    insights.push('Gusty afternoon');
  } else if (delta >= 11) {
    headline = 'Wide diurnal range';
    narrative = `Expect a notable ${Math.round(delta)}° temperature swing between afternoon peak and evening low. Layering is advisable.`;
    insights.push('Wide temp swing');
  } else if (apparent !== null && temp !== null && Math.abs(apparent - temp) >= 3) {
    const warmer = apparent > temp;
    headline = warmer ? 'Humidity warming effect' : 'Wind chill factor';
    narrative = `Apparent temperature feels ${Math.abs(apparent - temp)}° ${warmer ? 'warmer' : 'cooler'} than the actual thermometer reading.`;
    insights.push(warmer ? 'Feels warmer' : 'Feels cooler');
  }

  if (safeNumber(current.cloud_cover) <= 20) insights.push('High sky clarity');
  if (safeNumber(current.relative_humidity_2m) <= 35) insights.push('Dry air');
  if (precipProb !== null && precipProb < 20) insights.push('Favorable for outdoors');

  elements.intelligenceTitle.textContent = headline;
  elements.intelligenceText.textContent = narrative;
  elements.insightTags.innerHTML = insights.map((tag) => `<span>${escapeHtml(tag)}</span>`).join('');
}

async function loadWeatherWithPlace(place, { forceRefresh = false, background = false } = {}) {
  if (!background) {
    elements.card.classList.add('loading');
    elements.status.className = 'form-status is-loading';
    elements.status.textContent = `Looking up atmospheric observations for ${place.name}...`;
  }

  
  if (activeWeatherAbortController) {
    activeWeatherAbortController.abort();
  }
  activeWeatherAbortController = new AbortController();
  const currentSignal = activeWeatherAbortController.signal;

  try {
    const data = await getForecast(place, { forceRefresh, signal: currentSignal });
    render(place, data, { isCached: Boolean(data._isCached), cachedTimestamp: data._cachedTimestamp });
    elements.input.value = place.name;
    elements.status.className = 'form-status';
    elements.status.textContent = 'Search a city or pick from recent places.';

    
    storage.set('northstar_cached_weather', {
      place,
      payload: data,
      timestamp: Date.now()
    });

    addToRecentSearches(place);
  } catch (error) {
    if (error.name === 'AbortError') return;

    
    const key = getCoordKey(place.latitude, place.longitude);
    const cached = getWeatherFromCache(key, 7 * 24 * 60 * 60 * 1000) || storage.get('northstar_cached_weather', null);
    if (cached && cached.place && cached.payload) {
      render(cached.place, cached.payload, { isCached: true, cachedTimestamp: cached.timestamp });
      elements.status.className = 'form-status is-error';
      elements.status.innerHTML = 'Unable to refresh weather right now. <button type="button" class="status-retry-btn" id="statusRetryBtn">Try again</button>';
      document.querySelector('#statusRetryBtn')?.addEventListener('click', () => {
        loadWeatherWithPlace(place, { forceRefresh: true });
      });
    } else {
      elements.status.className = 'form-status is-error';
      elements.status.innerHTML = 'Unable to load weather right now. <button type="button" class="status-retry-btn" id="statusRetryBtn">Try again</button>';
      document.querySelector('#statusRetryBtn')?.addEventListener('click', () => {
        loadWeatherWithPlace(place, { forceRefresh: true });
      });
    }
  } finally {
    if (!background) {
      elements.card.classList.remove('loading');
    }
  }
}

async function loadWeather(city) {
  const query = city.trim();
  if (!query) {
    elements.status.className = 'form-status is-error';
    elements.status.textContent = 'Please enter a city name to search.';
    return;
  }
  elements.card.classList.add('loading');
  elements.status.className = 'form-status is-loading';
  elements.status.textContent = `Finding coordinates for “${query}”...`;

  if (activeSearchAbortController) {
    activeSearchAbortController.abort();
  }
  activeSearchAbortController = new AbortController();

  try {
    const place = await findCity(query, activeSearchAbortController.signal);
    place.region = [place.admin1, place.country].filter(Boolean).join(', ');
    await loadWeatherWithPlace(place);
  } catch (error) {
    if (error.name === 'AbortError') return;
    elements.status.className = 'form-status is-error';
    elements.status.textContent = getErrorMessage(error);
    elements.card.classList.remove('loading');
  }
}

function hideSuggestions() {
  elements.suggestions.hidden = true;
  elements.suggestions.innerHTML = '';
  elements.input.setAttribute('aria-expanded', 'false');
  selectedSuggestionIndex = -1;
  currentSuggestions = [];
}

function showSuggestions(list) {
  currentSuggestions = list;
  selectedSuggestionIndex = -1;
  if (!list.length) {
    hideSuggestions();
    return;
  }
  elements.suggestions.innerHTML = list
    .map((item, index) => {
      const region = [item.admin1, item.country].filter(Boolean).join(', ');
      return `
        <li class="suggestion-item" role="option" data-index="${index}">
          <span class="suggestion-main">${escapeHtml(item.name)}</span>
          <span class="suggestion-sub">${escapeHtml(region)}</span>
        </li>
      `;
    })
    .join('');
  elements.suggestions.hidden = false;
  elements.input.setAttribute('aria-expanded', 'true');
}

elements.input.addEventListener('input', (e) => {
  const query = e.target.value.trim();
  clearTimeout(suggestionDebounceTimer);
  if (query.length < 2) {
    hideSuggestions();
    return;
  }

  if (activeSearchAbortController) {
    activeSearchAbortController.abort();
  }
  activeSearchAbortController = new AbortController();
  const currentSignal = activeSearchAbortController.signal;

  suggestionDebounceTimer = setTimeout(async () => {
    try {
      const results = await searchCities(query, currentSignal);
      showSuggestions(results);
    } catch {
      hideSuggestions();
    }
  }, 280);
});

elements.input.addEventListener('keydown', (e) => {
  if (elements.suggestions.hidden || !currentSuggestions.length) return;
  const items = elements.suggestions.querySelectorAll('.suggestion-item');
  if (e.key === 'ArrowDown') {
    e.preventDefault();
    selectedSuggestionIndex = (selectedSuggestionIndex + 1) % items.length;
    updateSuggestionSelection(items);
  } else if (e.key === 'ArrowUp') {
    e.preventDefault();
    selectedSuggestionIndex = (selectedSuggestionIndex - 1 + items.length) % items.length;
    updateSuggestionSelection(items);
  } else if (e.key === 'Enter') {
    if (selectedSuggestionIndex >= 0 && currentSuggestions[selectedSuggestionIndex]) {
      e.preventDefault();
      selectSuggestion(currentSuggestions[selectedSuggestionIndex]);
    }
  } else if (e.key === 'Escape') {
    hideSuggestions();
  }
});

function updateSuggestionSelection(items) {
  items.forEach((item, index) => {
    item.classList.toggle('is-selected', index === selectedSuggestionIndex);
  });
  if (selectedSuggestionIndex >= 0 && items[selectedSuggestionIndex]) {
    items[selectedSuggestionIndex].scrollIntoView({ block: 'nearest' });
  }
}

function selectSuggestion(item) {
  hideSuggestions();
  item.region = [item.admin1, item.country].filter(Boolean).join(', ');
  elements.input.value = item.name;
  loadWeatherWithPlace(item);
}

elements.suggestions.addEventListener('click', (e) => {
  const itemEl = e.target.closest('.suggestion-item');
  if (!itemEl) return;
  const idx = Number(itemEl.dataset.index);
  if (currentSuggestions[idx]) {
    selectSuggestion(currentSuggestions[idx]);
  }
});

document.addEventListener('click', (e) => {
  if (!elements.form.contains(e.target) && !elements.suggestions.contains(e.target)) {
    hideSuggestions();
  }
});

elements.form.addEventListener('submit', (e) => {
  e.preventDefault();
  hideSuggestions();
  loadWeather(elements.input.value);
});

function detectAndLoadUserLocation({ isBoot = false } = {}) {
  if (!navigator.geolocation) {
    if (!isBoot) {
      elements.status.className = 'form-status is-error';
      elements.status.textContent = 'Browser geolocation is unavailable on this device.';
    }
    return;
  }

  elements.status.className = 'form-status is-loading';
  elements.status.textContent = isBoot
    ? 'Requesting location permission to show your current location...'
    : 'Detecting current geographical position...';

  navigator.geolocation.getCurrentPosition(
    async ({ coords }) => {
      try {
        elements.status.className = 'form-status is-loading';
        elements.status.textContent = 'Identifying your local area from coordinates...';
        const place = await reverseGeocode(coords.latitude, coords.longitude);
        await loadWeatherWithPlace(place);
        elements.status.className = 'form-status';
        elements.status.textContent = `Showing live atmospheric conditions for your location: ${place.name}.`;
      } catch (error) {
        elements.status.className = 'form-status is-error';
        elements.status.textContent = getErrorMessage(error);
      }
    },
    (err) => {
      elements.status.className = 'form-status';
      if (err.code === 1) {
        elements.status.textContent = isBoot
          ? 'Location access not granted. Search a city or pick from recent places.'
          : 'Location access was denied. Search for a city instead.';
      } else {
        elements.status.textContent = isBoot
          ? 'Search a city or pick from recent places.'
          : 'Unable to determine geographic position.';
      }
    },
    { timeout: 10000, enableHighAccuracy: false, maximumAge: 120000 }
  );
}

elements.locationButton.addEventListener('click', () => {
  hideSuggestions();
  detectAndLoadUserLocation({ isBoot: false });
});

elements.refreshButton.addEventListener('click', () => {
  if (!currentPlace) return;
  elements.refreshButton.classList.add('is-spinning');
  loadWeatherWithPlace(currentPlace, { forceRefresh: true }).finally(() => {
    setTimeout(() => elements.refreshButton.classList.remove('is-spinning'), 600);
  });
});

elements.favButton.addEventListener('click', () => {
  toggleFavorite();
});

elements.recentPills.addEventListener('click', (e) => {
  const pill = e.target.closest('.recent-pill-btn');
  if (!pill) return;
  const idx = Number(pill.dataset.recentIndex);
  const recents = storage.get('northstar_recent_searches', []);
  if (recents[idx]) {
    loadWeatherWithPlace(recents[idx]);
  }
});

elements.clearRecentBtn.addEventListener('click', () => {
  storage.remove('northstar_recent_searches');
  renderRecentSearches();
});

elements.favoritesGrid.addEventListener('click', (e) => {
  const removeBtn = e.target.closest('.fav-remove-btn');
  if (removeBtn) {
    e.stopPropagation();
    const idx = Number(removeBtn.dataset.remove);
    let favs = getFavorites();
    favs.splice(idx, 1);
    storage.set('northstar_favorites', favs);
    updateFavoriteButton();
    renderFavoritesTray();
    return;
  }

  const card = e.target.closest('.fav-snapshot-card');
  if (!card) return;
  const idx = Number(card.dataset.index);
  const favs = getFavorites();
  if (favs[idx]) {
    loadWeatherWithPlace(favs[idx]);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
});

elements.shareButton.addEventListener('click', async () => {
  if (!currentPlace || !currentData) return;
  const cur = currentData.forecast.current;
  const daily = currentData.forecast.daily;
  const [desc] = getWeatherLabel(cur.weather_code);
  const shareText = `Northstar Weather · ${currentPlace.name}: ${convertTemperature(
    cur.temperature_2m
  )}${temperatureSuffix()}, ${desc} (High ${convertTemperature(
    daily.temperature_2m_max?.[0]
  )}° / Low ${convertTemperature(daily.temperature_2m_min?.[0])}°). Check live: ${window.location.href}`;

  if (navigator.share) {
    try {
      await navigator.share({
        title: `Northstar Weather — ${currentPlace.name}`,
        text: shareText,
        url: window.location.href
      });
      return;
    } catch {
      
    }
  }

  try {
    await navigator.clipboard.writeText(shareText);
    elements.shareFeedback.hidden = false;
    elements.shareFeedback.textContent = 'Atmospheric summary copied to clipboard.';
    setTimeout(() => {
      elements.shareFeedback.hidden = true;
    }, 4000);
  } catch {
    alert(shareText);
  }
});

elements.unitOptions.forEach((btn) => {
  btn.addEventListener('click', () => {
    temperatureUnit = btn.dataset.unit;
    elements.unitOptions.forEach((opt) => {
      const active = opt === btn;
      opt.classList.toggle('is-active', active);
      opt.setAttribute('aria-pressed', active ? 'true' : 'false');
    });
    const prefs = storage.get('northstar_preferences', {});
    prefs.tempUnit = temperatureUnit;
    storage.set('northstar_preferences', prefs);

    if (currentPlace && currentData) render(currentPlace, currentData);
    renderComparisonTable();
    renderFavoritesTray();
  });
});

elements.windUnitOptions.forEach((btn) => {
  btn.addEventListener('click', () => {
    windUnit = btn.dataset.windUnit;
    elements.windUnitOptions.forEach((opt) => {
      const active = opt === btn;
      opt.classList.toggle('is-active', active);
      opt.setAttribute('aria-pressed', active ? 'true' : 'false');
    });
    const prefs = storage.get('northstar_preferences', {});
    prefs.windUnit = windUnit;
    storage.set('northstar_preferences', prefs);

    if (currentPlace && currentData) render(currentPlace, currentData);
    renderComparisonTable();
  });
});

if (elements.hourlyPrevBtn && elements.hourlyNextBtn && elements.hourlyList) {
  elements.hourlyPrevBtn.addEventListener('click', () => {
    elements.hourlyList.scrollBy({ left: -360, behavior: 'smooth' });
  });
  elements.hourlyNextBtn.addEventListener('click', () => {
    elements.hourlyList.scrollBy({ left: 360, behavior: 'smooth' });
  });
}

document.addEventListener('visibilitychange', () => {
  if (document.visibilityState === 'visible' && currentPlace && currentData) {
    const lastTimestamp = currentData._cachedTimestamp || 0;
    
    if (Date.now() - lastTimestamp > 15 * 60 * 1000) {
      loadWeatherWithPlace(currentPlace, { forceRefresh: true, background: true });
    }
  }
});

setupSlotSearch(elements.compareSlot2Input, elements.compareSlot2Suggestions, 2);
setupSlotSearch(elements.compareSlot3Input, elements.compareSlot3Suggestions, 3);
elements.compareSlot2Clear.addEventListener('click', () => clearComparisonSlot(2));
elements.compareSlot3Clear.addEventListener('click', () => clearComparisonSlot(3));

let currentTheme = storage.get('northstar_theme', 'system');

function applyTheme(theme) {
  currentTheme = theme;
  storage.set('northstar_theme', theme);

  if (theme === 'system') {
    document.documentElement.removeAttribute('data-theme');
    const isDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
  } else {
    document.documentElement.setAttribute('data-theme', theme);
  }

  
  document.querySelectorAll('[data-theme-val]').forEach((btn) => {
    const active = btn.dataset.themeVal === theme;
    btn.classList.toggle('is-active', active);
    btn.setAttribute('aria-pressed', active ? 'true' : 'false');
    if (btn.getAttribute('role') === 'radio') {
      btn.setAttribute('aria-checked', active ? 'true' : 'false');
    }
  });
}

if (window.matchMedia) {
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
    if (currentTheme === 'system') {
      applyTheme('system');
    }
  });
}

document.addEventListener('click', (e) => {
  const themeBtn = e.target.closest('[data-theme-val]');
  if (themeBtn) {
    applyTheme(themeBtn.dataset.themeVal);
  }
});

function boot() {
  
  applyTheme(currentTheme);

  
  const prefs = storage.get('northstar_preferences', {});
  if (prefs.tempUnit) {
    temperatureUnit = prefs.tempUnit;
    elements.unitOptions.forEach((btn) => {
      const active = btn.dataset.unit === temperatureUnit;
      btn.classList.toggle('is-active', active);
      btn.setAttribute('aria-pressed', active ? 'true' : 'false');
    });
  }
  if (prefs.windUnit) {
    windUnit = prefs.windUnit;
    elements.windUnitOptions.forEach((btn) => {
      const active = btn.dataset.windUnit === windUnit;
      btn.classList.toggle('is-active', active);
      btn.setAttribute('aria-pressed', active ? 'true' : 'false');
    });
  }

  
  renderRecentSearches();
  renderFavoritesTray();

  
  const urlParams = new URLSearchParams(window.location.search);
  const lat = parseFloat(urlParams.get('lat'));
  const lon = parseFloat(urlParams.get('lon'));
  const name = urlParams.get('name');

  if (Number.isFinite(lat) && Number.isFinite(lon)) {
    
    loadWeatherWithPlace({
      name: name || 'Selected Location',
      region: '',
      latitude: lat,
      longitude: lon
    });
  } else {
    
    
    const cached = storage.get('northstar_cached_weather', null);
    if (cached && cached.place) {
      loadWeatherWithPlace(cached.place);
    } else {
      loadWeather(elements.input.value || 'London');
    }

    
    detectAndLoadUserLocation({ isBoot: true });
  }
}

boot();
