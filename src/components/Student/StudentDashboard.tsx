
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ShoppingCart, QrCode, Clock, Star, Wallet, BookOpen } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

interface MenuItem {
  id: string;
  name: string;
  price: number;
  category: string;
  image: string;
  rating: number;
  description: string;
  available: boolean;
}

const StudentDashboard = () => {
  const { user } = useAuth();
  const [cart, setCart] = useState<MenuItem[]>([]);
  
  const menuItems: MenuItem[] = [
    {
      id: '1',
      name: 'Veg Thali',
      price: 80,
      category: 'Main Course',
      image: '🍛',
      rating: 4.5,
      description: 'Complete meal with rice, dal, vegetables, roti, and dessert',
      available: true
    },
    {
      id: '2',
      name: 'Chicken Biryani',
      price: 120,
      category: 'Main Course',
      image: '🍗',
      rating: 4.8,
      description: 'Aromatic basmati rice with tender chicken pieces',
      available: true
    },
    {
      id: '3',
      name: 'Masala Dosa',
      price: 60,
      category: 'South Indian',
      image: '🥞',
      rating: 4.3,
      description: 'Crispy dosa with spiced potato filling',
      available: true
    },
    {
      id: '4',
      name: 'Fresh Lime Soda',
      price: 25,
      category: 'Beverages',
      image: '🥤',
      rating: 4.1,
      description: 'Refreshing lime soda with mint',
      available: true
    }
  ];

  const addToCart = (item: MenuItem) => {
    setCart([...cart, item]);
    toast.success(`${item.name} added to cart`);
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + item.price, 0);
  };

  const handlePayment = () => {
    if (cart.length === 0) {
      toast.error('Your cart is empty');
      return;
    }
    
    const total = getTotalPrice();
    if (user?.wallet && user.wallet >= total) {
      toast.success(`Payment successful! ₹${total} deducted from wallet`);
      setCart([]);
    } else {
      toast.error('Insufficient wallet balance');
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-gradient-to-r from-primary to-primary/80 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/80">Wallet Balance</p>
                <p className="text-2xl font-bold">₹{user?.wallet}</p>
              </div>
              <Wallet className="w-8 h-8" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-r from-secondary to-secondary/80 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/80">Cart Items</p>
                <p className="text-2xl font-bold">{cart.length}</p>
              </div>
              <ShoppingCart className="w-8 h-8" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/80">Today's Orders</p>
                <p className="text-2xl font-bold">2</p>
              </div>
              <BookOpen className="w-8 h-8" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="menu" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="menu">Menu</TabsTrigger>
          <TabsTrigger value="cart">Cart ({cart.length})</TabsTrigger>
          <TabsTrigger value="orders">My Orders</TabsTrigger>
        </TabsList>
        
        <TabsContent value="menu" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {menuItems.map((item) => (
              <Card key={item.id} className="hover:shadow-lg transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="text-3xl">{item.image}</div>
                    <Badge variant="secondary">{item.category}</Badge>
                  </div>
                  <CardTitle className="text-lg">{item.name}</CardTitle>
                  <CardDescription>{item.description}</CardDescription>
                </CardHeader>
                
                <CardContent>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm text-gray-600">{item.rating}</span>
                    </div>
                    <span className="text-lg font-bold text-primary">₹{item.price}</span>
                  </div>
                  
                  <Button 
                    onClick={() => addToCart(item)}
                    className="w-full"
                    disabled={!item.available}
                  >
                    Add to Cart
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="cart" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Your Cart</CardTitle>
              <CardDescription>Review your items before checkout</CardDescription>
            </CardHeader>
            
            <CardContent>
              {cart.length === 0 ? (
                <p className="text-center text-gray-500 py-8">Your cart is empty</p>
              ) : (
                <div className="space-y-4">
                  {cart.map((item, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center space-x-3">
                        <span className="text-2xl">{item.image}</span>
                        <div>
                          <h4 className="font-medium">{item.name}</h4>
                          <p className="text-sm text-gray-600">{item.category}</p>
                        </div>
                      </div>
                      <span className="font-bold text-primary">₹{item.price}</span>
                    </div>
                  ))}
                  
                  <div className="border-t pt-4">
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-lg font-bold">Total: ₹{getTotalPrice()}</span>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <Button variant="outline" className="flex items-center space-x-2">
                        <QrCode className="w-4 h-4" />
                        <span>QR Pay</span>
                      </Button>
                      <Button onClick={handlePayment} className="flex items-center space-x-2">
                        <Wallet className="w-4 h-4" />
                        <span>Pay from Wallet</span>
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="orders" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Order History</CardTitle>
              <CardDescription>Your recent orders</CardDescription>
            </CardHeader>
            
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <h4 className="font-medium">Veg Thali + Fresh Lime Soda</h4>
                    <p className="text-sm text-gray-600">Today, 12:30 PM</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold">₹105</p>
                    <Badge variant="default">Completed</Badge>
                  </div>
                </div>
                
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <h4 className="font-medium">Chicken Biryani</h4>
                    <p className="text-sm text-gray-600">Yesterday, 1:15 PM</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold">₹120</p>
                    <Badge variant="default">Completed</Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default StudentDashboard;
