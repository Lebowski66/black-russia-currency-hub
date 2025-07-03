
import React, { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from '@/hooks/use-toast';
import Header from '@/components/Header';
import CurrencyForm from '@/components/CurrencyForm';
import ConfirmationModal from '@/components/ConfirmationModal';
import TransactionList from '@/components/TransactionList';

// Telegram Web App API types
declare global {
  interface Window {
    Telegram?: {
      WebApp: {
        ready: () => void;
        expand: () => void;
        close: () => void;
        sendData: (data: string) => void;
        MainButton: {
          text: string;
          show: () => void;
          hide: () => void;
          onClick: (callback: () => void) => void;
        };
        initDataUnsafe: {
          user?: {
            id: number;
            first_name: string;
            username?: string;
          };
        };
      };
    };
  }
}

interface FormData {
  server: string;
  amount: string;
  paymentMethod: string;
  telegramUsername: string;
}

interface OrderData extends FormData {
  type: 'buy' | 'sell';
}

const Index = () => {
  const [activeTab, setActiveTab] = useState('buy');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [orderData, setOrderData] = useState<OrderData | null>(null);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [isLoaded, setIsLoaded] = useState(false);

  // Initialize Telegram Web App
  useEffect(() => {
    const initTelegramWebApp = () => {
      if (window.Telegram?.WebApp) {
        const webApp = window.Telegram.WebApp;
        webApp.ready();
        webApp.expand();
        
        // Set theme based on Telegram
        const telegramUser = webApp.initDataUnsafe.user;
        if (telegramUser) {
          console.log('Telegram user detected:', telegramUser);
        }
      } else {
        console.log('Running outside Telegram - using web version');
      }
      
      setIsLoaded(true);
    };

    // Small delay for smooth animation
    setTimeout(initTelegramWebApp, 300);
  }, []);

  const handleFormSubmit = (type: 'buy' | 'sell') => (data: FormData) => {
    const order: OrderData = { ...data, type };
    setOrderData(order);
    setIsModalOpen(true);
    
    // Haptic feedback for Telegram
    if (window.Telegram?.WebApp) {
      // Note: Haptic feedback would be available in newer versions
      console.log('Form submitted in Telegram context');
    }
  };

  const handleConfirmOrder = () => {
    if (!orderData) return;

    // Send data to Telegram bot
    if (window.Telegram?.WebApp) {
      const telegramData = {
        action: 'order_confirmed',
        type: orderData.type,
        server: orderData.server,
        amount: orderData.amount,
        paymentMethod: orderData.paymentMethod,
        telegramUsername: orderData.telegramUsername,
        timestamp: new Date().toISOString()
      };
      
      window.Telegram.WebApp.sendData(JSON.stringify(telegramData));
    }

    // Show success toast
    toast({
      title: "✅ Order Confirmed!",
      description: `Your ${orderData.type} order for ${parseInt(orderData.amount).toLocaleString()} BR has been submitted. Check your Telegram for updates.`,
      duration: 5000,
    });

    // Reset form
    setIsModalOpen(false);
    setOrderData(null);
    
    // Close Telegram Web App after successful order (optional)
    setTimeout(() => {
      if (window.Telegram?.WebApp) {
        // window.Telegram.WebApp.close();
      }
    }, 3000);
  };

  const handleProfileClick = () => {
    toast({
      title: "👤 Profile",
      description: "Profile management coming soon!",
    });
  };

  const toggleDarkMode = () => {
    setIsDarkMode(prev => !prev);
    toast({
      title: isDarkMode ? "☀️ Light Mode" : "🌙 Dark Mode",
      description: `Switched to ${isDarkMode ? 'light' : 'dark'} mode`,
    });
  };

  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-br-black flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-br-red rounded-full flex items-center justify-center mb-4 animate-pulse-red">
            <span className="text-white font-bold text-xl">BR</span>
          </div>
          <p className="text-white text-lg">Loading Black Russia...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-br-black via-br-black to-br-gray">
      <Header 
        onProfileClick={handleProfileClick}
        isDarkMode={isDarkMode}
        onToggleDarkMode={toggleDarkMode}
      />
      
      <main className="container mx-auto px-4 py-6 max-w-md">
        {/* Welcome Section */}
        <div className="text-center mb-8 animate-fade-in">
          <div className="w-20 h-20 bg-gradient-to-br from-br-red to-br-red-light rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
            <span className="text-white font-bold text-2xl">BR</span>
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">
            Currency Exchange
          </h2>
          <p className="text-gray-400 text-sm">
            Fast, secure, and reliable Black Russia currency trading
          </p>
          <div className="flex items-center justify-center space-x-4 mt-3">
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-xs text-green-400">Online</span>
            </div>
            <div className="text-xs text-gray-500">
              🔒 Secure • ⚡ Fast • 💯 Trusted
            </div>
          </div>
        </div>

        {/* Main Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6 bg-br-gray border border-br-red/20">
            <TabsTrigger 
              value="buy" 
              className="tab-inactive data-[state=active]:tab-active transition-all duration-200"
            >
              💰 Buy Currency
            </TabsTrigger>
            <TabsTrigger 
              value="sell"
              className="tab-inactive data-[state=active]:tab-active transition-all duration-200"
            >
              💸 Sell Currency
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="buy" className="space-y-6">
            <CurrencyForm type="buy" onSubmit={handleFormSubmit('buy')} />
          </TabsContent>
          
          <TabsContent value="sell" className="space-y-6">
            <CurrencyForm type="sell" onSubmit={handleFormSubmit('sell')} />
          </TabsContent>
        </Tabs>

        {/* Transaction History */}
        <TransactionList />

        {/* Footer */}
        <footer className="mt-8 text-center py-6 border-t border-br-red/20">
          <p className="text-xs text-gray-500">
            Black Russia Currency Exchange • Powered by Telegram
          </p>
          <p className="text-xs text-gray-600 mt-1">
            Safe • Fast • Reliable
          </p>
        </footer>
      </main>

      {/* Confirmation Modal */}
      <ConfirmationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleConfirmOrder}
        orderData={orderData}
      />
    </div>
  );
};

export default Index;
