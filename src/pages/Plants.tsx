
import { useState } from 'react';
import { Plant } from '@/types';
import { mockPlants } from '@/data/mockData';
import Navbar from '@/components/Navbar';
import PlantCard from '@/components/PlantCard';
import AddPlantForm from '@/components/AddPlantForm';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { toast } from 'sonner';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const Plants = () => {
  const [plants, setPlants] = useState<Plant[]>(mockPlants);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleAddPlant = async (plantData: Omit<Plant, 'id'>) => {
    setIsSubmitting(true);
    try {
      // In a real app, this would be an API call
      const newPlant: Plant = {
        ...plantData,
        id: crypto.randomUUID(),
      };
      
      setPlants(prevPlants => [...prevPlants, newPlant]);
      toast.success('Plant added successfully');
    } catch (error) {
      toast.error('Failed to add plant');
    } finally {
      setIsSubmitting(false);
    }
  };

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
          <Sheet>
            <SheetTrigger asChild>
              <Button 
                className="bg-garden-green hover:bg-garden-green-dark text-white"
              >
                <Plus size={18} className="mr-1" />
                Add Plant
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Add New Plant</SheetTitle>
              </SheetHeader>
              <div className="mt-6">
                <AddPlantForm 
                  onSubmit={handleAddPlant}
                  isSubmitting={isSubmitting}
                />
              </div>
            </SheetContent>
          </Sheet>
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
