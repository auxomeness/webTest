import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Badge } from "./ui/badge";
import { ShoppingCart, Plus, Minus, Clock, Star, Heart, TrendingUp } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { toast } from "sonner";

interface MenuItem {
  id: string;
  name: string;
  category: string;
  price: number;
  stall: string;
  available: boolean;
  image: string;
  description: string;
  rating: number;
  popular?: boolean;
}

const mockMenuItems: MenuItem[] = [
  {
    id: "1",
    name: "Chicken Adobo Rice",
    category: "Main Course",
    price: 65,
    stall: "Main Canteen",
    available: true,
    image: "https://images.unsplash.com/photo-1622136654976-f11d45582cf7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGlja2VuJTIwYWRvYm8lMjBmaWxpcGlub3xlbnwxfHx8fDE3NjEzMTIwMzh8MA&ixlib=rb-4.1.0&q=80&w=1080",
    description: "Classic Filipino chicken adobo with steamed rice",
    rating: 4.8,
    popular: true
  },
  {
    id: "2",
    name: "Beef Tapa",
    category: "Main Course",
    price: 75,
    stall: "Main Canteen",
    available: true,
    image: "https://images.unsplash.com/photo-1537495988501-f9cd94a78f3e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiZWVmJTIwdGFwYSUyMGZpbGlwaW5vfGVufDF8fHx8MTc2MTMxMjAzOXww&ixlib=rb-4.1.0&q=80&w=1080",
    description: "Tender marinated beef with garlic fried rice",
    rating: 4.9,
    popular: true
  },
  {
    id: "3",
    name: "Pancit Canton",
    category: "Noodles",
    price: 50,
    stall: "Snack House",
    available: true,
    image: "https://images.unsplash.com/photo-1679279726940-be5ce80c632c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwYW5jaXQlMjBjYW50b24lMjBub29kbGVzfGVufDF8fHx8MTc2MTMxMjAzOXww&ixlib=rb-4.1.0&q=80&w=1080",
    description: "Stir-fried noodles with vegetables and meat",
    rating: 4.6
  },
  {
    id: "4",
    name: "Burger Steak",
    category: "Main Course",
    price: 60,
    stall: "Main Canteen",
    available: true,
    image: "https://images.unsplash.com/photo-1600555379885-08a02224726d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXJnZXIlMjBzdGVhayUyMG1lYWx8ZW58MXx8fHwxNzYxMzEyMDQwfDA&ixlib=rb-4.1.0&q=80&w=1080",
    description: "Juicy burger patty with mushroom gravy",
    rating: 4.7,
    popular: true
  },
  {
    id: "5",
    name: "Spaghetti",
    category: "Pasta",
    price: 55,
    stall: "Snack House",
    available: true,
    image: "https://images.unsplash.com/photo-1635264685671-739e75e73e0f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzcGFnaGV0dGklMjBwYXN0YXxlbnwxfHx8fDE3NjEzMTIwNDB8MA&ixlib=rb-4.1.0&q=80&w=1080",
    description: "Filipino-style sweet spaghetti with hotdog",
    rating: 4.5
  },
  {
    id: "6",
    name: "Iced Coffee",
    category: "Beverages",
    price: 45,
    stall: "Coffee Corner",
    available: true,
    image: "https://images.unsplash.com/photo-1684439670717-b1147a7e7534?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpY2VkJTIwY29mZmVlJTIwZHJpbmt8ZW58MXx8fHwxNzYxMTk4NzMzfDA&ixlib=rb-4.1.0&q=80&w=1080",
    description: "Refreshing cold brew coffee with ice",
    rating: 4.7
  },
  {
    id: "7",
    name: "Halo-Halo",
    category: "Desserts",
    price: 50,
    stall: "Snack House",
    available: true,
    image: "https://images.unsplash.com/photo-1516559828984-fb3b99548b21?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYWxvJTIwaGFsbyUyMGRlc3NlcnR8ZW58MXx8fHwxNzYxMzEyMDQxfDA&ixlib=rb-4.1.0&q=80&w=1080",
    description: "Classic Filipino mixed dessert with shaved ice",
    rating: 4.9
  },
  {
    id: "8",
    name: "Bottled Water",
    category: "Beverages",
    price: 20,
    stall: "All Stalls",
    available: true,
    image: "https://images.unsplash.com/photo-1536939459926-301728717817?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxib3R0bGVkJTIwd2F0ZXJ8ZW58MXx8fHwxNzYxMzEyMDQxfDA&ixlib=rb-4.1.0&q=80&w=1080",
    description: "Refreshing purified drinking water",
    rating: 4.3
  },
];

