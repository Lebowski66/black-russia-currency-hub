
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

interface OrderData {
  type: 'buy' | 'sell';
  server: string;
  amount: string;
  paymentMethod: string;
  telegramUsername: string;
}

interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  orderData: OrderData | null;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  orderData
}) => {
  if (!orderData) return null;

  const serverNames: { [key: string]: string } = {
    south: 'South Server',
    central: 'Central Server',
    north: 'North Server',
    crimea: 'Crimea Server',
    siberia: 'Siberia Server'
  };

  const paymentNames: { [key: string]: string } = {
    card: '💳 Bank Card',
    ton: '💎 TON Coin',
    crypto: '₿ Crypto'
  };

  const estimatedValue = Math.round(parseInt(orderData.amount) / 15000 * 100) / 100;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-br-gray border border-br-red/30 text-white max-w-md mx-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-center text-br-red">
            🔔 Confirm Your Order
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <div className="bg-br-black rounded-lg p-4 space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-gray-400">Action:</span>
              <div className="flex items-center space-x-2">
                <span className="text-lg">{orderData.type === 'buy' ? '💰' : '💸'}</span>
                <span className="font-semibold text-white capitalize">{orderData.type} Currency</span>
              </div>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-gray-400">Server:</span>
              <span className="font-semibold text-white">{serverNames[orderData.server]}</span>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-gray-400">Amount:</span>
              <span className="font-semibold text-green-400">{parseInt(orderData.amount).toLocaleString()} BR</span>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-gray-400">Est. Value:</span>
              <span className="font-semibold text-yellow-400">${estimatedValue} USD</span>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-gray-400">Payment:</span>
              <span className="font-semibold text-white">{paymentNames[orderData.paymentMethod]}</span>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-gray-400">Contact:</span>
              <span className="font-semibold text-blue-400">{orderData.telegramUsername}</span>
            </div>
          </div>
          
          <div className="bg-br-red/10 border border-br-red/30 rounded-lg p-3">
            <p className="text-sm text-gray-300 text-center">
              ⏱️ <strong>Processing Time:</strong> 5-15 minutes<br/>
              📞 You'll receive a Telegram message shortly
            </p>
          </div>
        </div>
        
        <div className="flex space-x-3 pt-4">
          <Button
            variant="ghost"
            onClick={onClose}
            className="flex-1 btn-secondary"
          >
            Cancel
          </Button>
          <Button
            onClick={onConfirm}
            className="flex-1 btn-primary"
          >
            Confirm Order ✅
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ConfirmationModal;
