// Calendar Functionality
function renderCalendar() {
    const date = new Date();
    const calendarHTML = document.getElementById('calendar');
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  
    let calendar = `
      <p>Today is: ${daysOfWeek[date.getDay()]}, ${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}</p>
      <p>Time (IST): ${date.toLocaleTimeString()}</p>
    `;
  
    calendarHTML.innerHTML = calendar;
  
    // Update every second
    setTimeout(renderCalendar, 1000);
  }
  renderCalendar();
  
  // Weather API
  async function getWeatherData() {
    const apiKey = '{API Key}'; // Replace with your API Key
  
    // Get user-entered location from the input field
    const location = document.getElementById('location').value;
  
    if (!location) {
      alert('Please enter a location!');
      return;
    }
  
    const units = 'metric'; // Change to 'imperial' for Fahrenheit
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=${units}`;
  
    try {
      const response = await fetch(url);
      const weatherData = await response.json();
      console.log(weatherData);
  
      if (weatherData.cod === '404') {
        document.getElementById('weatherData').innerHTML = `<p>Error: Location "${location}" not found.</p>`;
        return;
      }
  
      const weatherHTML = `
        <p>Location: ${weatherData.name}</p>
        <p>Temperature: ${weatherData.main.temp}°C</p>
        <p>Feels Like: ${weatherData.main.feels_like}°C</p>
        <p>Weather: ${weatherData.weather[0].main}</p>
        <p>Description: ${weatherData.weather[0].description}</p>
      `;
  
      document.getElementById('weatherData').innerHTML = weatherHTML;
    } catch (error) {
      console.error('Error:', error);
      document.getElementById('weatherData').innerHTML = '<p>Error fetching weather data.</p>';
    }
  }
