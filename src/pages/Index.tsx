
import { useState } from 'react';
import { Task, Plant } from '@/types';
import Navbar from '@/components/Navbar';
import TaskList from '@/components/TaskList';
import AddTaskForm from '@/components/AddTaskForm';
import PlantCard from '@/components/PlantCard';
import WeatherWidget from '@/components/WeatherWidget';
import { Button } from '@/components/ui/button';
import { mockTasks, mockPlants, mockWeather } from '@/data/mockData';
import { Plus, Calendar, ArrowRight } from 'lucide-react';
import { toast } from 'sonner';

const Index = () => {
  const [tasks, setTasks] = useState<Task[]>(mockTasks);
  const [plants, setPlants] = useState<Plant[]>(mockPlants);
  const [showAddTask, setShowAddTask] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | undefined>(undefined);

  // Handler functions
  const handleAddTask = () => {
    setEditingTask(undefined);
    setShowAddTask(true);
  };

  const handleEditTask = (task: Task) => {
    setEditingTask(task);
    setShowAddTask(true);
  };

  const handleSaveTask = (task: Task) => {
    if (editingTask) {
      // Update existing task
      setTasks(prevTasks => 
        prevTasks.map(t => t.id === task.id ? task : t)
      );
      toast.success('Task updated successfully');
    } else {
      // Add new task
      setTasks(prevTasks => [...prevTasks, task]);
      toast.success('Task added successfully');
    }
  };

  const handleTaskComplete = (taskId: string) => {
    setTasks(prevTasks => 
      prevTasks.map(task => 
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
    
    const completedTask = tasks.find(task => task.id === taskId);
    if (completedTask && !completedTask.completed) {
      toast.success('Task marked as completed');
    }
  };

  const handleDeleteTask = (taskId: string) => {
    setTasks(prevTasks => prevTasks.filter(task => task.id !== taskId));
    toast.success('Task deleted successfully');
  };

  // Filter tasks
  const todayTasks = tasks.filter(task => {
    const today = new Date().toISOString().split('T')[0];
    return task.dueDate === today;
  });
  
  const upcomingTasks = tasks.filter(task => {
    const today = new Date().toISOString().split('T')[0];
    return task.dueDate > today;
  });

  const completedTasks = tasks.filter(task => task.completed);

  return (
    <div className="min-h-screen bg-gray-50 bg-garden-texture pb-10">
      <Navbar onAddTask={handleAddTask} />
      
      <main className="container mx-auto px-4 pt-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Tasks Column */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-garden-green-dark">Garden Tasks</h2>
              <Button 
                onClick={handleAddTask}
                className="bg-garden-green hover:bg-garden-green-dark text-white"
              >
                <Plus size={18} className="mr-1" />
                Add Task
              </Button>
            </div>
            
            {todayTasks.length > 0 && (
              <TaskList
                tasks={todayTasks}
                title="Today's Tasks"
                onTaskComplete={handleTaskComplete}
                onDeleteTask={handleDeleteTask}
                onEditTask={handleEditTask}
              />
            )}
            
            {upcomingTasks.length > 0 && (
              <TaskList
                tasks={upcomingTasks}
                title="Upcoming Tasks"
                onTaskComplete={handleTaskComplete}
                onDeleteTask={handleDeleteTask}
                onEditTask={handleEditTask}
              />
            )}
            
            {completedTasks.length > 0 && (
              <TaskList
                tasks={completedTasks}
                title="Completed Tasks"
                onTaskComplete={handleTaskComplete}
                onDeleteTask={handleDeleteTask}
                onEditTask={handleEditTask}
              />
            )}
          </div>
          
          {/* Sidebar Column */}
          <div className="space-y-6">
            {/* Weather Widget */}
            <WeatherWidget weather={mockWeather} />
            
            {/* Plants Section */}
            <div className="garden-card">
              <div className="flex justify-between items-center p-4 bg-garden-green/10 border-b border-garden-green/20">
                <h2 className="font-semibold text-lg">Your Plants</h2>
                <Button variant="ghost" size="sm" className="text-garden-green">
                  View All <ArrowRight size={16} className="ml-1" />
                </Button>
              </div>
              
              <div className="p-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                {plants.slice(0, 2).map(plant => (
                  <PlantCard 
                    key={plant.id} 
                    plant={plant} 
                    onEdit={() => {}} 
                    onDelete={() => {}}
                  />
                ))}
              </div>
            </div>
            
            {/* Calendar Preview */}
            <div className="garden-card">
              <div className="flex justify-between items-center p-4 bg-garden-green/10 border-b border-garden-green/20">
                <h2 className="font-semibold text-lg">Calendar</h2>
                <Button variant="ghost" size="sm" className="text-garden-green">
                  Full Calendar <Calendar size={16} className="ml-1" />
                </Button>
              </div>
              
              <div className="p-4">
                <p className="text-center text-sm text-gray-500 py-8">
                  Calendar view will show your upcoming gardening schedule
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      {/* Task Form Modal */}
      {showAddTask && (
        <AddTaskForm 
          onClose={() => setShowAddTask(false)} 
          onSave={handleSaveTask}
          editingTask={editingTask}
        />
      )}
    </div>
  );
};

export default Index;
