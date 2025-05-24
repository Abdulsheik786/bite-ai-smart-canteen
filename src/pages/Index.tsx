
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import LoginForm from '@/components/Auth/LoginForm';
import Navbar from '@/components/Layout/Navbar';
import StudentDashboard from '@/components/Student/StudentDashboard';
import StaffDashboard from '@/components/Staff/StaffDashboard';
import AdminDashboard from '@/components/Admin/AdminDashboard';

const Index = () => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary/10 via-white to-secondary/10 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-primary mb-2">Eazy-Bite</h1>
            <p className="text-gray-600">Smart Canteen Management System</p>
          </div>
          <LoginForm />
        </div>
      </div>
    );
  }

  const renderDashboard = () => {
    switch (user.role) {
      case 'student':
        return <StudentDashboard />;
      case 'staff':
        return <StaffDashboard />;
      case 'admin':
        return <AdminDashboard />;
      default:
        return <div>Invalid role</div>;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="animate-fade-in">
        {renderDashboard()}
      </main>
    </div>
  );
};

export default Index;
