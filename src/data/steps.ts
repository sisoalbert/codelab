export const steps = [
  {
    title: "Introduction",
    content: `
# Welcome to the React Weather App Codelab!

In this tutorial, we'll build a simple weather app using React and the OpenWeatherMap API. By the end of this codelab, you'll have created a functional weather app that allows users to search for weather information by city.

## What you'll learn:
- Setting up a React project
- Making API calls with fetch
- Managing state with React hooks
- Styling with Tailwind CSS

Let's get started!
    `
  },
  {
    title: "Project Setup",
    content: `
# Project Setup

First, let's set up our project structure. We'll create the necessary files for our weather app.

1. Create a new file called \`WeatherApp.tsx\` in the \`src/components\` directory.
2. Create a new file called \`WeatherDisplay.tsx\` in the \`src/components\` directory.

Here's the basic structure for \`WeatherApp.tsx\`:

\`\`\`tsx
// src/components/WeatherApp.tsx
import React, { useState } from 'react';
import WeatherDisplay from './WeatherDisplay';

const WeatherApp: React.FC = () => {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);

  // We'll add more code here later

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Weather App</h1>
      {/* We'll add more JSX here later */}
    </div>
  );
};

export default WeatherApp;
\`\`\`

And for \`WeatherDisplay.tsx\`:

\`\`\`tsx
// src/components/WeatherDisplay.tsx
import React from 'react';

interface WeatherDisplayProps {
  weather: any; // We'll define a proper type later
}

const WeatherDisplay: React.FC<WeatherDisplayProps> = ({ weather }) => {
  // We'll add more code here later
  return <div>{/* Weather display JSX will go here */}</div>;
};

export default WeatherDisplay;
\`\`\`

In the next step, we'll implement the search functionality and API call.
    `
  },
  {
    title: "Implementing the Search",
    content: `
# Implementing the Search

Now, let's add the search functionality to our \`WeatherApp\` component.

Update your \`WeatherApp.tsx\` file with the following code:

\`\`\`tsx
// src/components/WeatherApp.tsx
import React, { useState } from 'react';
import { Search } from 'lucide-react';
import WeatherDisplay from './WeatherDisplay';

const API_KEY = 'YOUR_OPENWEATHERMAP_API_KEY'; // Replace with your actual API key

const WeatherApp: React.FC = () => {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchWeather = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await fetch(
        \`https://api.openweathermap.org/data/2.5/weather?q=\${city}&appid=\${API_KEY}&units=metric\`
      );
      if (!response.ok) {
        throw new Error('City not found');
      }
      const data = await response.json();
      setWeather(data);
    } catch (err) {
      setError('Failed to fetch weather data');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (city.trim()) {
      fetchWeather();
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4 text-center">Weather App</h1>
      <form onSubmit={handleSubmit} className="mb-4">
        <div className="flex">
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="Enter city name"
            className="flex-grow px-4 py-2 border rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-r-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <Search size={20} />
          </button>
        </div>
      </form>
      {loading && <p className="text-center">Loading...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}
      {weather && <WeatherDisplay weather={weather} />}
    </div>
  );
};

export default WeatherApp;
\`\`\`

Make sure to replace \`'YOUR_OPENWEATHERMAP_API_KEY'\` with your actual API key from OpenWeatherMap.

In the next step, we'll implement the \`WeatherDisplay\` component to show the fetched weather data.
    `
  },
  {
    title: "Displaying Weather Data",
    content: `
# Displaying Weather Data

Now that we have the search functionality working, let's update the \`WeatherDisplay\` component to show the weather data.

Update your \`WeatherDisplay.tsx\` file with the following code:

\`\`\`tsx
// src/components/WeatherDisplay.tsx
import React from 'react';
import { Cloud, Droplets, Wind } from 'lucide-react';

interface WeatherData {
  name: string;
  main: {
    temp: number;
    humidity: number;
  };
  weather: Array<{
    description: string;
    icon: string;
  }>;
  wind: {
    speed: number;
  };
}

interface WeatherDisplayProps {
  weather: WeatherData;
}

const WeatherDisplay: React.FC<WeatherDisplayProps> = ({ weather }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h2 className="text-2xl font-semibold mb-4">{weather.name}</h2>
      <div className="flex items-center justify-between mb-4">
        <img
          src={\`http://openweathermap.org/img/wn/\${weather.weather[0].icon}@2x.png\`}
          alt={weather.weather[0].description}
          className="w-20 h-20"
        />
        <div className="text-right">
          <p className="text-4xl font-bold">{Math.round(weather.main.temp)}°C</p>
          <p className="text-gray-600 capitalize">{weather.weather[0].description}</p>
        </div>
      </div>
      <div className="flex justify-between text-gray-700">
        <div className="flex items-center">
          <Droplets className="mr-2" size={20} />
          <span>{weather.main.humidity}% Humidity</span>
        </div>
        <div className="flex items-center">
          <Wind className="mr-2" size={20} />
          <span>{weather.wind.speed} m/s Wind</span>
        </div>
      </div>
    </div>
  );
};

export default WeatherDisplay;
\`\`\`

This component now displays the city name, temperature, weather description, humidity, and wind speed. It also shows the weather icon provided by the OpenWeatherMap API.

In the final step, we'll integrate the \`WeatherApp\` component into our main \`App.tsx\`.
    `
  },
  {
    title: "Finishing Touches",
    content: `
# Finishing Touches

Let's update our \`App.tsx\` to include the \`WeatherApp\` component we've created.

Update your \`App.tsx\` file with the following code:

\`\`\`tsx
// src/App.tsx
import React from 'react';
import WeatherApp from './components/WeatherApp';

function App() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <WeatherApp />
    </div>
  );
}

export default App;
\`\`\`

Now, your weather app is complete! Here's a summary of what we've accomplished:

1. Set up the project structure
2. Implemented the search functionality with API calls
3. Created a weather display component
4. Integrated everything into the main App component

To run your app, you would typically use the following command in your terminal:

\`\`\`
npm run dev
\`\`\`

However, since we're working with markdown files, you can't actually run the app directly from this tutorial. To make this app functional, you would need to set up a React project with Vite, copy these files into the appropriate directories, and then run the development server.

Congratulations! You've learned how to build a functional weather app using React and Tailwind CSS. Feel free to expand on this project by adding more features like:

- A 5-day forecast
- Geolocation to get the user's current location
- Unit conversion (Celsius to Fahrenheit)
- Error handling and input validation

Happy coding!
    `
  }
];