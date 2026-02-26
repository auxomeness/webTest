import { motion } from "motion/react";
import { ReactNode } from "react";

interface PageWrapperProps {
  children: ReactNode;
  title?: string;
  description?: string;
}

export function PageWrapper({ children, title, description }: PageWrapperProps) {
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

      <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 relative z-10">
        {title && (
          <motion.div 
            className="mb-8"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl mb-2 gradient-text">{title}</h1>
            {description && <p style={{ color: '#003F66' }}>{description}</p>}
          </motion.div>
        )}
        {children}
      </div>
    </div>
  );
}
