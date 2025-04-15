
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Plant } from '@/types';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Loader2 } from 'lucide-react';

interface AddPlantFormProps {
  onSubmit: (plant: Omit<Plant, 'id'>) => void;
  isSubmitting?: boolean;
}

const AddPlantForm = ({ onSubmit, isSubmitting = false }: AddPlantFormProps) => {
  const form = useForm({
    defaultValues: {
      name: '',
      species: '',
      plantingDate: new Date().toISOString().split('T')[0],
      wateringFrequency: 7,
      notes: '',
    }
  });

  const handleSubmit = (data: Omit<Plant, 'id'>) => {
    onSubmit(data);
    form.reset();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Plant Name</FormLabel>
              <FormControl>
                <Input placeholder="e.g., Living Room Ficus" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="species"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Species</FormLabel>
              <FormControl>
                <Input placeholder="e.g., Ficus Lyrata" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="plantingDate"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Planting Date</FormLabel>
              <FormControl>
                <Input type="date" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="wateringFrequency"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Watering Frequency (days)</FormLabel>
              <FormControl>
                <Input 
                  type="number" 
                  min="1" 
                  max="60" 
                  {...field} 
                  onChange={e => field.onChange(parseInt(e.target.value))}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="notes"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Notes</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="Add any special care instructions or notes..."
                  className="h-24"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button 
          type="submit" 
          className="w-full bg-garden-green hover:bg-garden-green-dark"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Adding Plant...
            </>
          ) : (
            'Add Plant'
          )}
        </Button>
      </form>
    </Form>
  );
};

export default AddPlantForm;
