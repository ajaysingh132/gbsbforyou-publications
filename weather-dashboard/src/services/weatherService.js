import axios from 'axios';

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
const API_URL = import.meta.env.VITE_WEATHER_API_URL;
const UNITS = import.meta.env.VITE_UNITS || 'metric';

if (!API_KEY) {
  console.warn('⚠️ VITE_WEATHER_API_KEY is not set. Weather data will not be available.');
}

const weatherAPI = axios.create({
  baseURL: API_URL,
  params: {
    appid: API_KEY,
    units: UNITS
  }
});

/**
 * Get current weather for a city
 * @param {string} city - City name
 * @returns {Promise<Object>} Current weather data
 */
export const getCurrentWeather = async (city) => {
  try {
    const response = await weatherAPI.get('/weather', {
      params: {
        q: city
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching current weather:', error);
    throw new Error(error.response?.data?.message || 'Failed to fetch weather data');
  }
};

/**
 * Get 5-day weather forecast
 * @param {string} city - City name
 * @returns {Promise<Object>} Forecast data
 */
export const getForecast = async (city) => {
  try {
    const response = await weatherAPI.get('/forecast', {
      params: {
        q: city,
        cnt: 40 // 5 days * 8 (3-hour intervals)
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching forecast:', error);
    throw new Error(error.response?.data?.message || 'Failed to fetch forecast data');
  }
};

/**
 * Get weather by coordinates
 * @param {number} lat - Latitude
 * @param {number} lon - Longitude
 * @returns {Promise<Object>} Current weather data
 */
export const getWeatherByCoordinates = async (lat, lon) => {
  try {
    const response = await weatherAPI.get('/weather', {
      params: {
        lat,
        lon
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching weather by coordinates:', error);
    throw new Error('Failed to fetch weather data');
  }
};

/**
 * Get forecast by coordinates
 * @param {number} lat - Latitude
 * @param {number} lon - Longitude
 * @returns {Promise<Object>} Forecast data
 */
export const getForecastByCoordinates = async (lat, lon) => {
  try {
    const response = await weatherAPI.get('/forecast', {
      params: {
        lat,
        lon,
        cnt: 40
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching forecast by coordinates:', error);
    throw new Error('Failed to fetch forecast data');
  }
};

/**
 * Search for cities
 * @param {string} query - Search query
 * @returns {Promise<Array>} List of matching cities
 */
export const searchCities = async (query) => {
  try {
    if (query.length < 2) return [];
    
    const response = await weatherAPI.get('/find', {
      params: {
        q: query,
        type: 'like',
        sort: 'population',
        cnt: 10
      }
    });
    return response.data.list || [];
  } catch (error) {
    console.error('Error searching cities:', error);
    return [];
  }
};

/**
 * Get user's location using geolocation API
 * @returns {Promise<Object>} Coordinates {lat, lon}
 */
export const getUserLocation = () => {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error('Geolocation is not supported'));
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve({
          lat: position.coords.latitude,
          lon: position.coords.longitude
        });
      },
      (error) => {
        reject(error);
      }
    );
  });
};

/**
 * Get weather alerts for a location
 * @param {number} lat - Latitude
 * @param {number} lon - Longitude
 * @returns {Promise<Array>} Alert data
 */
export const getWeatherAlerts = async (lat, lon) => {
  try {
    const response = await weatherAPI.get('/alerts', {
      params: {
        lat,
        lon
      }
    });
    return response.data.alerts || [];
  } catch (error) {
    console.error('Error fetching alerts:', error);
    return [];
  }
};

export default {
  getCurrentWeather,
  getForecast,
  getWeatherByCoordinates,
  getForecastByCoordinates,
  searchCities,
  getUserLocation,
  getWeatherAlerts
};
