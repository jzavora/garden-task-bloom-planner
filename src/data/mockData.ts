
import { Plant, Task, Season, WeatherData } from '@/types';

// Helper to generate IDs
const generateId = () => Math.random().toString(36).substring(2, 10);

// Current season based on northern hemisphere
const getCurrentSeason = (): Season => {
  const month = new Date().getMonth();
  if (month >= 2 && month <= 4) return 'Spring';
  if (month >= 5 && month <= 7) return 'Summer';
  if (month >= 8 && month <= 10) return 'Fall';
  return 'Winter';
};

// Mock Plants
export const mockPlants: Plant[] = [
  {
    id: generateId(),
    name: 'Tomato Plant',
    species: 'Solanum lycopersicum',
    plantingDate: '2025-03-15',
    wateringFrequency: 2,
    notes: 'Cherry tomato variety, needs support as it grows',
    imageUrl: '/placeholder.svg',
  },
  {
    id: generateId(),
    name: 'Basil',
    species: 'Ocimum basilicum',
    plantingDate: '2025-03-20',
    wateringFrequency: 1,
    notes: 'Sweet basil, grows well next to tomatoes',
    imageUrl: '/placeholder.svg',
  },
  {
    id: generateId(),
    name: 'Cucumber',
    species: 'Cucumis sativus',
    plantingDate: '2025-03-25',
    wateringFrequency: 3,
    notes: 'Needs trellis for vertical growth',
    imageUrl: '/placeholder.svg',
  },
  {
    id: generateId(),
    name: 'Strawberry',
    species: 'Fragaria × ananassa',
    plantingDate: '2025-02-10',
    wateringFrequency: 2,
    notes: 'Perennial, watch for runners',
    imageUrl: '/placeholder.svg',
  },
];

// Plant IDs for reference
const tomatoId = mockPlants[0].id;
const basilId = mockPlants[1].id;
const cucumberId = mockPlants[2].id;
const strawberryId = mockPlants[3].id;

// Get current date and dates for tasks
const today = new Date();
const tomorrow = new Date(today);
tomorrow.setDate(tomorrow.getDate() + 1);
const nextWeek = new Date(today);
nextWeek.setDate(nextWeek.getDate() + 7);

// Format date to YYYY-MM-DD
const formatDate = (date: Date): string => {
  return date.toISOString().split('T')[0];
};

// Mock Tasks
export const mockTasks: Task[] = [
  {
    id: generateId(),
    title: 'Water tomato plants',
    description: 'Give a thorough watering, about 1-2 inches',
    completed: false,
    dueDate: formatDate(today),
    season: getCurrentSeason(),
    priority: 'High',
    plantId: tomatoId,
  },
  {
    id: generateId(),
    title: 'Harvest basil leaves',
    description: 'Pick from the top to encourage bushier growth',
    completed: true,
    dueDate: formatDate(today),
    season: getCurrentSeason(),
    priority: 'Medium',
    plantId: basilId,
  },
  {
    id: generateId(),
    title: 'Fertilize cucumber plants',
    description: 'Use organic fertilizer, half-strength',
    completed: false,
    dueDate: formatDate(tomorrow),
    season: getCurrentSeason(),
    priority: 'Medium',
    plantId: cucumberId,
  },
  {
    id: generateId(),
    title: 'Check strawberries for pests',
    description: 'Look under leaves for aphids or other insects',
    completed: false,
    dueDate: formatDate(tomorrow),
    season: getCurrentSeason(),
    priority: 'Low',
    plantId: strawberryId,
  },
  {
    id: generateId(),
    title: 'Weed garden beds',
    description: 'Focus on areas around young plants',
    completed: false,
    dueDate: formatDate(nextWeek),
    season: getCurrentSeason(),
    priority: 'High',
    plantId: undefined,
  },
  {
    id: generateId(),
    title: 'Prune tomato suckers',
    description: 'Remove suckers growing between main stem and branches',
    completed: false,
    dueDate: formatDate(nextWeek),
    season: getCurrentSeason(),
    priority: 'Medium',
    plantId: tomatoId,
  },
];

// Mock Weather Data
export const mockWeather: WeatherData = {
  temperature: 72,
  condition: 'Partly Cloudy',
  icon: 'partly-cloudy',
  precipitation: 10,
  humidity: 65,
  windSpeed: 5,
};

// Group tasks by season
export const getTasksBySeason = (): Record<Season, Task[]> => {
  const tasksBySeason: Record<Season, Task[]> = {
    Spring: [],
    Summer: [],
    Fall: [],
    Winter: [],
  };

  mockTasks.forEach(task => {
    tasksBySeason[task.season].push(task);
  });

  return tasksBySeason;
};

// Get a plant by ID
export const getPlantById = (plantId: string): Plant | undefined => {
  return mockPlants.find(plant => plant.id === plantId);
};
