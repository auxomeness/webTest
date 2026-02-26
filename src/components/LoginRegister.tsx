import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { motion } from "motion/react";

interface LoginRegisterProps {
  onLogin: (role: string) => void;
}

export function LoginRegister({ onLogin }: LoginRegisterProps) {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const [registerData, setRegisterData] = useState({
    name: "",
    idNumber: "",
    email: "",
    password: "",
  });

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock login - in real app, verify credentials
    // Check if admin/stall owner based on email or credentials
    if (loginData.email === "admin@adnu.edu.ph") {
      onLogin("admin");
    } else if (loginData.email.includes("owner")) {
      onLogin("stall_owner");
    } else {
      onLogin("student");
    }
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    // Public registration is only for students/customers
    onLogin("student");
  };

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
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 w-full max-w-md"
      >
        <Card className="border-2 shadow-2xl backdrop-blur-sm" style={{ borderColor: 'rgba(0, 63, 102, 0.2)', backgroundColor: 'rgba(255, 255, 255, 0.95)' }}>
          <CardHeader className="text-center pb-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <CardTitle className="gradient-text text-4xl mb-2">APoS</CardTitle>
              <CardDescription className="text-base" style={{ color: '#003F66' }}>
                AdNU Pre-Ordering System
              </CardDescription>
            </motion.div>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="login" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-6" style={{ backgroundColor: 'rgba(0, 63, 102, 0.08)' }}>
                <TabsTrigger 
                  value="login" 
                  className="rounded-full data-[state=active]:bg-[#003366] data-[state=active]:text-white"
                >
                  Login
                </TabsTrigger>
                <TabsTrigger 
                  value="register"
                  className="rounded-full data-[state=active]:bg-[#003366] data-[state=active]:text-white"
                >
                  Register
                </TabsTrigger>
              </TabsList>

              <TabsContent value="login">
                <motion.form 
                  onSubmit={handleLogin} 
                  className="space-y-4 mt-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.4 }}
                >
                  <div className="space-y-2">
                    <Label htmlFor="login-email" style={{ color: '#003F66' }}>Email Address</Label>
                    <Input
                      id="login-email"
                      type="email"
                      placeholder="student@adnu.edu.ph"
                      value={loginData.email}
                      onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                      required
                      className="border-[#003366]/30 focus:border-[#003366] rounded-lg"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="login-password" style={{ color: '#003F66' }}>Password</Label>
                    <Input
                      id="login-password"
                      type="password"
                      placeholder="••••••••"
                      value={loginData.password}
                      onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                      required
                      className="border-[#003366]/30 focus:border-[#003366] rounded-lg"
                    />
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full rounded-full bg-[#003366] hover:bg-[#002A45] text-white transition-all duration-300 hover:shadow-lg mt-6"
                    style={{ fontWeight: 'bold' }}
                  >
                    Sign In
                  </Button>

                  <div className="mt-4 p-4 rounded-xl border-2 border-[#218dd1]/30" style={{ backgroundColor: 'rgba(33, 141, 209, 0.08)' }}>
                    <p className="text-xs mb-2 font-semibold" style={{ color: '#003F66' }}>Demo Accounts:</p>
                    <div className="space-y-1 text-xs" style={{ color: '#003F66' }}>
                      <p>• <strong>Admin:</strong> admin@adnu.edu.ph</p>
                      <p>• <strong>Stall Owner:</strong> owner@adnu.edu.ph</p>
                      <p>• <strong>Student:</strong> student@adnu.edu.ph</p>
                    </div>
                  </div>
                </motion.form>
              </TabsContent>

              <TabsContent value="register">
                <motion.form 
                  onSubmit={handleRegister} 
                  className="space-y-4 mt-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.4 }}
                >
                  <div className="space-y-2">
                    <Label htmlFor="register-name" style={{ color: '#003F66' }}>Full Name</Label>
                    <Input
                      id="register-name"
                      type="text"
                      placeholder="Juan Dela Cruz"
                      value={registerData.name}
                      onChange={(e) => setRegisterData({ ...registerData, name: e.target.value })}
                      required
                      className="border-[#003366]/30 focus:border-[#003366] rounded-lg"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="register-id" style={{ color: '#003F66' }}>ID Number</Label>
                    <Input
                      id="register-id"
                      type="text"
                      placeholder="2024-12345"
                      value={registerData.idNumber}
                      onChange={(e) => setRegisterData({ ...registerData, idNumber: e.target.value })}
                      required
                      className="border-[#003366]/30 focus:border-[#003366] rounded-lg"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="register-email" style={{ color: '#003F66' }}>Email Address</Label>
                    <Input
                      id="register-email"
                      type="email"
                      placeholder="student@adnu.edu.ph"
                      value={registerData.email}
                      onChange={(e) => setRegisterData({ ...registerData, email: e.target.value })}
                      required
                      className="border-[#003366]/30 focus:border-[#003366] rounded-lg"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="register-password" style={{ color: '#003F66' }}>Password</Label>
                    <Input
                      id="register-password"
                      type="password"
                      placeholder="••••••••"
                      value={registerData.password}
                      onChange={(e) => setRegisterData({ ...registerData, password: e.target.value })}
                      required
                      className="border-[#003366]/30 focus:border-[#003366] rounded-lg"
                    />
                  </div>

                  <div className="p-4 rounded-xl border-2 border-[#218dd1]/30" style={{ backgroundColor: 'rgba(33, 141, 209, 0.08)' }}>
                    <p className="text-xs" style={{ color: '#003F66' }}>
                      Public registration is for students and staff only. Stall owner accounts are created by administrators.
                    </p>
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full rounded-full bg-[#003366] hover:bg-[#002A45] text-white transition-all duration-300 hover:shadow-lg"
                    style={{ fontWeight: 'bold' }}
                  >
                    Create Account
                  </Button>
                </motion.form>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
