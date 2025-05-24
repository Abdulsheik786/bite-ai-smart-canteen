
import React from 'react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { LogOut, Wallet, User } from 'lucide-react';

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <nav className="bg-white border-b border-gray-200 px-4 py-3 shadow-sm">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <h1 className="text-2xl font-bold text-primary">Eazy-Bite</h1>
          <span className="text-sm text-gray-500 capitalize">
            {user?.role} Dashboard
          </span>
        </div>
        
        <div className="flex items-center space-x-4">
          {user?.wallet !== undefined && (
            <div className="flex items-center space-x-2 bg-secondary/10 px-3 py-1 rounded-full">
              <Wallet className="w-4 h-4 text-secondary" />
              <span className="text-sm font-medium">₹{user.wallet}</span>
            </div>
          )}
          
          <div className="flex items-center space-x-2">
            <User className="w-4 h-4 text-gray-500" />
            <span className="text-sm text-gray-700">{user?.name}</span>
          </div>
          
          <Button 
            variant="outline" 
            size="sm" 
            onClick={logout}
            className="flex items-center space-x-2"
          >
            <LogOut className="w-4 h-4" />
            <span>Logout</span>
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
