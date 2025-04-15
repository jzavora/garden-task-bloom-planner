
import { WeatherData } from '@/types';
import { mockWeather } from '@/data/mockData';
import Navbar from '@/components/Navbar';
import WeatherWidget from '@/components/WeatherWidget';

const Weather = () => {
  const weather: WeatherData = mockWeather;

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar onAddTask={() => {}} />
      
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold text-garden-green-dark mb-6">Weather Forecast</h1>
        <div className="max-w-2xl mx-auto">
          <WeatherWidget weather={weather} />
        </div>
      </main>
    </div>
  );
};

export default Weather;
