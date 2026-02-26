import { useState } from "react";
import { Header } from "./components/Header";
import { Home } from "./components/Home";
import { LoginRegister } from "./components/LoginRegister";
import { OrderMenu } from "./components/OrderMenu";
import { MenuManagement } from "./components/MenuManagement";
import { OrderTracking } from "./components/OrderTracking";
import { OrderConfirmation } from "./components/OrderConfirmation";
import { SalesReport } from "./components/SalesReport";
import { MyOrders } from "./components/MyOrders";
import { StallManagement } from "./components/StallManagement";
import { Toaster } from "./components/ui/sonner";

export default function App() {
  const [currentView, setCurrentView] = useState("home");
  const [userRole, setUserRole] = useState<string>("");
  const [orderData, setOrderData] = useState<any>(null);

  const handleLogin = (role: string) => {
    setUserRole(role);
    if (role === "stall_owner") {
      setCurrentView("tracking");
    } else if (role === "admin") {
      setCurrentView("reports");
    } else {
      setCurrentView("menu");
    }
  };

  const handleOrderPlaced = (data: any) => {
    setOrderData(data);
    setCurrentView("confirmation");
  };

  const handleNavigate = (view: string) => {
    if (view === "logout") {
      setUserRole("");
      setCurrentView("home");
    } else {
      setCurrentView(view);
    }
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: "aliceblue" }}>
      <Header 
        currentView={currentView} 
        onNavigate={handleNavigate}
        userRole={userRole}
      />
      
      {currentView === "home" && <Home onNavigate={handleNavigate} />}
      {(currentView === "login" || currentView === "register") && (
        <LoginRegister onLogin={handleLogin} />
      )}
      {currentView === "menu" && <OrderMenu onOrderPlaced={handleOrderPlaced} />}
      {currentView === "manage" && <MenuManagement />}
      {currentView === "tracking" && <OrderTracking />}
      {currentView === "reports" && <SalesReport />}
      {currentView === "stalls" && <StallManagement />}
      {currentView === "confirmation" && orderData && (
        <OrderConfirmation 
          orderData={orderData} 
          onContinue={() => setCurrentView("menu")}
        />
      )}
      {currentView === "shops" && (
        <div className="min-h-screen relative overflow-hidden" style={{ backgroundColor: 'aliceblue' }}>
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
          <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 relative z-10">
            <h1 className="text-4xl mb-4 gradient-text">Food Stalls</h1>
            <p style={{ color: '#003F66' }}>Browse available food stalls on campus</p>
          </div>
        </div>
      )}
      {currentView === "orders" && <MyOrders />}
      {currentView === "about" && (
        <div className="min-h-screen relative overflow-hidden" style={{ backgroundColor: 'aliceblue' }}>
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
          <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 relative z-10">
            <h1 className="text-4xl mb-4 gradient-text">About Us</h1>
            <p style={{ color: '#003F66' }}>Learn more about the AdNU Pre-Ordering System</p>
          </div>
        </div>
      )}
      
      <Toaster />
    </div>
  );
}
