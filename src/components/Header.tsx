import { Button } from "./ui/button";
import { motion } from "framer-motion";

interface HeaderProps {
  currentView: string;
  onNavigate: (view: string) => void;
  userRole?: string;
}

export function Header({ currentView, onNavigate, userRole }: HeaderProps) {
  return (
    <header className="bg-transparent relative z-50">
      <div className="max-w-[1400px] mx-auto px-8">
        <div className="flex justify-between items-center py-5">
          {/* Logo */}
          <motion.button 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            onClick={() => onNavigate('home')}
            className="gradient-text text-5xl tracking-tight cursor-pointer border-none bg-transparent"
            style={{ fontWeight: 700 }}
          >
            APoS
          </motion.button>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-12 flex-1 justify-center">
            <motion.button
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              onClick={() => onNavigate('menu')}
              className="text-[#003F66] hover:text-[#084e94] hover:scale-105 transition-all duration-300 text-base tracking-wider cursor-pointer border-none bg-transparent"
              style={{ 
                fontWeight: 500,
                textShadow: currentView === 'menu' ? '0 0 1px #084e94' : 'none'
              }}
            >
              MENU
            </motion.button>
            <motion.button
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              onClick={() => onNavigate('shops')}
              className="text-[#003F66] hover:text-[#084e94] hover:scale-105 transition-all duration-300 text-base tracking-wider cursor-pointer border-none bg-transparent"
              style={{ 
                fontWeight: 500,
                textShadow: currentView === 'shops' ? '0 0 1px #084e94' : 'none'
              }}
            >
              SHOPS
            </motion.button>
            {userRole && userRole !== "admin" && userRole !== "stall_owner" && (
              <motion.button
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                onClick={() => onNavigate('orders')}
                className="text-[#003F66] hover:text-[#084e94] hover:scale-105 transition-all duration-300 text-base tracking-wider cursor-pointer border-none bg-transparent"
                style={{ 
                  fontWeight: 500,
                  textShadow: currentView === 'orders' ? '0 0 1px #084e94' : 'none'
                }}
              >
                MY ORDERS
              </motion.button>
            )}
            {userRole === "admin" && (
              <>
                <motion.button
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  onClick={() => onNavigate('stalls')}
                  className="text-[#003F66] hover:text-[#084e94] hover:scale-105 transition-all duration-300 text-base tracking-wider cursor-pointer border-none bg-transparent"
                  style={{ 
                    fontWeight: 500,
                    textShadow: currentView === 'stalls' ? '0 0 1px #084e94' : 'none'
                  }}
                >
                  STALLS
                </motion.button>
                <motion.button
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.25 }}
                  onClick={() => onNavigate('reports')}
                  className="text-[#003F66] hover:text-[#084e94] hover:scale-105 transition-all duration-300 text-base tracking-wider cursor-pointer border-none bg-transparent"
                  style={{ 
                    fontWeight: 500,
                    textShadow: currentView === 'reports' ? '0 0 1px #084e94' : 'none'
                  }}
                >
                  REPORTS
                </motion.button>
              </>
            )}
            <motion.button
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              onClick={() => onNavigate('about')}
              className="text-[#003F66] hover:text-[#084e94] hover:scale-105 transition-all duration-300 text-base tracking-wider cursor-pointer border-none bg-transparent"
              style={{ 
                fontWeight: 500,
                textShadow: currentView === 'about' ? '0 0 1px #084e94' : 'none'
              }}
            >
              ABOUT US
            </motion.button>
          </nav>

          {/* Login/Logout Button */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex items-center space-x-4"
          >
            {!userRole ? (
              <button
                onClick={() => onNavigate('login')}
                className="border-2 border-[#003366] rounded-full bg-white/15 text-[#003366] px-8 py-3 hover:bg-[#003366] hover:text-[aliceblue] transition-all duration-300 cursor-pointer"
                style={{ fontWeight: 'bold' }}
              >
                LOG IN
              </button>
            ) : (
              <>
                {/* Role-specific quick actions */}
                {userRole === 'stall_owner' && (
                  <>
                    <Button 
                      variant="outline"
                      onClick={() => onNavigate('manage')}
                      className="rounded-full hidden lg:flex"
                    >
                      MANAGE MENU
                    </Button>
                    <Button 
                      variant="outline"
                      onClick={() => onNavigate('tracking')}
                      className="rounded-full hidden lg:flex"
                    >
                      ORDERS
                    </Button>
                  </>
                )}
                {userRole === 'admin' && (
                  <>
                    <Button 
                      variant="outline"
                      onClick={() => onNavigate('stalls')}
                      className="rounded-full hidden lg:flex"
                    >
                      MANAGE STALLS
                    </Button>
                    <Button 
                      variant="outline"
                      onClick={() => onNavigate('reports')}
                      className="rounded-full hidden lg:flex"
                    >
                      SALES REPORTS
                    </Button>
                  </>
                )}
                <Button 
                  variant="outline" 
                  onClick={() => onNavigate('logout')}
                  className="rounded-full"
                >
                  LOG OUT
                </Button>
              </>
            )}
          </motion.div>
        </div>
      </div>
    </header>
  );
}
