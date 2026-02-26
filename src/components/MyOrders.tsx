import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Clock, CheckCircle, Package, MapPin, Calendar } from "lucide-react";
import { motion } from "motion/react";

interface Order {
  id: string;
  stallName: string;
  items: { name: string; quantity: number; price: number }[];
  pickupTime: string;
  status: "pending" | "preparing" | "ready" | "completed";
  totalAmount: number;
  orderDate: string;
  paymentMethod: string;
}

// Mock data for customer's orders
const mockCustomerOrders: Order[] = [
  {
    id: "ORD-2024-001",
    stallName: "Adobo King Stall",
    items: [
      { name: "Chicken Adobo Rice", quantity: 1, price: 75 },
      { name: "Iced Coffee", quantity: 1, price: 45 }
    ],
    pickupTime: "11:30 AM",
    status: "preparing",
    totalAmount: 120,
    orderDate: "Oct 23, 2024",
    paymentMethod: "Cash on Pickup"
  },
  {
    id: "ORD-2024-002",
    stallName: "Tapsi Corner",
    items: [
      { name: "Beef Tapa", quantity: 2, price: 85 }
    ],
    pickupTime: "12:00 PM",
    status: "pending",
    totalAmount: 170,
    orderDate: "Oct 23, 2024",
    paymentMethod: "GCash"
  },
  {
    id: "ORD-2024-003",
    stallName: "Burger Junction",
    items: [
      { name: "Burger Steak", quantity: 1, price: 65 },
      { name: "Bottled Water", quantity: 1, price: 20 }
    ],
    pickupTime: "11:15 AM",
    status: "ready",
    totalAmount: 85,
    orderDate: "Oct 23, 2024",
    paymentMethod: "Cash on Pickup"
  },
  {
    id: "ORD-2024-004",
    stallName: "Pancit Paradise",
    items: [
      { name: "Pancit Canton", quantity: 1, price: 50 },
      { name: "Halo-Halo", quantity: 1, price: 60 }
    ],
    pickupTime: "10:30 AM",
    status: "completed",
    totalAmount: 110,
    orderDate: "Oct 22, 2024",
    paymentMethod: "GCash"
  },
  {
    id: "ORD-2024-005",
    stallName: "Adobo King Stall",
    items: [
      { name: "Pork Adobo Rice", quantity: 1, price: 75 }
    ],
    pickupTime: "12:30 PM",
    status: "completed",
    totalAmount: 75,
    orderDate: "Oct 21, 2024",
    paymentMethod: "Cash on Pickup"
  }
];

