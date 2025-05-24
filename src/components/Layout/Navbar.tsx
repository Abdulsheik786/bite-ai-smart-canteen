
import React from 'react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { LogOut, Wallet, User, Bell } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <nav className="bg-white/95 backdrop-blur-md border-b border-gray-200/50 px-4 py-3 shadow-sm sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-6">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center">
              <span className="text-white font-bold text-lg">EB</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Eazy-Bite
              </h1>
              <p className="text-xs text-gray-500 -mt-1">Smart Canteen</p>
            </div>
          </div>
          <div className="hidden md:block">
            <Badge variant="outline" className="text-xs font-medium capitalize bg-primary/5 text-primary border-primary/20">
              {user?.role} Portal
            </Badge>
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          {user?.wallet !== undefined && (
            <div className="flex items-center space-x-2 bg-gradient-to-r from-secondary/10 to-primary/10 px-4 py-2 rounded-full border border-secondary/20">
              <Wallet className="w-4 h-4 text-secondary" />
              <span className="text-sm font-semibold text-gray-700">₹{user.wallet}</span>
              <Badge className="bg-secondary text-white text-xs px-2 py-0.5 ml-1">
                Active
              </Badge>
            </div>
          )}
          
          <Button variant="ghost" size="sm" className="relative">
            <Bell className="w-4 h-4" />
            <Badge className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-4 h-4 p-0 flex items-center justify-center">
              2
            </Badge>
          </Button>
          
          <div className="flex items-center space-x-3 bg-gray-50 px-3 py-2 rounded-full">
            <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center">
              <User className="w-4 h-4 text-white" />
            </div>
            <div className="hidden md:block">
              <p className="text-sm font-medium text-gray-700">{user?.name}</p>
              <p className="text-xs text-gray-500 -mt-0.5 capitalize">{user?.role}</p>
            </div>
          </div>
          
          <Button 
            variant="outline" 
            size="sm" 
            onClick={logout}
            className="flex items-center space-x-2 border-red-200 text-red-600 hover:bg-red-50"
          >
            <LogOut className="w-4 h-4" />
            <span className="hidden md:inline">Logout</span>
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
