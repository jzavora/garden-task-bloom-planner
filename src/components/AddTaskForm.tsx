
import { useState, useEffect } from 'react';
import { Task, Season } from '@/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { format } from 'date-fns';
import { CalendarIcon, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { mockPlants } from '@/data/mockData';

interface AddTaskFormProps {
  onClose: () => void;
  onSave: (task: Task) => void;
  editingTask?: Task;
}

const emptyTask: Task = {
  id: '',
  title: '',
  description: '',
  completed: false,
  dueDate: format(new Date(), 'yyyy-MM-dd'),
  season: 'Spring',
  priority: 'Medium',
  plantId: undefined,
};

const AddTaskForm = ({ onClose, onSave, editingTask }: AddTaskFormProps) => {
  const [task, setTask] = useState<Task>(editingTask || { ...emptyTask });
  const [date, setDate] = useState<Date | undefined>(
    editingTask ? new Date(editingTask.dueDate) : new Date()
  );

  useEffect(() => {
    if (editingTask) {
      setTask(editingTask);
      setDate(new Date(editingTask.dueDate));
    }
  }, [editingTask]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setTask(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setTask(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleDateChange = (newDate: Date | undefined) => {
    if (newDate) {
      setDate(newDate);
      setTask(prev => ({
        ...prev,
        dueDate: format(newDate, 'yyyy-MM-dd'),
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Generate a random ID if this is a new task
    const taskToSave = {
      ...task,
      id: task.id || Math.random().toString(36).substring(2, 10),
    };
    
    onSave(taskToSave);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-xl font-semibold">
            {editingTask ? 'Edit Task' : 'Add New Task'}
          </h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X size={20} />
          </Button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-4 space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Task Title</Label>
            <Input
              id="title"
              name="title"
              value={task.title}
              onChange={handleChange}
              placeholder="What needs to be done?"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              name="description"
              value={task.description}
              onChange={handleChange}
              placeholder="Add more details about this task..."
              rows={3}
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="dueDate">Due Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !date && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, "PPP") : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0 pointer-events-auto">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={handleDateChange}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="priority">Priority</Label>
              <Select 
                value={task.priority} 
                onValueChange={(value) => handleSelectChange('priority', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Low">Low</SelectItem>
                  <SelectItem value="Medium">Medium</SelectItem>
                  <SelectItem value="High">High</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="season">Season</Label>
              <Select 
                value={task.season} 
                onValueChange={(value) => handleSelectChange('season', value as Season)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select season" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Spring">Spring</SelectItem>
                  <SelectItem value="Summer">Summer</SelectItem>
                  <SelectItem value="Fall">Fall</SelectItem>
                  <SelectItem value="Winter">Winter</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="plantId">Related Plant (Optional)</Label>
              <Select 
                value={task.plantId || "none"} 
                onValueChange={(value) => handleSelectChange('plantId', value === "none" ? "" : value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select plant" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">None</SelectItem>
                  {mockPlants.map(plant => (
                    <SelectItem key={plant.id} value={plant.id}>
                      {plant.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="flex justify-end gap-2 pt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button 
              type="submit" 
              className="bg-garden-green hover:bg-garden-green-dark text-white"
            >
              {editingTask ? 'Update Task' : 'Add Task'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTaskForm;
