import { motion } from "motion/react";
import * as React from 'react';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      // allow <style jsx>{`...`}</style> and <style jsx global>{`...`}</style>
      style: React.DetailedHTMLProps<
        React.StyleHTMLAttributes<HTMLStyleElement>,
        HTMLStyleElement
      > & { jsx?: boolean; global?: boolean };
    }
  }
}

interface HomeProps {
  onNavigate: (view: string) => void;
}

export function Home({ onNavigate }: HomeProps) {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[aliceblue]">
      {/* Background Gradient Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Gradient Pattern Background */}
        <div 
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: `radial-gradient(circle at 20% 50%, rgba(33, 141, 209, 0.1) 0%, transparent 50%),
                             radial-gradient(circle at 80% 80%, rgba(0, 63, 102, 0.15) 0%, transparent 50%),
                             radial-gradient(circle at 40% 20%, rgba(12, 102, 158, 0.1) 0%, transparent 50%)`
          }}
        />
        
        {/* Animated Blur Effect */}
        <div 
          className="absolute w-[30rem] h-0 top-[20%] -right-[10%] rotate-[-30deg]"
          style={{
            boxShadow: '0 0 700px 15px #003366'
          }}
        />
      </div>

      {/* Main Content Container */}
      <div className="relative max-w-[1400px] mx-auto px-8 pt-6">
        {/* Main Content Section */}
        <main className="flex flex-col justify-center min-h-[calc(90vh-6rem)] relative">
          <div className="max-w-[40rem] ml-[10%] z-10">
            {/* Introducing Tag */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="gradient-border-box relative w-[18rem] h-[2.5rem] mb-5"
            >
              <div className="gradient-border-inner text-[#003F66] font-bold">
                INTRODUCING
              </div>
            </motion.div>

            {/* Main Heading */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <h1 className="text-[5rem] leading-none mb-8" style={{ fontWeight: 700 }}>
                <span className="gradient-text block">AdNU</span>
                <span className="gradient-text block text-[3rem] tracking-wider mt-2">
                  Pre-Ordering System
                </span>
              </h1>
            </motion.div>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="text-[1.2rem] text-[#003F66] max-w-[35rem] mb-12 leading-relaxed"
            >
              Tired of long lines? Order ahead with ease!
              The <strong>AdNU Pre-Ordering System</strong> lets students place their 
              orders in advance, reducing queues during peak hours and making transactions 
              faster, smoother, and more convenient.
            </motion.p>

            {/* Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="flex gap-4"
            >
              <button
                onClick={() => onNavigate('menu')}
                className="border border-[#003366] px-5 py-3 rounded-full text-[1.2rem] text-[#003366] bg-[aliceblue] hover:bg-[#003366] hover:text-[aliceblue] transition-all duration-200 cursor-pointer"
                style={{ fontWeight: 'bold' }}
              >
                Order Now
              </button>
              <button
                onClick={() => onNavigate('login')}
                className="border border-[#003366] px-5 py-3 rounded-full text-[1.2rem] text-white bg-[#003366] hover:opacity-80 transition-all duration-200 cursor-pointer"
                style={{ fontWeight: 'bold' }}
              >
                Sign In
              </button>
            </motion.div>
          </div>

          {/* 3D Robot Section - Hidden on mobile */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="absolute top-[10%] -right-[25%] hidden xl:block"
          >
            <div className="relative w-[600px] h-[600px]">
              {/* Placeholder for 3D Robot - Using decorative elements instead */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative">
                  {/* Circular gradient background */}
                  <div 
                    className="w-[400px] h-[400px] rounded-full opacity-20"
                    style={{
                      background: 'radial-gradient(circle, #218dd1 0%, #003F66 50%, transparent 70%)'
                    }}
                  />
                  {/* Animated circles */}
                  <motion.div
                    animate={{ 
                      rotate: 360,
                      scale: [1, 1.1, 1]
                    }}
                    transition={{ 
                      rotate: { duration: 20, repeat: Infinity, ease: "linear" },
                      scale: { duration: 3, repeat: Infinity, ease: "easeInOut" }
                    }}
                    className="absolute inset-0 flex items-center justify-center"
                  >
                    <div className="w-[300px] h-[300px] rounded-full border-2 border-[#218dd1] opacity-30" />
                  </motion.div>
                  <motion.div
                    animate={{ 
                      rotate: -360,
                      scale: [1, 0.9, 1]
                    }}
                    transition={{ 
                      rotate: { duration: 15, repeat: Infinity, ease: "linear" },
                      scale: { duration: 2.5, repeat: Infinity, ease: "easeInOut" }
                    }}
                    className="absolute inset-0 flex items-center justify-center"
                  >
                    <div className="w-[250px] h-[250px] rounded-full border-2 border-[#0c669e] opacity-30" />
                  </motion.div>
                  {/* Central icon/logo representation */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-[120px] h-[120px] rounded-full bg-gradient-to-br from-[#218dd1] to-[#003F66] opacity-40 flex items-center justify-center text-white text-6xl font-bold shadow-2xl">
                      <span className="gradient-text text-white" style={{ WebkitTextFillColor: 'white' }}>3D</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </main>
      </div>

      {/* Responsive Styles */}
      <style>{`
        @media (max-width: 1300px) {
          .xl\\:block {
            transform: scale(0.8);
            top: -20%;
            right: 2%;
          }
        }

        @media (max-width: 768px) {
          h1 {
            font-size: 2.5rem !important;
          }
          
          h1 span:last-child {
            font-size: 2rem !important;
          }

          p {
            font-size: 1rem !important;
          }

          button {
            font-size: 0.8rem !important;
            padding: 0.7rem 1.2rem !important;
          }

          .gradient-border-box {
            width: 12rem !important;
          }
        }
      `}</style>
    </div>
  );
}
