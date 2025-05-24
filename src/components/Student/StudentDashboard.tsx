import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ShoppingCart, QrCode, Clock, Star, Wallet, BookOpen, Plus, Minus, Filter, Search, MapPin, Truck, Shield, Award } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';
import { Input } from '@/components/ui/input';
import QRScanner from './QRScanner';

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
  originalPrice?: number;
  discount?: number;
}

const StudentDashboard = () => {
  const { user } = useAuth();
  const [cart, setCart] = useState<MenuItem[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [showQRScanner, setShowQRScanner] = useState(false);
  
  const menuItems: MenuItem[] = [
    {
      id: '1',
      name: 'Royal Veg Thali',
      price: 80,
      originalPrice: 100,
      discount: 20,
      category: 'Main Course',
      image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400&h=300&fit=crop&crop=center',
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
      originalPrice: 140,
      discount: 14,
      category: 'Main Course',
      image: 'https://images.unsplash.com/photo-1563379091339-03246963d7d3?w=400&h=300&fit=crop&crop=center',
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
      image: 'https://images.unsplash.com/photo-1630383249896-424e482df921?w=400&h=300&fit=crop&crop=center',
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
      image: 'https://images.unsplash.com/photo-1544145945-f90425340c7e?w=400&h=300&fit=crop&crop=center',
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
      originalPrice: 110,
      discount: 14,
      category: 'Main Course',
      image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=400&h=300&fit=crop&crop=center',
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
      image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400&h=300&fit=crop&crop=center',
      rating: 4.4,
      description: 'Authentic South Indian filter coffee with perfect blend of coffee and milk',
      available: true,
      preparationTime: '3-5 min',
      isVeg: true
    },
    {
      id: '7',
      name: 'Chole Bhature',
      price: 70,
      originalPrice: 85,
      discount: 18,
      category: 'North Indian',
      image: 'https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=400&h=300&fit=crop&crop=center',
      rating: 4.4,
      description: 'Spicy chickpea curry served with fluffy deep-fried bread and pickled onions',
      available: true,
      preparationTime: '15-20 min',
      isVeg: true
    },
    {
      id: '8',
      name: 'Margherita Pizza',
      price: 150,
      originalPrice: 180,
      discount: 17,
      category: 'Italian',
      image: 'https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?w=400&h=300&fit=crop&crop=center',
      rating: 4.2,
      description: 'Classic Italian pizza with fresh mozzarella, tomato sauce, and basil leaves',
      available: true,
      preparationTime: '20-25 min',
      isVeg: true
    },
    {
      id: '9',
      name: 'Masala Chai',
      price: 15,
      category: 'Beverages',
      image: 'https://images.unsplash.com/photo-1571934811356-5cc061b6821f?w=400&h=300&fit=crop&crop=center',
      rating: 4.3,
      description: 'Traditional Indian spiced tea brewed with aromatic spices and fresh milk',
      available: true,
      preparationTime: '5-8 min',
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

  const handleQRPayment = (qrData: string) => {
    console.log('QR Payment initiated with data:', qrData);
    
    if (cart.length === 0) {
      toast.error('Your cart is empty');
      return;
    }

    const total = getTotalPrice();
    
    // Simulate QR payment processing
    toast.success(`QR Payment successful! ₹${total} paid via UPI`, {
      description: 'Your order is being prepared',
    });
    setCart([]);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 text-white">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">Campus Canteen</h1>
              <div className="flex items-center space-x-4 text-sm">
                <div className="flex items-center space-x-1">
                  <MapPin className="w-4 h-4" />
                  <span>Main Campus, Block A</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Clock className="w-4 h-4" />
                  <span>Open until 8:00 PM</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Star className="w-4 h-4 fill-current" />
                  <span>4.5 (2.5k+ ratings)</span>
                </div>
              </div>
            </div>
            <div className="text-right">
              <div className="bg-white/20 rounded-lg p-4 backdrop-blur-sm">
                <p className="text-sm opacity-90">Wallet Balance</p>
                <p className="text-2xl font-bold">₹{user?.wallet}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Offers Banner */}
      <div className="bg-gradient-to-r from-green-100 to-green-50 border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Award className="w-5 h-5 text-green-600" />
                <span className="text-green-800 font-medium">20% OFF on orders above ₹200</span>
              </div>
              <div className="flex items-center space-x-2">
                <Truck className="w-5 h-5 text-blue-600" />
                <span className="text-blue-800 font-medium">Free delivery on campus</span>
              </div>
              <div className="flex items-center space-x-2">
                <Shield className="w-5 h-5 text-purple-600" />
                <span className="text-purple-800 font-medium">100% Safe & Hygienic</span>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <ShoppingCart className="w-5 h-5 text-orange-600" />
              <span className="text-orange-800 font-medium">{cart.length} items in cart</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-4">
        <Tabs defaultValue="menu" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 h-12 bg-white border shadow-sm">
            <TabsTrigger value="menu" className="text-sm font-medium">Menu</TabsTrigger>
            <TabsTrigger value="cart" className="text-sm font-medium">Cart ({cart.length})</TabsTrigger>
            <TabsTrigger value="orders" className="text-sm font-medium">My Orders</TabsTrigger>
          </TabsList>
          
          <TabsContent value="menu" className="space-y-6">
            {/* Search and Filter */}
            <div className="sticky top-0 z-10 bg-gray-50 pb-4">
              <Card className="border-0 shadow-md bg-white">
                <CardContent className="p-4">
                  <div className="flex flex-col md:flex-row gap-4">
                    <div className="relative flex-1">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <Input
                        placeholder="Search for dishes, cuisines..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10 h-11 border-gray-200 focus:border-orange-500 bg-gray-50"
                      />
                    </div>
                    <Button variant="outline" size="sm" className="h-11 px-4 border-gray-200">
                      <Filter className="w-4 h-4 mr-2" />
                      Filters
                    </Button>
                  </div>
                  
                  {/* Category Pills */}
                  <div className="flex gap-2 mt-4 overflow-x-auto pb-2">
                    {categories.map((category) => (
                      <Button
                        key={category}
                        variant={selectedCategory === category ? "default" : "outline"}
                        size="sm"
                        onClick={() => setSelectedCategory(category)}
                        className={`h-9 px-4 whitespace-nowrap rounded-full ${
                          selectedCategory === category 
                            ? "bg-orange-500 hover:bg-orange-600 text-white" 
                            : "border-gray-200 hover:border-orange-300"
                        }`}
                      >
                        {category}
                      </Button>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Menu Items List */}
            <div className="space-y-4">
              {filteredItems.map((item) => (
                <Card key={item.id} className="group hover:shadow-lg transition-all duration-300 border-0 shadow-sm overflow-hidden bg-white">
                  <CardContent className="p-0">
                    <div className="flex">
                      {/* Item Details */}
                      <div className="flex-1 p-4">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-2">
                              <div className={`w-3 h-3 rounded-sm ${item.isVeg ? 'bg-green-500' : 'bg-red-500'} flex items-center justify-center`}>
                                <div className={`w-1.5 h-1.5 rounded-full ${item.isVeg ? 'bg-green-600' : 'bg-red-600'}`} />
                              </div>
                              <Badge variant="outline" className="text-xs bg-orange-50 text-orange-700 border-orange-200">
                                Bestseller
                              </Badge>
                            </div>
                            
                            <h3 className="text-lg font-bold text-gray-800 mb-1">{item.name}</h3>
                            
                            <div className="flex items-center space-x-4 mb-2">
                              <div className="flex items-center space-x-1">
                                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                <span className="text-sm font-medium text-gray-700">{item.rating}</span>
                                <span className="text-xs text-gray-500">({Math.floor(Math.random() * 500) + 100})</span>
                              </div>
                              <div className="flex items-center space-x-1 text-gray-500">
                                <Clock className="w-4 h-4" />
                                <span className="text-xs">{item.preparationTime}</span>
                              </div>
                            </div>

                            <p className="text-sm text-gray-600 mb-3 line-clamp-2">{item.description}</p>
                            
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-2">
                                <span className="text-lg font-bold text-gray-800">₹{item.price}</span>
                                {item.originalPrice && (
                                  <>
                                    <span className="text-sm text-gray-400 line-through">₹{item.originalPrice}</span>
                                    <Badge className="bg-green-100 text-green-700 text-xs px-1.5 py-0.5">
                                      {item.discount}% OFF
                                    </Badge>
                                  </>
                                )}
                              </div>
                              
                              <Button 
                                onClick={() => addToCart(item)}
                                className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-lg font-medium transition-all duration-200 hover:shadow-md"
                                disabled={!item.available}
                              >
                                ADD
                              </Button>
                            </div>
                          </div>
                          
                          {/* Item Image */}
                          <div className="relative ml-4">
                            <div className="w-32 h-32 rounded-lg overflow-hidden">
                              <img 
                                src={item.image} 
                                alt={item.name}
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                              />
                            </div>
                            {item.discount && (
                              <div className="absolute -top-2 -left-2 bg-yellow-400 text-yellow-900 text-xs font-bold px-2 py-1 rounded-full">
                                {item.discount}% OFF
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="cart" className="space-y-6">
            <Card className="border-0 shadow-lg">
              <CardHeader className="bg-gradient-to-r from-orange-50 to-red-50">
                <CardTitle className="text-2xl font-bold text-gray-800">Your Cart</CardTitle>
                <CardDescription className="text-gray-600">Review your items before checkout</CardDescription>
              </CardHeader>
              
              <CardContent className="p-6">
                {cart.length === 0 ? (
                  <div className="text-center py-12">
                    <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <ShoppingCart className="w-12 h-12 text-gray-400" />
                    </div>
                    <p className="text-xl text-gray-500 mb-2">Your cart is empty</p>
                    <p className="text-gray-400">Add some delicious items from our menu!</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {cart.map((item, index) => (
                      <div key={index} className="flex items-center justify-between p-4 border border-gray-100 rounded-xl hover:shadow-md transition-shadow bg-gray-50/50">
                        <div className="flex items-center space-x-4">
                          <div className="w-16 h-16 rounded-lg overflow-hidden">
                            <img 
                              src={item.image} 
                              alt={item.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div>
                            <div className="flex items-center space-x-2 mb-1">
                              <div className={`w-3 h-3 rounded-sm ${item.isVeg ? 'bg-green-500' : 'bg-red-500'} flex items-center justify-center`}>
                                <div className={`w-1.5 h-1.5 rounded-full ${item.isVeg ? 'bg-green-600' : 'bg-red-600'}`} />
                              </div>
                              <h4 className="font-semibold text-gray-800">{item.name}</h4>
                            </div>
                            <div className="flex items-center space-x-2 text-sm text-gray-500">
                              <span>{item.category}</span>
                              <span>•</span>
                              <span>{item.preparationTime}</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3">
                          <span className="font-bold text-lg text-orange-600">₹{item.price}</span>
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
                      <div className="bg-gradient-to-r from-orange-50 to-red-50 p-6 rounded-xl mb-6">
                        <div className="flex justify-between items-center mb-4">
                          <span className="text-xl font-bold text-gray-800">Total Amount</span>
                          <span className="text-2xl font-bold text-orange-600">₹{getTotalPrice()}</span>
                        </div>
                        <div className="text-sm text-gray-600">
                          <p>Items: {cart.length} • Estimated time: 15-30 min • Free delivery</p>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Button 
                          variant="outline" 
                          onClick={() => setShowQRScanner(true)}
                          disabled={cart.length === 0}
                          className="h-12 flex items-center justify-center space-x-2 border-2 border-orange-200 text-orange-600 hover:bg-orange-50"
                        >
                          <QrCode className="w-5 h-5" />
                          <span className="font-medium">Scan & Pay</span>
                        </Button>
                        <Button 
                          onClick={handlePayment} 
                          disabled={cart.length === 0}
                          className="h-12 bg-orange-500 hover:bg-orange-600 flex items-center justify-center space-x-2 text-white"
                        >
                          <Wallet className="w-5 h-5" />
                          <span className="font-medium">Pay ₹{getTotalPrice()}</span>
                        </Button>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* QR Scanner Dialog */}
            <QRScanner
              isOpen={showQRScanner}
              onClose={() => setShowQRScanner(false)}
              onSuccess={handleQRPayment}
              totalAmount={getTotalPrice()}
            />
          </TabsContent>
          
          <TabsContent value="orders" className="space-y-4">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl font-bold">Order History</CardTitle>
                <CardDescription>Your recent orders from Campus Canteen</CardDescription>
              </CardHeader>
              
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 border border-gray-100 rounded-lg hover:shadow-md transition-shadow">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                        <BookOpen className="w-6 h-6 text-green-600" />
                      </div>
                      <div>
                        <h4 className="font-medium">Royal Veg Thali + Fresh Lime Soda</h4>
                        <p className="text-sm text-gray-600">Today, 12:30 PM • Order #1234</p>
                        <div className="flex items-center space-x-1 mt-1">
                          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          <span className="text-sm text-gray-600">Rate this order</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-lg">₹105</p>
                      <Badge className="bg-green-100 text-green-700">Delivered</Badge>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between p-4 border border-gray-100 rounded-lg hover:shadow-md transition-shadow">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                        <BookOpen className="w-6 h-6 text-blue-600" />
                      </div>
                      <div>
                        <h4 className="font-medium">Chicken Biryani</h4>
                        <p className="text-sm text-gray-600">Yesterday, 1:15 PM • Order #1233</p>
                        <div className="flex items-center space-x-1 mt-1">
                          <div className="flex">
                            {[1,2,3,4,5].map((star) => (
                              <Star key={star} className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                            ))}
                          </div>
                          <span className="text-xs text-gray-500 ml-1">Rated 5.0</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-lg">₹120</p>
                      <Badge className="bg-green-100 text-green-700">Delivered</Badge>
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
