import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ShoppingCart, QrCode, Clock, Star, Wallet, BookOpen, Plus, Minus, Filter, Search } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';
import { Input } from '@/components/ui/input';

interface MenuItem {
  id: string;
  name: string;
  price: number;
  category: string;
  image: string;
  rating: number;
  description: string;
  available: boolean;
  preparationTime: string;
  isVeg: boolean;
}

const StudentDashboard = () => {
  const { user } = useAuth();
  const [cart, setCart] = useState<MenuItem[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  
  const menuItems: MenuItem[] = [
    {
      id: '1',
      name: 'Royal Veg Thali',
      price: 80,
      category: 'Main Course',
      image: '🍛',
      rating: 4.5,
      description: 'Complete nutritious meal with seasonal vegetables, dal, rice, roti, pickle & dessert',
      available: true,
      preparationTime: '15-20 min',
      isVeg: true
    },
    {
      id: '2',
      name: 'Chicken Biryani',
      price: 120,
      category: 'Main Course',
      image: '🍗',
      rating: 4.8,
      description: 'Aromatic basmati rice layered with tender chicken pieces, served with raita & boiled egg',
      available: true,
      preparationTime: '25-30 min',
      isVeg: false
    },
    {
      id: '3',
      name: 'Crispy Masala Dosa',
      price: 60,
      category: 'South Indian',
      image: '🥞',
      rating: 4.3,
      description: 'Golden crispy dosa with spiced potato filling, served with coconut chutney & sambar',
      available: true,
      preparationTime: '10-15 min',
      isVeg: true
    },
    {
      id: '4',
      name: 'Fresh Lime Mint Cooler',
      price: 25,
      category: 'Beverages',
      image: '🥤',
      rating: 4.1,
      description: 'Refreshing lime drink with fresh mint leaves and a hint of black salt',
      available: true,
      preparationTime: '5 min',
      isVeg: true
    },
    {
      id: '5',
      name: 'Paneer Butter Masala',
      price: 95,
      category: 'Main Course',
      image: '🧈',
      rating: 4.6,
      description: 'Rich and creamy paneer curry with aromatic spices, served with rice or roti',
      available: true,
      preparationTime: '20-25 min',
      isVeg: true
    },
    {
      id: '6',
      name: 'Filter Coffee',
      price: 20,
      category: 'Beverages',
      image: '☕',
      rating: 4.4,
      description: 'Authentic South Indian filter coffee with perfect blend of coffee and milk',
      available: true,
      preparationTime: '3-5 min',
      isVeg: true
    }
  ];

  const categories = ['All', ...Array.from(new Set(menuItems.map(item => item.category)))];

  const filteredItems = menuItems.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const addToCart = (item: MenuItem) => {
    setCart([...cart, item]);
    toast.success(`${item.name} added to cart`, {
      description: `₹${item.price} • ${item.preparationTime}`,
    });
  };

  const removeFromCart = (index: number) => {
    const newCart = [...cart];
    const removedItem = newCart.splice(index, 1)[0];
    setCart(newCart);
    toast.info(`${removedItem.name} removed from cart`);
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
      toast.success(`Payment successful! ₹${total} deducted from wallet`, {
        description: 'Your order is being prepared',
      });
      setCart([]);
    } else {
      toast.error('Insufficient wallet balance', {
        description: 'Please add money to your wallet',
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-green-50">
      <div className="p-6 space-y-6 max-w-7xl mx-auto">
        {/* Dashboard Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="bg-gradient-to-br from-primary to-primary/80 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white/90 text-sm font-medium">Wallet Balance</p>
                  <p className="text-3xl font-bold">₹{user?.wallet}</p>
                  <p className="text-white/80 text-xs mt-1">Available for orders</p>
                </div>
                <div className="bg-white/20 p-3 rounded-full">
                  <Wallet className="w-8 h-8" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-br from-secondary to-secondary/80 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white/90 text-sm font-medium">Cart Items</p>
                  <p className="text-3xl font-bold">{cart.length}</p>
                  <p className="text-white/80 text-xs mt-1">Ready to order</p>
                </div>
                <div className="bg-white/20 p-3 rounded-full">
                  <ShoppingCart className="w-8 h-8" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white/90 text-sm font-medium">Today's Orders</p>
                  <p className="text-3xl font-bold">2</p>
                  <p className="text-white/80 text-xs mt-1">Completed orders</p>
                </div>
                <div className="bg-white/20 p-3 rounded-full">
                  <BookOpen className="w-8 h-8" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="menu" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 h-12 bg-white border shadow-sm">
            <TabsTrigger value="menu" className="text-sm font-medium">Menu</TabsTrigger>
            <TabsTrigger value="cart" className="text-sm font-medium">Cart ({cart.length})</TabsTrigger>
            <TabsTrigger value="orders" className="text-sm font-medium">My Orders</TabsTrigger>
          </TabsList>
          
          <TabsContent value="menu" className="space-y-6">
            {/* Search and Filter */}
            <Card className="border-0 shadow-sm">
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      placeholder="Search delicious food..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 h-11 border-gray-200 focus:border-primary"
                    />
                  </div>
                  <div className="flex gap-2 flex-wrap">
                    {categories.map((category) => (
                      <Button
                        key={category}
                        variant={selectedCategory === category ? "default" : "outline"}
                        size="sm"
                        onClick={() => setSelectedCategory(category)}
                        className="h-11 px-4"
                      >
                        {category}
                      </Button>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Menu Items Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredItems.map((item) => (
                <Card key={item.id} className="group hover:shadow-2xl transition-all duration-300 border-0 shadow-md overflow-hidden bg-white">
                  <div className="relative">
                    <div className="h-48 bg-gradient-to-br from-orange-100 to-green-100 flex items-center justify-center">
                      <span className="text-6xl group-hover:scale-110 transition-transform duration-300">{item.image}</span>
                    </div>
                    <div className="absolute top-4 left-4">
                      <Badge variant={item.isVeg ? "secondary" : "destructive"} className="text-xs font-medium">
                        {item.isVeg ? "VEG" : "NON-VEG"}
                      </Badge>
                    </div>
                    <div className="absolute top-4 right-4">
                      <Badge variant="outline" className="bg-white/90 text-xs">
                        {item.category}
                      </Badge>
                    </div>
                  </div>
                  
                  <CardHeader className="pb-3">
                    <div className="space-y-2">
                      <CardTitle className="text-xl font-bold text-gray-800 group-hover:text-primary transition-colors">
                        {item.name}
                      </CardTitle>
                      <CardDescription className="text-sm text-gray-600 line-clamp-2">
                        {item.description}
                      </CardDescription>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="pt-0">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-1">
                          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          <span className="text-sm font-medium text-gray-700">{item.rating}</span>
                          <span className="text-xs text-gray-500">({Math.floor(Math.random() * 100) + 20} reviews)</span>
                        </div>
                        <div className="flex items-center space-x-1 text-gray-500">
                          <Clock className="w-4 h-4" />
                          <span className="text-xs">{item.preparationTime}</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <span className="text-2xl font-bold text-primary">₹{item.price}</span>
                        <Button 
                          onClick={() => addToCart(item)}
                          className="bg-primary hover:bg-primary/90 text-white px-6 py-2 rounded-full font-medium transition-all duration-200 hover:shadow-lg"
                          disabled={!item.available}
                        >
                          <Plus className="w-4 h-4 mr-1" />
                          Add to Cart
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="cart" className="space-y-6">
            <Card className="border-0 shadow-lg">
              <CardHeader className="bg-gradient-to-r from-primary/5 to-secondary/5">
                <CardTitle className="text-2xl font-bold text-gray-800">Your Cart</CardTitle>
                <CardDescription className="text-gray-600">Review your items before checkout</CardDescription>
              </CardHeader>
              
              <CardContent className="p-6">
                {cart.length === 0 ? (
                  <div className="text-center py-12">
                    <ShoppingCart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <p className="text-xl text-gray-500 mb-2">Your cart is empty</p>
                    <p className="text-gray-400">Add some delicious items from our menu!</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {cart.map((item, index) => (
                      <div key={index} className="flex items-center justify-between p-4 border border-gray-100 rounded-xl hover:shadow-md transition-shadow bg-gray-50/50">
                        <div className="flex items-center space-x-4">
                          <div className="w-12 h-12 bg-gradient-to-br from-orange-100 to-green-100 rounded-lg flex items-center justify-center">
                            <span className="text-2xl">{item.image}</span>
                          </div>
                          <div>
                            <h4 className="font-semibold text-gray-800">{item.name}</h4>
                            <div className="flex items-center space-x-2 text-sm text-gray-500">
                              <span>{item.category}</span>
                              <span>•</span>
                              <span>{item.preparationTime}</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3">
                          <span className="font-bold text-lg text-primary">₹{item.price}</span>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => removeFromCart(index)}
                            className="h-8 w-8 p-0 border-red-200 text-red-500 hover:bg-red-50"
                          >
                            <Minus className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                    
                    <div className="border-t pt-6 mt-6">
                      <div className="bg-gradient-to-r from-primary/10 to-secondary/10 p-4 rounded-xl mb-6">
                        <div className="flex justify-between items-center mb-4">
                          <span className="text-xl font-bold text-gray-800">Total Amount</span>
                          <span className="text-2xl font-bold text-primary">₹{getTotalPrice()}</span>
                        </div>
                        <div className="text-sm text-gray-600">
                          <p>Items: {cart.length} • Estimated time: 15-30 min</p>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Button variant="outline" className="h-12 flex items-center justify-center space-x-2 border-2">
                          <QrCode className="w-5 h-5" />
                          <span className="font-medium">Scan & Pay</span>
                        </Button>
                        <Button onClick={handlePayment} className="h-12 bg-primary hover:bg-primary/90 flex items-center justify-center space-x-2">
                          <Wallet className="w-5 h-5" />
                          <span className="font-medium">Pay from Wallet</span>
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
    </div>
  );
};

export default StudentDashboard;
