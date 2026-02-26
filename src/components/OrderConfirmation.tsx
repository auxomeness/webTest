import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { CheckCircle, Clock, CreditCard, MapPin } from "lucide-react";
import { motion } from "motion/react";

interface OrderConfirmationProps {
  orderData: {
    orderNumber: string;
    items: { name: string; quantity: number; price: number }[];
    totalAmount: number;
    paymentMethod: string;
    pickupTime: string;
  };
  onContinue: () => void;
}

export function OrderConfirmation({ orderData, onContinue }: OrderConfirmationProps) {
  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center p-4 relative overflow-hidden" style={{ backgroundColor: 'aliceblue' }}>
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
          className="absolute w-[30rem] h-0 top-[20%] -right-[10%] rotate-[-30deg]"
          style={{
            boxShadow: '0 0 500px 10px #003366'
          }}
        />
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="relative z-10"
      >
        <Card className="w-full max-w-2xl border-2 border-[#003366]/20 bg-white/95 backdrop-blur shadow-2xl">
          <CardHeader className="text-center pb-8">
            <motion.div 
              className="flex justify-center mb-4"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
            >
              <div className="rounded-full bg-green-100 p-4 border-4 border-green-200">
                <CheckCircle className="w-12 h-12 text-green-600" />
              </div>
            </motion.div>
            <CardTitle className="text-3xl mb-2 gradient-text">Order Confirmed!</CardTitle>
            <CardDescription style={{ color: '#003F66' }}>
              Your order has been successfully placed and sent to the stall
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            <div className="rounded-lg p-6 space-y-4 border-2" style={{ backgroundColor: 'rgba(33, 141, 209, 0.08)', borderColor: 'rgba(0, 63, 102, 0.2)' }}>
              <div className="flex items-center justify-between">
                <span style={{ color: '#003F66' }}>Order Number</span>
                <Badge variant="outline" className="text-lg px-4 py-2 border-2 border-[#003366]" style={{ color: '#003366', fontWeight: 700 }}>
                  {orderData.orderNumber}
                </Badge>
              </div>

              <div className="border-t-2 pt-4" style={{ borderColor: 'rgba(0, 63, 102, 0.1)' }}>
                <p className="text-sm mb-3" style={{ color: '#003F66', opacity: 0.7 }}>Ordered Items:</p>
                <div className="space-y-2">
                  {orderData.items.map((item, idx) => (
                    <div key={idx} className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <span style={{ color: '#003F66' }}>{item.name}</span>
                        <span className="text-sm" style={{ color: '#003F66', opacity: 0.6 }}>x{item.quantity}</span>
                      </div>
                      <span style={{ color: '#003366', fontWeight: 600 }}>₱{item.price * item.quantity}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="border-t-2 pt-4 space-y-3" style={{ borderColor: 'rgba(0, 63, 102, 0.1)' }}>
                <div className="flex items-center gap-3">
                  <Clock className="w-5 h-5" style={{ color: '#003366' }} />
                  <div className="flex-1">
                    <p className="text-sm" style={{ color: '#003F66', opacity: 0.7 }}>Pickup Time</p>
                    <p style={{ color: '#003F66', fontWeight: 600 }}>{orderData.pickupTime}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <CreditCard className="w-5 h-5" style={{ color: '#003366' }} />
                  <div className="flex-1">
                    <p className="text-sm" style={{ color: '#003F66', opacity: 0.7 }}>Payment Method</p>
                    <p className="capitalize" style={{ color: '#003F66', fontWeight: 600 }}>{orderData.paymentMethod}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <MapPin className="w-5 h-5" style={{ color: '#003366' }} />
                  <div className="flex-1">
                    <p className="text-sm" style={{ color: '#003F66', opacity: 0.7 }}>Pickup Location</p>
                    <p style={{ color: '#003F66', fontWeight: 600 }}>Main Canteen Counter</p>
                  </div>
                </div>
              </div>

              <div className="border-t-2 pt-4" style={{ borderColor: 'rgba(0, 63, 102, 0.1)' }}>
                <div className="flex justify-between items-center">
                  <span className="text-lg" style={{ color: '#003F66', fontWeight: 600 }}>Total Amount</span>
                  <span className="text-2xl" style={{ color: '#003366', fontWeight: 700 }}>₱{orderData.totalAmount}</span>
                </div>
              </div>
            </div>

            <div className="border-2 border-[#218dd1]/30 rounded-lg p-4" style={{ backgroundColor: 'rgba(33, 141, 209, 0.08)' }}>
              <p className="text-sm" style={{ color: '#003F66' }}>
                <strong>Important:</strong> Please arrive at the pickup location at your scheduled time. 
                You'll receive a notification when your order is ready for pickup.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <Button 
                onClick={onContinue} 
                className="flex-1 rounded-full bg-[#003366] hover:bg-[#002A45] transition-all duration-300"
                style={{ fontWeight: 'bold' }}
              >
                Back to Menu
              </Button>
              <Button 
                variant="outline" 
                className="flex-1 rounded-full border-2 border-[#003366] text-[#003366] hover:bg-[#003366]/10"
              >
                View Order Status
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
