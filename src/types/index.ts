
export type Season = 'Spring' | 'Summer' | 'Fall' | 'Winter';

export interface Task {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  dueDate: string;
  season: Season;
  priority: 'Low' | 'Medium' | 'High';
  plantId?: string;
}

export interface Plant {
  id: string;
  name: string;
  species: string;
  plantingDate: string;
  wateringFrequency: number; // days
  notes: string;
  imageUrl?: string;
}

export interface WeatherData {
  temperature: number;
  condition: string;
  icon: string;
  precipitation: number;
  humidity: number;
  windSpeed: number;
}
