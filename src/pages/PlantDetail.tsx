
import { useParams } from 'react-router-dom';
import { Plant } from '@/types';
import { mockPlants } from '@/data/mockData';
import Navbar from '@/components/Navbar';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Calendar, Droplets, FlowerIcon } from 'lucide-react';
import { format } from 'date-fns';

const PlantDetail = () => {
  const { id } = useParams();
  const plant = mockPlants.find(p => p.id === id);

  if (!plant) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar onAddTask={() => {}} />
        <main className="container mx-auto px-4 py-8">
          <h1 className="text-2xl font-bold text-garden-green-dark">Plant Not Found</h1>
        </main>
      </div>
    );
  }

  const formatDate = (dateString: string): string => {
    return format(new Date(dateString), 'MMMM d, yyyy');
  };

  return (
    <div className="min-h-screen bg-gray-50 bg-garden-texture">
      <Navbar onAddTask={() => {}} />
      <main className="container mx-auto px-4 py-8">
        <Card className="max-w-3xl mx-auto">
          <CardHeader>
            <div className="flex items-center gap-4">
              <div className="w-24 h-24 bg-garden-green/10 rounded-full flex items-center justify-center">
                <FlowerIcon size={48} className="text-garden-green" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-garden-green-dark">{plant.name}</h1>
                <p className="text-lg text-gray-600 italic">{plant.species}</p>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Calendar className="text-garden-earth h-5 w-5" />
                  <div>
                    <p className="text-sm text-gray-500">Planted on</p>
                    <p className="font-medium">{formatDate(plant.plantingDate)}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Droplets className="text-garden-sky h-5 w-5" />
                  <div>
                    <p className="text-sm text-gray-500">Watering Schedule</p>
                    <p className="font-medium">
                      Every {plant.wateringFrequency} {plant.wateringFrequency === 1 ? 'day' : 'days'}
                    </p>
                  </div>
                </div>
              </div>
              {plant.notes && (
                <div className="bg-garden-green/5 p-4 rounded-lg">
                  <h3 className="font-semibold text-garden-green-dark mb-2">Care Notes</h3>
                  <p className="text-gray-600">{plant.notes}</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default PlantDetail;
