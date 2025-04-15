
import { useState } from 'react';
import { Plant } from '@/types';
import { mockPlants } from '@/data/mockData';
import Navbar from '@/components/Navbar';
import PlantCard from '@/components/PlantCard';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { toast } from 'sonner';

const Plants = () => {
  const [plants, setPlants] = useState<Plant[]>(mockPlants);

  const handleEditPlant = (plant: Plant) => {
    // This will be implemented later when we add the edit form
    toast.info('Plant editing will be available soon');
  };

  const handleDeletePlant = (plantId: string) => {
    setPlants(prevPlants => prevPlants.filter(plant => plant.id !== plantId));
    toast.success('Plant deleted successfully');
  };

  return (
    <div className="min-h-screen bg-gray-50 bg-garden-texture">
      <Navbar onAddTask={() => {}} />
      
      <main className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-garden-green-dark">My Plants</h1>
          <Button 
            className="bg-garden-green hover:bg-garden-green-dark text-white"
          >
            <Plus size={18} className="mr-1" />
            Add Plant
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {plants.map((plant) => (
            <PlantCard
              key={plant.id}
              plant={plant}
              onEdit={handleEditPlant}
              onDelete={handleDeletePlant}
            />
          ))}
        </div>
      </main>
    </div>
  );
};

export default Plants;
