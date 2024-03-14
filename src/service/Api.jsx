const API_KEY = 'caf88261c9fc5a5cc139d0adf90db32c'; // Get API key from OpenWeatherMap

export const getWeatherData = async (city) => {
  const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`);
  if (!response.ok) {
    throw new Error('City not found');
  }
  return response.json();
};