interface CartItem extends MenuItem {
  quantity: number;
}

interface OrderMenuProps {
  onOrderPlaced?: (orderData: any) => void;
}

export function OrderMenu({ onOrderPlaced }: OrderMenuProps) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [paymentMode, setPaymentMode] = useState("");
  const [pickupTime, setPickupTime] = useState("");
  const [selectedStall, setSelectedStall] = useState("all");
  const [favorites, setFavorites] = useState<string[]>([]);

  const toggleFavorite = (itemId: string) => {
    setFavorites(prev =>
      prev.includes(itemId)
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    );
  };

  const addToCart = (item: MenuItem) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(cartItem => cartItem.id === item.id);
      if (existingItem) {
        toast.success(`Added another ${item.name} to cart!`);
        return prevCart.map(cartItem =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      }
      toast.success(`${item.name} added to cart!`);
      return [...prevCart, { ...item, quantity: 1 }];
    });
  };

  const updateQuantity = (id: string, delta: number) => {
    setCart(prevCart => {
      return prevCart
        .map(item =>
          item.id === id
            ? { ...item, quantity: Math.max(0, item.quantity + delta) }
            : item
        )
        .filter(item => item.quantity > 0);
    });
  };

  const totalAmount = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handlePlaceOrder = () => {
    if (cart.length === 0) {
      toast.error("Your cart is empty");
      return;
    }
    if (!paymentMode) {
      toast.error("Please select a payment mode");
      return;
    }
    if (!pickupTime) {
      toast.error("Please select a pickup time");
      return;
    }

    const orderData = {
      orderNumber: `ORD-${Date.now().toString().slice(-6)}`,
      items: cart.map(item => ({
        name: item.name,
        quantity: item.quantity,
        price: item.price,
      })),
      totalAmount,
      paymentMethod: paymentMode,
      pickupTime,
    };

    if (onOrderPlaced) {
      onOrderPlaced(orderData);
    }

    toast.success("Order placed successfully!");
    setCart([]);
    setPaymentMode("");
    setPickupTime("");
  };

  const stalls = ["all", ...Array.from(new Set(mockMenuItems.map(item => item.stall)))];
  const filteredItems = selectedStall === "all"
    ? mockMenuItems
    : mockMenuItems.filter(item => item.stall === selectedStall);

  return (
    <div className="min-h-screen relative overflow-hidden" style={{ backgroundColor: 'aliceblue' }}>
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `radial-gradient(circle at 20% 50%, rgba(33, 141, 209, 0.15) 0%, transparent 50%),
                             radial-gradient(circle at 80% 80%, rgba(0, 63, 102, 0.2) 0%, transparent 50%)`
          }}
        />
        <div
          className="absolute w-[30rem] h-0 top-[10%] -right-[10%] rotate-[-30deg]"
          style={{
            boxShadow: '0 0 500px 10px #003366'
          }}
        />
      </div>

      {/* Hero Section */}
      <div className="relative z-10 gradient-border-box mx-4 mt-6 sm:mx-6 lg:mx-8" style={{ borderRadius: '24px' }}>
        <div className="absolute inset-[3px] bg-gradient-to-r from-[#003366] to-[#084e94] text-white" style={{ borderRadius: '21px' }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
            <div className="text-center">
              <div className="flex flex-wrap justify-center gap-6 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                    <Clock className="w-4 h-4" />
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                    <Star className="w-4 h-4" />
                  </div>
                  <span>Rated 4.8/5</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                    <ShoppingCart className="w-4 h-4" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 relative z-10">
        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            {/* Stall Filter */}
            <div className="bg-white/95 backdrop-blur rounded-xl p-4 shadow-lg border-2 border-[#003366]/20">
              <h3 className="text-sm mb-3" style={{ color: '#003F66', fontWeight: 600 }}>Filter by Stall</h3>
              <div className="flex gap-2 overflow-x-auto pb-2">
                {stalls.map(stall => (
                  <Button
                    key={stall}
                    variant={selectedStall === stall ? "default" : "outline"}
                    onClick={() => setSelectedStall(stall)}
                    className={`whitespace-nowrap rounded-full ${selectedStall === stall
                      ? 'bg-[#003366] hover:bg-[#002A45]'
                      : 'border-[#003366]/30 text-[#003366] hover:bg-[#003366]/10'
                      }`}
                    size="sm"
                  >
                    {stall === "all" ? "All Stalls" : stall}
                  </Button>
                ))}
              </div>
            </div>

            {/* Popular Items Banner */}
            {selectedStall === "all" && (
              <div className="bg-gradient-to-r from-amber-500/15 to-orange-500/15 rounded-xl p-4 border-2 border-amber-300/50 backdrop-blur">
                <div className="flex items-center gap-2 mb-2">
                  <TrendingUp className="w-5 h-5 text-amber-600" />
                  <h3 className="text-lg" style={{ color: '#003F66', fontWeight: 600 }}>Popular Today</h3>
                </div>
                <p className="text-sm" style={{ color: '#003F66' }}>
                  Check out our most ordered items today!
                </p>
              </div>
            )}

            {/* Menu Items Grid */}
            <div className="grid sm:grid-cols-2 gap-4">
              {filteredItems.map(item => (
                <Card key={item.id} className="overflow-hidden hover:shadow-2xl transition-all duration-300 group border-2 border-[#003366]/10 hover:border-[#218dd1]/50 bg-white/95 backdrop-blur">
                  <div className="relative">
                    {/* Food Image */}
                    <div className="relative h-48 overflow-hidden bg-gradient-to-br from-gray-100 to-gray-50">
                      <ImageWithFallback
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                      {/* Overlay Badges */}
                      <div className="absolute top-2 left-2 right-2 flex justify-between items-start">
                        <div className="flex gap-2">
                          {item.popular && (
                            <Badge className="bg-amber-500 hover:bg-amber-600 gap-1">
                              <TrendingUp className="w-3 h-3" />
                              Popular
                            </Badge>
                          )}
                          <Badge variant="secondary" className="bg-white/90 backdrop-blur">
                            {item.category}
                          </Badge>
                        </div>
                        <Button
                          size="sm"
                          variant="ghost"
                          className={`h-8 w-8 p-0 rounded-full ${favorites.includes(item.id)
                            ? 'bg-red-50 text-red-500 hover:bg-red-100'
                            : 'bg-white/90 hover:bg-white'
                            }`}
                          onClick={() => toggleFavorite(item.id)}
                        >
                          <Heart
                            className={`w-4 h-4 ${favorites.includes(item.id) ? 'fill-current' : ''}`}
                          />
                        </Button>
                      </div>
                      {/* Rating Badge */}
                      <div className="absolute bottom-2 right-2">
                        <div className="bg-white/95 backdrop-blur px-2 py-1 rounded-full flex items-center gap-1">
                          <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                          <span className="text-xs">{item.rating}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg line-clamp-1">{item.name}</CardTitle>
                    <CardDescription className="text-xs line-clamp-2">
                      {item.description}
                    </CardDescription>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
                      <span className="inline-block w-1.5 h-1.5 rounded-full bg-primary"></span>
                      {item.stall}
                    </div>
                  </CardHeader>

                  <CardContent className="pt-0">
                    <div className="flex justify-between items-center">
                      <div>
                        <span className="text-2xl text-primary">₱{item.price}</span>
                      </div>
                      <Button
                        onClick={() => addToCart(item)}
                        disabled={!item.available}
                        className="rounded-full gap-2"
                        size="sm"
                      >
                        <Plus className="w-4 h-4" />
                        Add to Cart
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Shopping Cart */}
          <div className="lg:col-span-1">
            <Card className="sticky top-4 border-2 border-[#003366]/20 bg-white/95 backdrop-blur shadow-2xl">
              <CardHeader className="bg-gradient-to-r from-[#218dd1]/10 to-[#003366]/10">
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="bg-[#003366] text-white p-2 rounded-lg">
                      <ShoppingCart className="w-5 h-5" />
                    </div>
                    <span style={{ color: '#003F66' }}>Your Order</span>
                  </div>
                  {cart.length > 0 && (
                    <Badge variant="secondary" className="text-sm">
                      {cart.reduce((sum, item) => sum + item.quantity, 0)} items
                    </Badge>
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 p-6">
                {cart.length === 0 ? (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <ShoppingCart className="w-8 h-8 text-gray-400" />
                    </div>
                    <p className="text-muted-foreground">Your cart is empty</p>
                    <p className="text-xs text-muted-foreground mt-1">Add items to get started!</p>
                  </div>
                ) : (
                  <>
                    <div className="space-y-3 max-h-64 overflow-y-auto pr-2">
                      {cart.map(item => (
                        <div key={item.id} className="bg-gray-50 rounded-lg p-3 border">
                          <div className="flex gap-3">
                            <div className="w-16 h-16 rounded-md overflow-hidden flex-shrink-0">
                              <ImageWithFallback
                                src={item.image}
                                alt={item.name}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="truncate">{item.name}</p>
                              <p className="text-sm text-primary">₱{item.price}</p>
                              <div className="flex items-center gap-2 mt-2">
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => updateQuantity(item.id, -1)}
                                  className="h-7 w-7 p-0 rounded-full"
                                >
                                  <Minus className="w-3 h-3" />
                                </Button>
                                <span className="w-8 text-center text-sm">{item.quantity}</span>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => updateQuantity(item.id, 1)}
                                  className="h-7 w-7 p-0 rounded-full"
                                >
                                  <Plus className="w-3 h-3" />
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="border-t pt-4 space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="payment-mode" className="text-sm">Payment Mode</Label>
                        <Select value={paymentMode} onValueChange={setPaymentMode}>
                          <SelectTrigger id="payment-mode" className="h-11">
                            <SelectValue placeholder="Select payment mode" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="cash">Cash on Pickup</SelectItem>
                            <SelectItem value="gcash">GCash</SelectItem>
                            <SelectItem value="card">Debit/Credit Card</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="pickup-time" className="text-sm">Pickup Time</Label>
                        <div className="relative">
                          <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                          <Input
                            id="pickup-time"
                            type="time"
                            value={pickupTime}
                            onChange={(e) => setPickupTime(e.target.value)}
                            className="pl-10 h-11"
                          />
                        </div>
                      </div>

                      <div className="bg-primary/5 rounded-lg p-4 border border-primary/20">
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-sm text-muted-foreground">Subtotal</span>
                          <span className="text-sm">₱{totalAmount}</span>
                        </div>
                        <div className="flex justify-between items-center pt-2 border-t mt-2">
                          <span>Total</span>
                          <span className="text-2xl text-primary">₱{totalAmount}</span>
                        </div>
                      </div>

                      <Button
                        onClick={handlePlaceOrder}
                        className="w-full rounded-full h-12 text-base gap-2 bg-[#003366] hover:bg-[#002A45] transition-all duration-300 hover:shadow-lg"
                        style={{ fontWeight: 'bold' }}
                      >
                        <ShoppingCart className="w-4 h-4" />
                        Place Order - ₱{totalAmount}
                      </Button>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
