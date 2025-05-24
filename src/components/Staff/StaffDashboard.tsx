
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Clock, CheckCircle, XCircle, Package, TrendingUp, Users } from 'lucide-react';
import { toast } from 'sonner';

interface Order {
  id: string;
  customerName: string;
  items: string[];
  total: number;
  status: 'pending' | 'preparing' | 'ready' | 'completed';
  orderTime: string;
}

const StaffDashboard = () => {
  const [orders, setOrders] = useState<Order[]>([
    {
      id: 'ORD001',
      customerName: 'John Doe',
      items: ['Veg Thali', 'Fresh Lime Soda'],
      total: 105,
      status: 'pending',
      orderTime: '12:30 PM'
    },
    {
      id: 'ORD002',
      customerName: 'Jane Smith',
      items: ['Chicken Biryani'],
      total: 120,
      status: 'preparing',
      orderTime: '12:35 PM'
    },
    {
      id: 'ORD003',
      customerName: 'Mike Johnson',
      items: ['Masala Dosa', 'Coffee'],
      total: 85,
      status: 'ready',
      orderTime: '12:25 PM'
    }
  ]);

  const updateOrderStatus = (orderId: string, newStatus: Order['status']) => {
    setOrders(orders.map(order => 
      order.id === orderId ? { ...order, status: newStatus } : order
    ));
    toast.success(`Order ${orderId} marked as ${newStatus}`);
  };

  const getStatusColor = (status: Order['status']) => {
    switch (status) {
      case 'pending': return 'bg-yellow-500';
      case 'preparing': return 'bg-blue-500';
      case 'ready': return 'bg-green-500';
      case 'completed': return 'bg-gray-500';
      default: return 'bg-gray-500';
    }
  };

  const pendingOrders = orders.filter(order => order.status === 'pending').length;
  const preparingOrders = orders.filter(order => order.status === 'preparing').length;
  const readyOrders = orders.filter(order => order.status === 'ready').length;

  return (
    <div className="p-6 space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/80">Pending Orders</p>
                <p className="text-2xl font-bold">{pendingOrders}</p>
              </div>
              <Clock className="w-8 h-8" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/80">Preparing</p>
                <p className="text-2xl font-bold">{preparingOrders}</p>
              </div>
              <Package className="w-8 h-8" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/80">Ready</p>
                <p className="text-2xl font-bold">{readyOrders}</p>
              </div>
              <CheckCircle className="w-8 h-8" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/80">Total Revenue</p>
                <p className="text-2xl font-bold">₹2,450</p>
              </div>
              <TrendingUp className="w-8 h-8" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="orders" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="orders">Order Management</TabsTrigger>
          <TabsTrigger value="inventory">Inventory</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>
        
        <TabsContent value="orders" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Live Orders</CardTitle>
              <CardDescription>Manage incoming orders and update their status</CardDescription>
            </CardHeader>
            
            <CardContent>
              <div className="space-y-4">
                {orders.map((order) => (
                  <div key={order.id} className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h4 className="font-medium">{order.id}</h4>
                        <p className="text-sm text-gray-600">{order.customerName} • {order.orderTime}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge className={`${getStatusColor(order.status)} text-white`}>
                          {order.status.toUpperCase()}
                        </Badge>
                        <span className="font-bold">₹{order.total}</span>
                      </div>
                    </div>
                    
                    <div className="mb-3">
                      <p className="text-sm text-gray-600">Items: {order.items.join(', ')}</p>
                    </div>
                    
                    <div className="flex space-x-2">
                      {order.status === 'pending' && (
                        <Button 
                          size="sm" 
                          onClick={() => updateOrderStatus(order.id, 'preparing')}
                          className="bg-blue-500 hover:bg-blue-600"
                        >
                          Start Preparing
                        </Button>
                      )}
                      {order.status === 'preparing' && (
                        <Button 
                          size="sm" 
                          onClick={() => updateOrderStatus(order.id, 'ready')}
                          className="bg-green-500 hover:bg-green-600"
                        >
                          Mark Ready
                        </Button>
                      )}
                      {order.status === 'ready' && (
                        <Button 
                          size="sm" 
                          onClick={() => updateOrderStatus(order.id, 'completed')}
                          variant="outline"
                        >
                          Complete Order
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="inventory" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Inventory Status</CardTitle>
              <CardDescription>Monitor stock levels and ingredients</CardDescription>
            </CardHeader>
            
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {[
                  { item: 'Rice', quantity: 50, unit: 'kg', status: 'high' },
                  { item: 'Chicken', quantity: 8, unit: 'kg', status: 'low' },
                  { item: 'Vegetables', quantity: 25, unit: 'kg', status: 'medium' },
                  { item: 'Dal', quantity: 15, unit: 'kg', status: 'medium' },
                  { item: 'Oil', quantity: 3, unit: 'liters', status: 'low' },
                  { item: 'Spices', quantity: 100, unit: 'packets', status: 'high' }
                ].map((item, index) => (
                  <div key={index} className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium">{item.item}</h4>
                      <Badge variant={item.status === 'high' ? 'default' : item.status === 'medium' ? 'secondary' : 'destructive'}>
                        {item.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600">{item.quantity} {item.unit}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="analytics" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Today's Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span>Total Orders</span>
                    <span className="font-bold">24</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Revenue</span>
                    <span className="font-bold">₹2,450</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Average Order Value</span>
                    <span className="font-bold">₹102</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Peak Hour</span>
                    <span className="font-bold">12:30 - 1:30 PM</span>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Popular Items</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    { name: 'Veg Thali', orders: 8 },
                    { name: 'Chicken Biryani', orders: 6 },
                    { name: 'Masala Dosa', orders: 5 },
                    { name: 'Fresh Lime Soda', orders: 4 }
                  ].map((item, index) => (
                    <div key={index} className="flex justify-between items-center">
                      <span>{item.name}</span>
                      <Badge variant="outline">{item.orders} orders</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default StaffDashboard;
