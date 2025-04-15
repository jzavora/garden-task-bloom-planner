import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { 
  Calendar, 
  Leaf, 
  Menu, 
  Plus, 
  Sprout,
  Home,
  Sun,
  LogOut
} from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';

interface NavbarProps {
  onAddTask: () => void;
}

const Navbar = ({ onAddTask }: NavbarProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const { user, signOut } = useAuth();

  return (
    <nav className="sticky top-0 z-10 bg-white/80 backdrop-blur-sm border-b border-garden-green/20 px-4 py-3">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Leaf className="h-6 w-6 text-garden-green animate-leaf-sway" />
          <h1 className="font-bold text-xl text-garden-green-dark">Bloom Planner</h1>
        </div>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-4">
          {user ? (
            <>
              <Button 
                variant="ghost" 
                className="flex items-center gap-2"
                asChild
              >
                <Link to="/">
                  <Home size={18} />
                  <span>Dashboard</span>
                </Link>
              </Button>
              <Button 
                variant="ghost" 
                className={`flex items-center gap-2 ${location.pathname === '/calendar' ? 'bg-garden-green/10' : ''}`} 
                asChild
              >
                <Link to="/calendar">
                  <Calendar size={18} />
                  <span>Calendar</span>
                </Link>
              </Button>
              <Button 
                variant="ghost" 
                className={`flex items-center gap-2 ${location.pathname === '/plants' ? 'bg-garden-green/10' : ''}`}
                asChild
              >
                <Link to="/plants">
                  <Sprout size={18} />
                  <span>Plants</span>
                </Link>
              </Button>
              <Button 
                variant="ghost" 
                className={`flex items-center gap-2 ${location.pathname === '/weather' ? 'bg-garden-green/10' : ''}`}
                asChild
              >
                <Link to="/weather">
                  <Sun size={18} />
                  <span>Weather</span>
                </Link>
              </Button>
              <Button 
                onClick={signOut} 
                variant="ghost"
                className="flex items-center gap-2"
              >
                <LogOut size={18} />
                <span>Sign Out</span>
              </Button>
            </>
          ) : (
            <Button 
              variant="ghost" 
              className="flex items-center gap-2"
              asChild
            >
              <Link to="/auth">Sign In</Link>
            </Button>
          )}
        </div>
        
        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center">
          {user && (
            <Button 
              onClick={onAddTask} 
              className="mr-2 bg-garden-green hover:bg-garden-green-dark text-white p-2"
              size="icon"
            >
              <Plus size={20} />
            </Button>
          )}
          
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
            <Button variant="ghost" className="justify-start py-3" asChild>
              <Link to="/">
                <Home size={18} className="mr-2" />
                <span>Dashboard</span>
              </Link>
            </Button>
            <Button variant="ghost" className="justify-start py-3" asChild>
              <Link to="/calendar">
                <Calendar size={18} className="mr-2" />
                <span>Calendar</span>
              </Link>
            </Button>
            <Button variant="ghost" className="justify-start py-3" asChild>
              <Link to="/plants">
                <Sprout size={18} className="mr-2" />
                <span>Plants</span>
              </Link>
            </Button>
            <Button variant="ghost" className="justify-start py-3" asChild>
              <Link to="/weather">
                <Sun size={18} className="mr-2" />
                <span>Weather</span>
              </Link>
            </Button>
            {user ? (
              <Button 
                variant="ghost" 
                className="justify-start py-3"
                onClick={signOut}
              >
                <LogOut size={18} className="mr-2" />
                <span>Sign Out</span>
              </Button>
            ) : (
              <Button variant="ghost" className="justify-start py-3" asChild>
                <Link to="/auth">
                  <LogOut size={18} className="mr-2" />
                  <span>Sign In</span>
                </Link>
              </Button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