export function MyOrders() {
  const [orders] = useState<Order[]>(mockCustomerOrders);

  const activeOrders = orders.filter(o => o.status !== "completed");
  const completedOrders = orders.filter(o => o.status === "completed");

  const getStatusIcon = (status: Order["status"]) => {
    switch (status) {
      case "pending":
        return <Clock className="w-4 h-4" />;
      case "preparing":
        return <Package className="w-4 h-4" />;
      case "ready":
        return <CheckCircle className="w-4 h-4" />;
      case "completed":
        return <CheckCircle className="w-4 h-4" />;
    }
  };

  const getStatusColor = (status: Order["status"]) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-300";
      case "preparing":
        return "bg-blue-100 text-blue-800 border-blue-300";
      case "ready":
        return "bg-green-100 text-green-800 border-green-300";
      case "completed":
        return "bg-gray-100 text-gray-800 border-gray-300";
    }
  };

  const getStatusMessage = (status: Order["status"]) => {
    switch (status) {
      case "pending":
        return "Your order has been received and is waiting to be prepared";
      case "preparing":
        return "Your order is being prepared";
      case "ready":
        return "Your order is ready for pickup!";
      case "completed":
        return "Order completed";
    }
  };

  const OrderCard = ({ order }: { order: Order }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <Card className="overflow-hidden border-2 border-[#003366]/20 bg-white/95 backdrop-blur shadow-lg hover:shadow-xl transition-all duration-300">
        <CardHeader className="bg-gradient-to-r from-[#218dd1]/10 to-[#003366]/10">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
            <div>
              <CardTitle className="flex items-center gap-2" style={{ color: '#003F66' }}>
                {order.id}
                <Badge 
                  variant="outline" 
                  className={`${getStatusColor(order.status)} gap-1`}
                >
                  {getStatusIcon(order.status)}
                  {order.status.toUpperCase()}
                </Badge>
              </CardTitle>
              <CardDescription className="mt-1" style={{ color: '#003F66', opacity: 0.7 }}>{order.stallName}</CardDescription>
            </div>
            {order.status === "ready" && (
              <Badge className="bg-green-600 hover:bg-green-700 animate-pulse">
                Ready for Pickup!
              </Badge>
            )}
          </div>
        </CardHeader>

        <CardContent className="pt-6 space-y-4">
          {order.status !== "completed" && (
            <div className="rounded-lg p-3 flex items-start gap-3 border-2" style={{ backgroundColor: 'rgba(33, 141, 209, 0.08)', borderColor: 'rgba(0, 63, 102, 0.2)' }}>
              <div className="mt-0.5" style={{ color: '#003366' }}>
                {getStatusIcon(order.status)}
              </div>
              <div>
                <p className="text-sm" style={{ color: '#003F66' }}>{getStatusMessage(order.status)}</p>
              </div>
            </div>
          )}

          <div className="space-y-2">
            <p className="text-sm" style={{ color: '#003F66', opacity: 0.7 }}>Order Items:</p>
            <div className="space-y-2">
              {order.items.map((item, idx) => (
                <div key={idx} className="flex justify-between items-center text-sm">
                  <div className="flex items-center gap-2">
                    <span style={{ color: '#003F66' }}>{item.name}</span>
                    <span style={{ color: '#003F66', opacity: 0.6 }}>×{item.quantity}</span>
                  </div>
                  <span style={{ color: '#003366', fontWeight: 600 }}>₱{item.price * item.quantity}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-4 border-t-2 space-y-3" style={{ borderColor: 'rgba(0, 63, 102, 0.1)' }}>
            <div className="flex items-center gap-3 text-sm">
              <Clock className="w-4 h-4" style={{ color: '#003366' }} />
              <div className="flex-1">
                <span style={{ color: '#003F66', opacity: 0.7 }}>Pickup Time:</span>
                <span className="ml-2" style={{ color: '#003F66', fontWeight: 600 }}>{order.pickupTime}</span>
              </div>
            </div>

            <div className="flex items-center gap-3 text-sm">
              <Calendar className="w-4 h-4" style={{ color: '#003366' }} />
              <div className="flex-1">
                <span style={{ color: '#003F66', opacity: 0.7 }}>Order Date:</span>
                <span className="ml-2" style={{ color: '#003F66', fontWeight: 600 }}>{order.orderDate}</span>
              </div>
            </div>

            <div className="flex items-center gap-3 text-sm">
              <MapPin className="w-4 h-4" style={{ color: '#003366' }} />
              <div className="flex-1">
                <span style={{ color: '#003F66', opacity: 0.7 }}>Pickup Location:</span>
                <span className="ml-2" style={{ color: '#003F66', fontWeight: 600 }}>Main Canteen Counter</span>
              </div>
            </div>

            <div className="pt-3 border-t-2 flex justify-between items-center" style={{ borderColor: 'rgba(0, 63, 102, 0.1)' }}>
              <span style={{ color: '#003F66', fontWeight: 600 }}>Total Amount</span>
              <span className="text-xl" style={{ color: '#003366', fontWeight: 700 }}>₱{order.totalAmount}</span>
            </div>

            <div className="text-sm" style={{ color: '#003F66', opacity: 0.7 }}>
              Payment: {order.paymentMethod}
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );

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

      <div className="max-w-5xl mx-auto p-4 sm:p-6 lg:p-8 relative z-10">
        <motion.div 
          className="mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl mb-2 gradient-text">My Orders</h1>
          <p style={{ color: '#003F66' }}>Track your orders and view order history</p>
        </motion.div>

        <Tabs defaultValue="active" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6 bg-white/50 backdrop-blur border-2 border-[#003366]/20">
            <TabsTrigger 
              value="active"
              className="data-[state=active]:bg-[#003366] data-[state=active]:text-white rounded-lg"
              style={{ color: '#003F66' }}
            >
              Active Orders
              {activeOrders.length > 0 && (
                <Badge variant="secondary" className="ml-2 bg-[#218dd1] text-white">
                  {activeOrders.length}
                </Badge>
              )}
            </TabsTrigger>
            <TabsTrigger 
              value="history"
              className="data-[state=active]:bg-[#003366] data-[state=active]:text-white rounded-lg"
              style={{ color: '#003F66' }}
            >
              Order History
            </TabsTrigger>
          </TabsList>

          <TabsContent value="active" className="space-y-4">
            {activeOrders.length > 0 ? (
              activeOrders.map(order => <OrderCard key={order.id} order={order} />)
            ) : (
              <Card className="border-2 border-[#003366]/20 bg-white/95 backdrop-blur">
                <CardContent className="py-12 text-center">
                  <Package className="w-16 h-16 mx-auto mb-4 opacity-30" style={{ color: '#003366' }} />
                  <p className="text-lg mb-2" style={{ color: '#003F66', fontWeight: 600 }}>No Active Orders</p>
                  <p className="text-sm" style={{ color: '#003F66', opacity: 0.7 }}>
                    You don't have any active orders at the moment
                  </p>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="history" className="space-y-4">
            {completedOrders.length > 0 ? (
              completedOrders.map(order => <OrderCard key={order.id} order={order} />)
            ) : (
              <Card className="border-2 border-[#003366]/20 bg-white/95 backdrop-blur">
                <CardContent className="py-12 text-center">
                  <CheckCircle className="w-16 h-16 mx-auto mb-4 opacity-30" style={{ color: '#003366' }} />
                  <p className="text-lg mb-2" style={{ color: '#003F66', fontWeight: 600 }}>No Order History</p>
                  <p className="text-sm" style={{ color: '#003F66', opacity: 0.7 }}>
                    Your completed orders will appear here
                  </p>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
