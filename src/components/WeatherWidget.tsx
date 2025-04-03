
import { WeatherData } from '@/types';
import { 
  Cloud, 
  CloudRain, 
  Droplets, 
  Sun, 
  ThermometerSun, 
  Wind 
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

interface WeatherWidgetProps {
  weather: WeatherData;
}

const WeatherWidget = ({ weather }: WeatherWidgetProps) => {
  const getWeatherIcon = (condition: string) => {
    switch (condition.toLowerCase()) {
      case 'sunny':
        return <Sun size={40} className="text-yellow-500" />;
      case 'partly cloudy':
        return <Cloud size={40} className="text-gray-500" />;
      case 'cloudy':
        return <Cloud size={40} className="text-gray-400" />;
      case 'rainy':
        return <CloudRain size={40} className="text-blue-400" />;
      default:
        return <Sun size={40} className="text-yellow-500" />;
    }
  };

  return (
    <Card className="garden-card overflow-hidden">
      <div className="bg-garden-sky/20 p-4 border-b border-garden-sky/30">
        <h2 className="font-semibold text-lg">Today's Weather</h2>
      </div>
      
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            {getWeatherIcon(weather.condition)}
            <div>
              <div className="text-2xl font-semibold">{weather.temperature}°F</div>
              <div className="text-sm text-gray-500">{weather.condition}</div>
            </div>
          </div>
          
          <div className="text-right">
            <div className="text-sm">
              <span>Precipitation: {weather.precipitation}%</span>
            </div>
            <div className="text-xs text-garden-green">Good day for gardening!</div>
          </div>
        </div>
        
        <div className="grid grid-cols-3 gap-2 text-center">
          <div className="p-2 bg-gray-50 rounded-md">
            <Droplets className="h-5 w-5 mx-auto text-blue-500 mb-1" />
            <div className="text-xs text-gray-500">Humidity</div>
            <div className="font-medium">{weather.humidity}%</div>
          </div>
          
          <div className="p-2 bg-gray-50 rounded-md">
            <Wind className="h-5 w-5 mx-auto text-blue-400 mb-1" />
            <div className="text-xs text-gray-500">Wind</div>
            <div className="font-medium">{weather.windSpeed} mph</div>
          </div>
          
          <div className="p-2 bg-gray-50 rounded-md">
            <ThermometerSun className="h-5 w-5 mx-auto text-orange-400 mb-1" />
            <div className="text-xs text-gray-500">UV Index</div>
            <div className="font-medium">Medium</div>
          </div>
        </div>
        
        <div className="mt-4 text-xs text-gray-500 text-center">
          Last updated: {new Date().toLocaleTimeString()}
        </div>
      </CardContent>
    </Card>
  );
};

export default WeatherWidget;
