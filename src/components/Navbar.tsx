
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { 
  Calendar, 
  Leaf, 
  Menu, 
  Plus, 
  Sprout,
  Home,
  Sun
} from 'lucide-react';

interface NavbarProps {
  onAddTask: () => void;
}

const Navbar = ({ onAddTask }: NavbarProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-10 bg-white/80 backdrop-blur-sm border-b border-garden-green/20 px-4 py-3">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Leaf className="h-6 w-6 text-garden-green animate-leaf-sway" />
          <h1 className="font-bold text-xl text-garden-green-dark">Bloom Planner</h1>
        </div>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-4">
          <Button variant="ghost" className="flex items-center gap-2">
            <Home size={18} />
            <span>Dashboard</span>
          </Button>
          <Button variant="ghost" className="flex items-center gap-2">
            <Calendar size={18} />
            <span>Calendar</span>
          </Button>
          <Button variant="ghost" className="flex items-center gap-2">
            <Sprout size={18} />
            <span>Plants</span>
          </Button>
          <Button variant="ghost" className="flex items-center gap-2">
            <Sun size={18} />
            <span>Weather</span>
          </Button>
          <Button 
            onClick={onAddTask} 
            className="bg-garden-green hover:bg-garden-green-dark text-white"
          >
            <Plus size={18} className="mr-1" />
            Add Task
          </Button>
        </div>
        
        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center">
          <Button 
            onClick={onAddTask} 
            className="mr-2 bg-garden-green hover:bg-garden-green-dark text-white p-2"
            size="icon"
          >
            <Plus size={20} />
          </Button>
          
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <Menu size={24} />
          </Button>
        </div>
      </div>
      
      {/* Mobile Menu Dropdown */}
      {isMenuOpen && (
        <div className="md:hidden container mx-auto mt-2 bg-white/95 shadow-md rounded-md overflow-hidden">
          <div className="flex flex-col">
            <Button variant="ghost" className="justify-start py-3">
              <Home size={18} className="mr-2" />
              <span>Dashboard</span>
            </Button>
            <Button variant="ghost" className="justify-start py-3">
              <Calendar size={18} className="mr-2" />
              <span>Calendar</span>
            </Button>
            <Button variant="ghost" className="justify-start py-3">
              <Sprout size={18} className="mr-2" />
              <span>Plants</span>
            </Button>
            <Button variant="ghost" className="justify-start py-3">
              <Sun size={18} className="mr-2" />
              <span>Weather</span>
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
