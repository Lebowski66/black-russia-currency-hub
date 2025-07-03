
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface CurrencyFormProps {
  type: 'buy' | 'sell';
  onSubmit: (data: FormData) => void;
}

interface FormData {
  server: string;
  amount: string;
  paymentMethod: string;
  telegramUsername: string;
}

const servers = [
  { id: 'south', name: 'South Server', players: '2,450' },
  { id: 'central', name: 'Central Server', players: '3,120' },
  { id: 'north', name: 'North Server', players: '1,890' },
  { id: 'crimea', name: 'Crimea Server', players: '2,780' },
  { id: 'siberia', name: 'Siberia Server', players: '1,560' }
];

const paymentMethods = [
  { id: 'card', name: '💳 Bank Card', fee: '2.5%' },
  { id: 'ton', name: '💎 TON Coin', fee: '1.0%' },
  { id: 'crypto', name: '₿ Crypto', fee: '1.5%' }
];

const CurrencyForm: React.FC<CurrencyFormProps> = ({ type, onSubmit }) => {
  const [formData, setFormData] = useState<FormData>({
    server: '',
    amount: '',
    paymentMethod: '',
    telegramUsername: ''
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    onSubmit(formData);
    setIsLoading(false);
  };

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const isFormValid = Object.values(formData).every(value => value.trim() !== '');

  return (
    <div className="card-br animate-fade-in">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-10 h-10 bg-br-red rounded-lg flex items-center justify-center">
          <span className="text-white text-lg">{type === 'buy' ? '💰' : '💸'}</span>
        </div>
        <div>
          <h3 className="text-xl font-bold text-white">
            {type === 'buy' ? 'Buy Currency' : 'Sell Currency'}
          </h3>
          <p className="text-gray-400 text-sm">
            {type === 'buy' ? 'Purchase in-game currency' : 'Sell your in-game currency'}
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Server Selection */}
        <div className="animate-slide" style={{ animationDelay: '0.1s' }}>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Select Server
          </label>
          <Select value={formData.server} onValueChange={(value) => handleInputChange('server', value)}>
            <SelectTrigger className="input-field">
              <SelectValue placeholder="Choose your server" />
            </SelectTrigger>
            <SelectContent className="bg-br-gray border-br-red/30">
              {servers.map((server) => (
                <SelectItem key={server.id} value={server.id} className="text-white hover:bg-br-red/20">
                  <div className="flex justify-between items-center w-full">
                    <span>{server.name}</span>
                    <span className="text-green-400 text-xs ml-2">🟢 {server.players}</span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Amount Input */}
        <div className="animate-slide" style={{ animationDelay: '0.2s' }}>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Amount ({type === 'buy' ? 'Currency to buy' : 'Currency to sell'})
          </label>
          <Input
            type="number"
            placeholder="Enter amount..."
            value={formData.amount}
            onChange={(e) => handleInputChange('amount', e.target.value)}
            className="input-field"
            min="1000"
            step="1000"
          />
          <p className="text-xs text-gray-500 mt-1">Minimum: 1,000 BR</p>
        </div>

        {/* Payment Method */}
        <div className="animate-slide" style={{ animationDelay: '0.3s' }}>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Payment Method
          </label>
          <Select value={formData.paymentMethod} onValueChange={(value) => handleInputChange('paymentMethod', value)}>
            <SelectTrigger className="input-field">
              <SelectValue placeholder="Choose payment method" />
            </SelectTrigger>
            <SelectContent className="bg-br-gray border-br-red/30">
              {paymentMethods.map((method) => (
                <SelectItem key={method.id} value={method.id} className="text-white hover:bg-br-red/20">
                  <div className="flex justify-between items-center w-full">
                    <span>{method.name}</span>
                    <span className="text-yellow-400 text-xs ml-2">Fee: {method.fee}</span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Telegram Username */}
        <div className="animate-slide" style={{ animationDelay: '0.4s' }}>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Telegram Username
          </label>
          <Input
            type="text"
            placeholder="@username"
            value={formData.telegramUsername}
            onChange={(e) => handleInputChange('telegramUsername', e.target.value)}
            className="input-field"
          />
          <p className="text-xs text-gray-500 mt-1">We'll contact you here for transaction details</p>
        </div>

        {/* Submit Button */}
        <div className="pt-4 animate-slide" style={{ animationDelay: '0.5s' }}>
          <Button
            type="submit"
            disabled={!isFormValid || isLoading}
            className="w-full btn-primary h-12 text-lg font-semibold"
          >
            {isLoading ? (
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Processing...</span>
              </div>
            ) : (
              `${type === 'buy' ? 'Buy Now' : 'Sell Now'} 🚀`
            )}
          </Button>
        </div>
      </form>

      {/* Rate Info */}
      <div className="mt-6 p-4 bg-br-red/10 rounded-lg border border-br-red/20">
        <p className="text-sm text-gray-300">
          💡 <strong>Current Rate:</strong> 1 USD = 15,000 BR | 
          <span className="text-green-400 ml-2">📈 Rate updated 2 min ago</span>
        </p>
      </div>
    </div>
  );
};

export default CurrencyForm;
