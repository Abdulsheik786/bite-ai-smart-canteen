
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { TrendingUp, Users, DollarSign, Package, Star, Clock, AlertTriangle } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, BarChart, Bar, ResponsiveContainer } from 'recharts';

const AdminDashboard = () => {
  const revenueData = [
    { name: 'Mon', revenue: 2400 },
    { name: 'Tue', revenue: 1398 },
    { name: 'Wed', revenue: 9800 },
    { name: 'Thu', revenue: 3908 },
    { name: 'Fri', revenue: 4800 },
    { name: 'Sat', revenue: 3800 },
    { name: 'Sun', revenue: 4300 }
  ];

  const orderData = [
    { hour: '9AM', orders: 5 },
    { hour: '10AM', orders: 8 },
    { hour: '11AM', orders: 12 },
    { hour: '12PM', orders: 25 },
    { hour: '1PM', orders: 32 },
    { hour: '2PM', orders: 18 },
    { hour: '3PM', orders: 15 },
    { hour: '4PM', orders: 10 }
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/80">Total Revenue</p>
                <p className="text-2xl font-bold">₹24,580</p>
                <p className="text-sm text-white/70">+12% from last week</p>
              </div>
              <DollarSign className="w-8 h-8" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/80">Active Users</p>
                <p className="text-2xl font-bold">342</p>
                <p className="text-sm text-white/70">156 students, 12 staff</p>
              </div>
              <Users className="w-8 h-8" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/80">Orders Today</p>
                <p className="text-2xl font-bold">128</p>
                <p className="text-sm text-white/70">Peak: 1-2 PM</p>
              </div>
              <TrendingUp className="w-8 h-8" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-r from-orange-500 to-orange-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/80">Avg Rating</p>
                <p className="text-2xl font-bold">4.6</p>
                <p className="text-sm text-white/70">Based on 89 reviews</p>
              </div>
              <Star className="w-8 h-8" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="analytics" className="space-y-4">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="users">User Management</TabsTrigger>
          <TabsTrigger value="menu">Menu Management</TabsTrigger>
          <TabsTrigger value="feedback">Feedback</TabsTrigger>
          <TabsTrigger value="events">Events</TabsTrigger>
        </TabsList>
        
        <TabsContent value="analytics" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Weekly Revenue</CardTitle>
                <CardDescription>Revenue trends over the past week</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={revenueData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="revenue" stroke="#FF6B35" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Hourly Orders</CardTitle>
                <CardDescription>Order distribution throughout the day</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={orderData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="hour" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="orders" fill="#4CAF50" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>AI Predictions</CardTitle>
              <CardDescription>Smart insights for better management</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 bg-blue-50 rounded-lg">
                  <h4 className="font-medium text-blue-900">Peak Hour Prediction</h4>
                  <p className="text-sm text-blue-700 mt-1">Expected rush at 12:30-1:30 PM tomorrow</p>
                  <p className="text-xs text-blue-600 mt-2">Confidence: 87%</p>
                </div>
                
                <div className="p-4 bg-green-50 rounded-lg">
                  <h4 className="font-medium text-green-900">Demand Forecast</h4>
                  <p className="text-sm text-green-700 mt-1">High demand expected for Chicken Biryani</p>
                  <p className="text-xs text-green-600 mt-2">Prepare 15% more stock</p>
                </div>
                
                <div className="p-4 bg-orange-50 rounded-lg">
                  <h4 className="font-medium text-orange-900">Stock Alert</h4>
                  <p className="text-sm text-orange-700 mt-1">Chicken stock running low</p>
                  <p className="text-xs text-orange-600 mt-2">Reorder by tomorrow</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="users" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>User Overview</CardTitle>
              <CardDescription>Manage registered users and their roles</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { name: 'John Doe', email: 'john@university.edu', role: 'student', status: 'active', wallet: 250 },
                  { name: 'Jane Smith', email: 'jane@university.edu', role: 'student', status: 'active', wallet: 180 },
                  { name: 'Mike Wilson', email: 'mike@university.edu', role: 'staff', status: 'active', wallet: null },
                  { name: 'Sarah Davis', email: 'sarah@university.edu', role: 'student', status: 'inactive', wallet: 50 }
                ].map((user, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h4 className="font-medium">{user.name}</h4>
                      <p className="text-sm text-gray-600">{user.email}</p>
                    </div>
                    <div className="flex items-center space-x-4">
                      <Badge variant={user.role === 'staff' ? 'secondary' : 'default'}>
                        {user.role}
                      </Badge>
                      {user.wallet && (
                        <span className="text-sm text-gray-600">₹{user.wallet}</span>
                      )}
                      <Badge variant={user.status === 'active' ? 'default' : 'destructive'}>
                        {user.status}
                      </Badge>
                      <Button size="sm" variant="outline">Edit</Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="menu" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Menu Items</CardTitle>
              <CardDescription>Manage menu items, prices, and availability</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { name: 'Veg Thali', price: 80, category: 'Main Course', available: true, orders: 45 },
                  { name: 'Chicken Biryani', price: 120, category: 'Main Course', available: true, orders: 38 },
                  { name: 'Masala Dosa', price: 60, category: 'South Indian', available: false, orders: 22 },
                  { name: 'Fresh Lime Soda', price: 25, category: 'Beverages', available: true, orders: 67 }
                ].map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h4 className="font-medium">{item.name}</h4>
                      <p className="text-sm text-gray-600">{item.category} • ₹{item.price}</p>
                    </div>
                    <div className="flex items-center space-x-4">
                      <span className="text-sm text-gray-600">{item.orders} orders today</span>
                      <Badge variant={item.available ? 'default' : 'destructive'}>
                        {item.available ? 'Available' : 'Unavailable'}
                      </Badge>
                      <Button size="sm" variant="outline">Edit</Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="feedback" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Customer Feedback</CardTitle>
              <CardDescription>Reviews and ratings from customers</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { customer: 'Alice Johnson', rating: 5, comment: 'Excellent food quality and quick service!', date: '2 hours ago', item: 'Veg Thali' },
                  { customer: 'Bob Smith', rating: 4, comment: 'Good taste but could be served warmer.', date: '5 hours ago', item: 'Chicken Biryani' },
                  { customer: 'Carol Brown', rating: 3, comment: 'Average experience, room for improvement.', date: '1 day ago', item: 'Masala Dosa' },
                  { customer: 'David Wilson', rating: 5, comment: 'Best canteen food I have had!', date: '2 days ago', item: 'Veg Thali' }
                ].map((feedback, index) => (
                  <div key={index} className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <h4 className="font-medium">{feedback.customer}</h4>
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-4 h-4 ${
                                i < feedback.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                      <span className="text-sm text-gray-500">{feedback.date}</span>
                    </div>
                    <p className="text-sm text-gray-600 mb-1">{feedback.comment}</p>
                    <p className="text-xs text-gray-500">Item: {feedback.item}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="events" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Event Management</CardTitle>
              <CardDescription>Manage special events and catering bookings</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Button className="mb-4">Create New Event</Button>
                
                {[
                  { name: 'Annual Day Catering', date: '2024-02-15', attendees: 150, status: 'confirmed', revenue: 12000 },
                  { name: 'Department Meeting Lunch', date: '2024-02-10', attendees: 25, status: 'pending', revenue: 2000 },
                  { name: 'Sports Day Refreshments', date: '2024-02-20', attendees: 200, status: 'confirmed', revenue: 8000 }
                ].map((event, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h4 className="font-medium">{event.name}</h4>
                      <p className="text-sm text-gray-600">{event.date} • {event.attendees} attendees</p>
                    </div>
                    <div className="flex items-center space-x-4">
                      <span className="text-sm font-medium">₹{event.revenue}</span>
                      <Badge variant={event.status === 'confirmed' ? 'default' : 'secondary'}>
                        {event.status}
                      </Badge>
                      <Button size="sm" variant="outline">Manage</Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminDashboard;
