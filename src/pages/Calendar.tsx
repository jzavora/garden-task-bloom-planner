
import { useState } from 'react';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Task } from '@/types';
import { format } from 'date-fns';
import { mockTasks } from '@/data/mockData';
import Navbar from '@/components/Navbar';
import { Badge } from '@/components/ui/badge';
import { CalendarDays, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const CalendarPage = () => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date());
  
  // Function to get tasks for a specific date
  const getTasksForDate = (date: Date | undefined): Task[] => {
    if (!date) return [];
    
    const dateString = format(date, 'yyyy-MM-dd');
    return mockTasks.filter(task => task.dueDate === dateString);
  };

  // Tasks for selected date
  const tasksForSelectedDate = getTasksForDate(selectedDate);

  // Navigate to previous month
  const goToPreviousMonth = () => {
    const prevMonth = new Date(currentMonth);
    prevMonth.setMonth(prevMonth.getMonth() - 1);
    setCurrentMonth(prevMonth);
  };

  // Navigate to next month
  const goToNextMonth = () => {
    const nextMonth = new Date(currentMonth);
    nextMonth.setMonth(nextMonth.getMonth() + 1);
    setCurrentMonth(nextMonth);
  };

  // Function to render task badges on calendar
  const dayWithTasks = (date: Date) => {
    const dateString = format(date, 'yyyy-MM-dd');
    const tasksForDay = mockTasks.filter(task => task.dueDate === dateString);
    
    if (tasksForDay.length > 0) {
      return (
        <div className="absolute bottom-0 right-0">
          <Badge 
            variant="secondary" 
            className="h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs bg-garden-green text-white"
          >
            {tasksForDay.length}
          </Badge>
        </div>
      );
    }
    
    return null;
  };

  return (
    <div className="min-h-screen bg-gray-50 bg-garden-texture">
      <Navbar onAddTask={() => {}} />
      
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Calendar Column */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-xl font-bold text-garden-green-dark flex items-center">
                  <CalendarDays className="mr-2 h-5 w-5" />
                  Garden Calendar
                </CardTitle>
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="icon" onClick={goToPreviousMonth}>
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <span className="text-sm font-medium">
                    {format(currentMonth, 'MMMM yyyy')}
                  </span>
                  <Button variant="outline" size="icon" onClick={goToNextMonth}>
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  month={currentMonth}
                  onMonthChange={setCurrentMonth}
                  className={cn("rounded-md border p-3 pointer-events-auto")}
                  components={{
                    DayContent: (props) => (
                      <div className="relative h-9 w-9 p-0 flex items-center justify-center">
                        <span>{props.day.day}</span>
                        {dayWithTasks(props.day.date)}
                      </div>
                    ),
                  }}
                />
              </CardContent>
            </Card>
          </div>
          
          {/* Tasks for Selected Day */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-semibold">
                  {selectedDate ? format(selectedDate, 'MMMM d, yyyy') : 'Select a date'}
                </CardTitle>
              </CardHeader>
              <CardContent>
                {tasksForSelectedDate.length > 0 ? (
                  <div className="space-y-4">
                    {tasksForSelectedDate.map(task => (
                      <div 
                        key={task.id} 
                        className={cn(
                          "p-3 rounded-md border",
                          task.completed ? "bg-green-50 border-green-200" : "bg-white"
                        )}
                      >
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className={cn(
                              "font-medium",
                              task.completed && "line-through text-green-500"
                            )}>
                              {task.title}
                            </h3>
                            <p className="text-sm text-gray-500 mt-1">{task.description}</p>
                          </div>
                          <Badge 
                            className={cn(
                              "ml-2",
                              task.priority === 'High' ? "bg-red-100 text-red-800" :
                              task.priority === 'Medium' ? "bg-yellow-100 text-yellow-800" :
                              "bg-blue-100 text-blue-800"
                            )}
                          >
                            {task.priority}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    <p>No tasks scheduled for this day</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CalendarPage;
