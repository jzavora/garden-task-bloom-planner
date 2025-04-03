
import { Plant } from '@/types';
import { Button } from '@/components/ui/button';
import { 
  Calendar, 
  Droplets, 
  Edit, 
  Trash,
  FlowerIcon
} from 'lucide-react';
import { format } from 'date-fns';

interface PlantCardProps {
  plant: Plant;
  onEdit: (plant: Plant) => void;
  onDelete: (plantId: string) => void;
}

const PlantCard = ({ plant, onEdit, onDelete }: PlantCardProps) => {
  const formatDate = (dateString: string): string => {
    return format(new Date(dateString), 'MMM d, yyyy');
  };

  // Calculate days until next watering
  const getNextWateringDate = (): string => {
    const plantingDate = new Date(plant.plantingDate);
    const today = new Date();
    
    // Calculate days since planting
    const daysSincePlanting = Math.floor((today.getTime() - plantingDate.getTime()) / (1000 * 60 * 60 * 24));
    
    // Calculate days until next watering
    const daysUntilNextWatering = plant.wateringFrequency - (daysSincePlanting % plant.wateringFrequency);
    
    if (daysUntilNextWatering === 0) return 'Today';
    if (daysUntilNextWatering === 1) return 'Tomorrow';
    return `In ${daysUntilNextWatering} days`;
  };

  return (
    <div className="garden-card h-full flex flex-col">
      <div className="relative h-48 overflow-hidden rounded-t-lg">
        <div className="absolute inset-0 bg-garden-green/10 flex items-center justify-center">
          <FlowerIcon size={64} className="text-garden-green/40" />
        </div>
        {plant.imageUrl && (
          <img 
            src={plant.imageUrl} 
            alt={plant.name} 
            className="w-full h-full object-cover"
          />
        )}
      </div>
      
      <div className="p-4 flex-1 flex flex-col">
        <div className="flex justify-between items-start mb-2">
          <div>
            <h3 className="font-semibold text-lg text-garden-green-dark">{plant.name}</h3>
            <p className="text-xs text-gray-500 italic">{plant.species}</p>
          </div>
          
          <div className="flex gap-1">
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-8 w-8 text-gray-500"
              onClick={() => onEdit(plant)}
            >
              <Edit size={16} />
            </Button>
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-8 w-8 text-gray-500"
              onClick={() => onDelete(plant.id)}
            >
              <Trash size={16} />
            </Button>
          </div>
        </div>
        
        <div className="space-y-2 mb-4 flex-1">
          <div className="flex items-center text-sm gap-2">
            <Calendar size={16} className="text-garden-earth" />
            <span>Planted: {formatDate(plant.plantingDate)}</span>
          </div>
          
          <div className="flex items-center text-sm gap-2">
            <Droplets size={16} className="text-garden-sky" />
            <span>
              Water {plant.wateringFrequency === 1 ? 'daily' : `every ${plant.wateringFrequency} days`}
              <span className="ml-1 text-xs text-garden-green font-medium">
                ({getNextWateringDate()})
              </span>
            </span>
          </div>
          
          {plant.notes && (
            <p className="text-sm text-gray-600 mt-2">
              {plant.notes}
            </p>
          )}
        </div>
        
        <Button 
          variant="outline" 
          className="w-full border-garden-green text-garden-green hover:bg-garden-green/10"
        >
          <Droplets size={16} className="mr-2" />
          Mark as Watered
        </Button>
      </div>
    </div>
  );
};

export default PlantCard;
