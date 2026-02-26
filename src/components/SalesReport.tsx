import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from "recharts";
import { TrendingUp, TrendingDown, DollarSign, ShoppingCart, Award, AlertTriangle } from "lucide-react";
import { useState } from "react";

const salesData = [
  { date: "Mon", sales: 4500 },
  { date: "Tue", sales: 5200 },
  { date: "Wed", sales: 4800 },
  { date: "Thu", sales: 6100 },
  { date: "Fri", sales: 7500 },
  { date: "Sat", sales: 3200 },
  { date: "Sun", sales: 2800 },
];

const topSellingItems = [
  { name: "Chicken Adobo Rice", orders: 145, revenue: 9425, trend: "up" },
  { name: "Beef Tapa", orders: 98, revenue: 7350, trend: "up" },
  { name: "Burger Steak", orders: 87, revenue: 5220, trend: "down" },
  { name: "Pancit Canton", orders: 76, revenue: 3800, trend: "up" },
  { name: "Iced Coffee", orders: 134, revenue: 6030, trend: "up" },
];

const leastSellingItems = [
  { name: "Halo-Halo", orders: 12, revenue: 600, trend: "down" },
  { name: "Spaghetti", orders: 18, revenue: 990, trend: "down" },
  { name: "Special Bibimbap", orders: 15, revenue: 1350, trend: "up" },
];

const categoryData = [
  { name: "Main Course", value: 45, color: "#2d5a8c" },
  { name: "Beverages", value: 28, color: "#4a90e2" },
  { name: "Snacks", value: 15, color: "#7ab8f5" },
  { name: "Desserts", value: 12, color: "#a8d0ff" },
];

export function SalesReport() {
  const [dateRange, setDateRange] = useState("week");

  const totalSales = salesData.reduce((sum, day) => sum + day.sales, 0);
  const totalOrders = topSellingItems.reduce((sum, item) => sum + item.orders, 0) + 
                      leastSellingItems.reduce((sum, item) => sum + item.orders, 0);
  const averageOrderValue = totalSales / totalOrders;

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
      <div className="mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-4xl mb-2">Sales & Inventory Report</h1>
          <p className="text-muted-foreground">Analytical overview of sales performance and popular items</p>
        </div>
        <Select value={dateRange} onValueChange={setDateRange}>
          <SelectTrigger className="w-full sm:w-48">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="today">Today</SelectItem>
            <SelectItem value="week">This Week</SelectItem>
            <SelectItem value="month">This Month</SelectItem>
            <SelectItem value="year">This Year</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardDescription>Total Sales</CardDescription>
              <DollarSign className="w-4 h-4 text-muted-foreground" />
            </div>
            <CardTitle className="text-3xl text-primary">₱{totalSales.toLocaleString()}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2 text-sm text-green-600">
              <TrendingUp className="w-4 h-4" />
              <span>+12.5% from last week</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardDescription>Total Orders</CardDescription>
              <ShoppingCart className="w-4 h-4 text-muted-foreground" />
            </div>
            <CardTitle className="text-3xl text-primary">{totalOrders}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2 text-sm text-green-600">
              <TrendingUp className="w-4 h-4" />
              <span>+8.3% from last week</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardDescription>Avg. Order Value</CardDescription>
              <DollarSign className="w-4 h-4 text-muted-foreground" />
            </div>
            <CardTitle className="text-3xl text-primary">₱{averageOrderValue.toFixed(0)}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2 text-sm text-green-600">
              <TrendingUp className="w-4 h-4" />
              <span>+3.8% from last week</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardDescription>Active Stalls</CardDescription>
              <ShoppingCart className="w-4 h-4 text-muted-foreground" />
            </div>
            <CardTitle className="text-3xl text-primary">8</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">All operational</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid lg:grid-cols-2 gap-6 mb-6">
        <Card>
          <CardHeader>
            <CardTitle>Daily Sales Trend</CardTitle>
            <CardDescription>Sales performance over the past week</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={salesData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip 
                  formatter={(value) => [`₱${value}`, 'Sales']}
                  contentStyle={{ borderRadius: '8px', border: '1px solid #e0e0e0' }}
                />
                <Bar dataKey="sales" fill="#2d5a8c" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Sales by Category</CardTitle>
            <CardDescription>Distribution of orders across food categories</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => [`${value}%`, 'Share']} />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Award className="w-5 h-5 text-primary" />
              <CardTitle>Best-Selling Items</CardTitle>
            </div>
            <CardDescription>Top performing menu items this week</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topSellingItems.map((item, idx) => (
                <div key={idx} className="flex items-center justify-between pb-4 border-b last:border-0 last:pb-0">
                  <div className="flex items-center gap-3">
                    <Badge variant="secondary" className="w-8 h-8 flex items-center justify-center rounded-full">
                      {idx + 1}
                    </Badge>
                    <div>
                      <p>{item.name}</p>
                      <p className="text-sm text-muted-foreground">{item.orders} orders</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-primary">₱{item.revenue.toLocaleString()}</p>
                    <div className="flex items-center gap-1 text-sm text-green-600">
                      <TrendingUp className="w-3 h-3" />
                      <span>Popular</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-orange-500" />
              <CardTitle>Least-Selling Items</CardTitle>
            </div>
            <CardDescription>Items that need attention or promotion</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {leastSellingItems.map((item, idx) => (
                <div key={idx} className="flex items-center justify-between pb-4 border-b last:border-0 last:pb-0">
                  <div>
                    <p>{item.name}</p>
                    <p className="text-sm text-muted-foreground">{item.orders} orders</p>
                  </div>
                  <div className="text-right">
                    <p className="text-primary">₱{item.revenue.toLocaleString()}</p>
                    <div className="flex items-center gap-1 text-sm text-orange-600">
                      <TrendingDown className="w-3 h-3" />
                      <span>Low demand</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6 p-4 bg-orange-50 border border-orange-200 rounded-lg">
              <p className="text-sm text-orange-900">
                <strong>Recommendation:</strong> Consider running promotions or bundle deals for these items to increase visibility and sales.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
