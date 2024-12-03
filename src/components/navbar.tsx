import { Film, User, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="bg-cyan-700 text-secondary-foreground">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link to="/" className="flex items-center space-x-2">
          <Film className="h-6 w-6" />
          <span className="text-xl font-bold">MovieTracker</span>
        </Link>
        
        <div className="flex items-center space-x-6">
          <Link 
            to="/watchlist" 
            className="flex items-center space-x-1 hover:text-primary"
          >
            <Clock className="h-5 w-5" />
            <span>Watchlist</span>
          </Link>
          
          <Link 
            to="/auth" 
            className="flex items-center space-x-1 hover:text-primary"
          >
            <User className="h-5 w-5" />
            <span>Sign In</span>
          </Link>
        </div>
      </div>
    </nav>
  );
}