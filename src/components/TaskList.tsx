
import { useState } from 'react';
import { Task } from '@/types';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { getPlantById } from '@/data/mockData';
import { 
  Calendar, 
  ChevronDown, 
  ChevronUp, 
  Clock, 
  Edit, 
  Trash, 
  FlowerIcon 
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface TaskListProps {
  tasks: Task[];
  title: string;
  onTaskComplete: (taskId: string) => void;
  onDeleteTask: (taskId: string) => void;
  onEditTask: (task: Task) => void;
}

const TaskList = ({ tasks, title, onTaskComplete, onDeleteTask, onEditTask }: TaskListProps) => {
  const [expanded, setExpanded] = useState(true);

  const getPriorityColor = (priority: string): string => {
    switch (priority) {
      case 'High':
        return 'bg-red-100 text-red-800';
      case 'Medium':
        return 'bg-orange-100 text-orange-800';
      case 'Low':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    });
  };

  const isOverdue = (dueDate: string): boolean => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return new Date(dueDate) < today;
  };

  return (
    <div className="garden-card overflow-hidden mb-6">
      <div 
        className="flex justify-between items-center p-4 cursor-pointer bg-garden-green/10 border-b border-garden-green/20"
        onClick={() => setExpanded(!expanded)}
      >
        <h2 className="font-semibold text-lg flex items-center">
          {title}
          <span className="ml-2 text-sm bg-garden-green text-white rounded-full px-2 py-0.5">
            {tasks.length}
          </span>
        </h2>
        <Button variant="ghost" size="icon">
          {expanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </Button>
      </div>
      
      {expanded && (
        <div className="divide-y divide-garden-green/10">
          {tasks.length === 0 ? (
            <div className="p-4 text-center text-gray-500">
              No tasks available
            </div>
          ) : (
            tasks.map(task => {
              const plant = task.plantId ? getPlantById(task.plantId) : undefined;
              
              return (
                <div 
                  key={task.id} 
                  className={cn(
                    "p-4 transition-colors",
                    task.completed ? "bg-green-50" : "",
                    isOverdue(task.dueDate) && !task.completed ? "bg-red-50" : ""
                  )}
                >
                  <div className="flex items-start gap-3">
                    <div className="mt-1">
                      <Checkbox 
                        checked={task.completed} 
                        onCheckedChange={() => onTaskComplete(task.id)}
                        className="border-garden-green"
                      />
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-2 mb-1">
                        <h3 className={cn(
                          "font-medium",
                          task.completed ? "line-through text-gray-500" : "",
                          isOverdue(task.dueDate) && !task.completed ? "text-red-600" : ""
                        )}>
                          {task.title}
                        </h3>
                        
                        <span className={cn(
                          "text-xs px-2 py-0.5 rounded-full",
                          getPriorityColor(task.priority)
                        )}>
                          {task.priority}
                        </span>
                        
                        {isOverdue(task.dueDate) && !task.completed && (
                          <span className="text-xs bg-red-100 text-red-800 px-2 py-0.5 rounded-full">
                            Overdue
                          </span>
                        )}
                      </div>
                      
                      <p className="text-sm text-gray-600 mb-2">
                        {task.description}
                      </p>
                      
                      <div className="flex flex-wrap gap-3 text-xs text-gray-500">
                        <span className="flex items-center">
                          <Calendar size={14} className="mr-1" />
                          {formatDate(task.dueDate)}
                        </span>
                        
                        {plant && (
                          <span className="flex items-center">
                            <FlowerIcon size={14} className="mr-1 text-garden-green" />
                            {plant.name}
                          </span>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-1">
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-8 w-8 text-gray-500"
                        onClick={() => onEditTask(task)}
                      >
                        <Edit size={16} />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-8 w-8 text-gray-500"
                        onClick={() => onDeleteTask(task.id)}
                      >
                        <Trash size={16} />
                      </Button>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      )}
    </div>
  );
};

export default TaskList;
