import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Clock, CheckCircle, XCircle, Package } from "lucide-react";
import { toast } from "sonner@2.0.3";

interface Order {
  id: string;
  customerName: string;
  items: { name: string; quantity: number }[];
  pickupTime: string;
  status: "pending" | "preparing" | "ready" | "completed" | "cancelled";
  totalAmount: number;
  orderTime: string;
}

const mockOrders: Order[] = [
  {
    id: "ORD-001",
    customerName: "Maria Santos",
    items: [
      { name: "Chicken Adobo Rice", quantity: 2 },
      { name: "Iced Coffee", quantity: 1 }
    ],
    pickupTime: "11:30 AM",
    status: "pending",
    totalAmount: 175,
    orderTime: "10:45 AM"
  },
  {
    id: "ORD-002",
    customerName: "Juan Dela Cruz",
    items: [
      { name: "Beef Tapa", quantity: 1 },
      { name: "Bottled Water", quantity: 1 }
    ],
    pickupTime: "12:00 PM",
    status: "preparing",
    totalAmount: 95,
    orderTime: "10:50 AM"
  },
  {
    id: "ORD-003",
    customerName: "Anna Reyes",
    items: [
      { name: "Burger Steak", quantity: 1 },
      { name: "Halo-Halo", quantity: 1 }
    ],
    pickupTime: "11:45 AM",
    status: "ready",
    totalAmount: 110,
    orderTime: "11:00 AM"
  },
  {
    id: "ORD-004",
    customerName: "Pedro Garcia",
    items: [
      { name: "Pancit Canton", quantity: 2 }
    ],
    pickupTime: "11:15 AM",
    status: "completed",
    totalAmount: 100,
    orderTime: "10:30 AM"
  },
];

export function OrderTracking() {
  const [orders, setOrders] = useState<Order[]>(mockOrders);
  const [filterStatus, setFilterStatus] = useState<string>("all");

  const updateOrderStatus = (orderId: string, newStatus: Order["status"]) => {
    setOrders(orders.map(order => 
      order.id === orderId ? { ...order, status: newStatus } : order
    ));
    toast.success(`Order ${orderId} status updated to ${newStatus}`);
  };

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
      case "cancelled":
        return <XCircle className="w-4 h-4" />;
    }
  };

  const getStatusVariant = (status: Order["status"]) => {
    switch (status) {
      case "pending":
        return "secondary";
      case "preparing":
        return "default";
      case "ready":
        return "default";
      case "completed":
        return "outline";
      case "cancelled":
        return "destructive";
      default:
        return "secondary";
    }
  };

  const filteredOrders = filterStatus === "all" 
    ? orders 
    : orders.filter(order => order.status === filterStatus);

  const statusCounts = {
    pending: orders.filter(o => o.status === "pending").length,
    preparing: orders.filter(o => o.status === "preparing").length,
    ready: orders.filter(o => o.status === "ready").length,
    completed: orders.filter(o => o.status === "completed").length,
  };

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
      <div className="mb-8">
        <h1 className="text-4xl mb-2">Order Tracking Dashboard</h1>
        <p className="text-muted-foreground">Monitor and manage customer orders in real-time</p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardHeader className="pb-3">
            <CardDescription>Pending</CardDescription>
            <CardTitle className="text-3xl text-primary">{statusCounts.pending}</CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardDescription>Preparing</CardDescription>
            <CardTitle className="text-3xl text-primary">{statusCounts.preparing}</CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardDescription>Ready for Pickup</CardDescription>
            <CardTitle className="text-3xl text-primary">{statusCounts.ready}</CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardDescription>Completed Today</CardDescription>
            <CardTitle className="text-3xl text-primary">{statusCounts.completed}</CardTitle>
          </CardHeader>
        </Card>
      </div>

      <div className="mb-6">
        <Select value={filterStatus} onValueChange={setFilterStatus}>
          <SelectTrigger className="w-full sm:w-64">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Orders</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="preparing">Preparing</SelectItem>
            <SelectItem value="ready">Ready</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
            <SelectItem value="cancelled">Cancelled</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-4">
        {filteredOrders.map(order => (
          <Card key={order.id}>
            <CardHeader>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div>
                    <CardTitle className="text-lg">{order.id}</CardTitle>
                    <CardDescription>{order.customerName}</CardDescription>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant={getStatusVariant(order.status)} className="gap-1">
                    {getStatusIcon(order.status)}
                    {order.status.toUpperCase()}
                  </Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground mb-2">Ordered Items:</p>
                  <ul className="space-y-1">
                    {order.items.map((item, idx) => (
                      <li key={idx} className="flex justify-between">
                        <span>{item.name}</span>
                        <span className="text-muted-foreground">x{item.quantity}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Order Time:</span>
                    <span>{order.orderTime}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Pickup Time:</span>
                    <span>{order.pickupTime}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Total Amount:</span>
                    <span className="text-primary">₱{order.totalAmount}</span>
                  </div>
                </div>
              </div>

              {order.status !== "completed" && order.status !== "cancelled" && (
                <div className="flex flex-wrap gap-2 pt-4 border-t">
                  {order.status === "pending" && (
                    <>
                      <Button
                        size="sm"
                        onClick={() => updateOrderStatus(order.id, "preparing")}
                        className="rounded-full"
                      >
                        Start Preparing
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => updateOrderStatus(order.id, "cancelled")}
                        className="rounded-full"
                      >
                        Cancel
                      </Button>
                    </>
                  )}
                  {order.status === "preparing" && (
                    <Button
                      size="sm"
                      onClick={() => updateOrderStatus(order.id, "ready")}
                      className="rounded-full"
                    >
                      Mark as Ready
                    </Button>
                  )}
                  {order.status === "ready" && (
                    <Button
                      size="sm"
                      onClick={() => updateOrderStatus(order.id, "completed")}
                      className="rounded-full"
                    >
                      Complete Order
                    </Button>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        ))}

        {filteredOrders.length === 0 && (
          <Card>
            <CardContent className="py-12 text-center">
              <p className="text-muted-foreground">No orders found with this status</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
