/**
 * Convert temperature from Kelvin to Celsius
 * @param {number} kelvin - Temperature in Kelvin
 * @returns {number} Temperature in Celsius
 */
export const kelvinToCelsius = (kelvin) => Math.round(kelvin - 273.15);

/**
 * Convert temperature from Celsius to Fahrenheit
 * @param {number} celsius - Temperature in Celsius
 * @returns {number} Temperature in Fahrenheit
 */
export const celsiusToFahrenheit = (celsius) => Math.round((celsius * 9) / 5 + 32);

/**
 * Convert wind speed from m/s to km/h
 * @param {number} ms - Speed in m/s
 * @returns {number} Speed in km/h
 */
export const msToKmh = (ms) => Math.round(ms * 3.6);

/**
 * Convert wind speed from m/s to mph
 * @param {number} ms - Speed in m/s
 * @returns {number} Speed in mph
 */
export const msToMph = (ms) => Math.round(ms * 2.237);

/**
 * Format date to readable format
 * @param {number} timestamp - Unix timestamp
 * @param {string} format - Format type (short, long, time)
 * @returns {string} Formatted date
 */
export const formatDate = (timestamp, format = 'short') => {
  const date = new Date(timestamp * 1000);
  
  switch (format) {
    case 'long':
      return date.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    case 'time':
      return date.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit'
      });
    case 'short':
    default:
      return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric'
      });
  }
};

/**
 * Get weather icon based on weather condition
 * @param {string} iconCode - OpenWeatherMap icon code
 * @returns {string} Icon URL
 */
export const getWeatherIconUrl = (iconCode) => {
  return `https://openweathermap.org/img/wn/${iconCode}@4x.png`;
};

/**
 * Get wind direction from degrees
 * @param {number} degrees - Wind direction in degrees
 * @returns {string} Direction (N, NE, E, etc.)
 */
export const getWindDirection = (degrees) => {
  const directions = [
    'N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE',
    'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW'
  ];
  const index = Math.round(((degrees %= 360) < 0 ? degrees + 360 : degrees) / 22.5) % 16;
  return directions[index];
};

/**
 * Get UV index description
 * @param {number} uvIndex - UV index value
 * @returns {string} UV index description
 */
export const getUVIndexDescription = (uvIndex) => {
  if (uvIndex < 3) return 'Low';
  if (uvIndex < 6) return 'Moderate';
  if (uvIndex < 8) return 'High';
  if (uvIndex < 11) return 'Very High';
  return 'Extreme';
};

/**
 * Get air quality description
 * @param {number} aqi - Air quality index (1-5)
 * @returns {string} Air quality description
 */
export const getAirQualityDescription = (aqi) => {
  const descriptions = ['Good', 'Fair', 'Moderate', 'Poor', 'Very Poor'];
  return descriptions[aqi - 1] || 'Unknown';
};

/**
 * Check if weather condition is severe
 * @param {string} description - Weather description
 * @returns {boolean} True if weather is severe
 */
export const isSevereWeather = (description) => {
  const severeConditions = ['thunderstorm', 'tornado', 'hurricane', 'blizzard'];
  return severeConditions.some(condition => 
    description.toLowerCase().includes(condition)
  );
};

/**
 * Get feeling based on temperature and humidity
 * @param {number} temp - Temperature in Celsius
 * @param {number} humidity - Humidity percentage
 * @returns {string} Feeling description
 */
export const getTemperatureFeeling = (temp, humidity) => {
  const feelIndex = temp + (humidity / 100) * 5;
  
  if (feelIndex < 0) return '🥶 Freezing';
  if (feelIndex < 10) return '❄️ Very Cold';
  if (feelIndex < 15) return '🧊 Cold';
  if (feelIndex < 20) return '😊 Cool';
  if (feelIndex < 25) return '😌 Comfortable';
  if (feelIndex < 30) return '🌤️ Warm';
  if (feelIndex < 35) return '🔥 Hot';
  return '🌡️ Very Hot';
};

export default {
  kelvinToCelsius,
  celsiusToFahrenheit,
  msToKmh,
  msToMph,
  formatDate,
  getWeatherIconUrl,
  getWindDirection,
  getUVIndexDescription,
  getAirQualityDescription,
  isSevereWeather,
  getTemperatureFeeling
};
