
import React from 'react';

interface Transaction {
  id: string;
  type: 'buy' | 'sell';
  amount: number;
  server: string;
  username: string;
  timestamp: string;
  status: 'completed' | 'pending' | 'processing';
}

const mockTransactions: Transaction[] = [
  {
    id: '1',
    type: 'buy',
    amount: 50000,
    server: 'Central',
    username: '@crypto_king',
    timestamp: '2 min ago',
    status: 'completed'
  },
  {
    id: '2',
    type: 'sell',
    amount: 75000,
    server: 'South',
    username: '@player_one',
    timestamp: '5 min ago',
    status: 'processing'
  },
  {
    id: '3',
    type: 'buy',
    amount: 120000,
    server: 'North',
    username: '@rich_guy',
    timestamp: '8 min ago',
    status: 'completed'
  },
  {
    id: '4',
    type: 'sell',
    amount: 30000,
    server: 'Crimea',
    username: '@quick_trader',
    timestamp: '12 min ago',
    status: 'completed'
  },
  {
    id: '5',
    type: 'buy',
    amount: 90000,
    server: 'Siberia',
    username: '@winter_wolf',
    timestamp: '15 min ago',
    status: 'pending'
  },
  {
    id: '6',
    type: 'buy',
    amount: 200000,
    server: 'Central',
    username: '@big_spender',
    timestamp: '18 min ago',
    status: 'completed'
  }
];

const TransactionList: React.FC = () => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'text-green-400';
      case 'processing':
        return 'text-yellow-400';
      case 'pending':
        return 'text-orange-400';
      default:
        return 'text-gray-400';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return '✅';
      case 'processing':
        return '⏳';
      case 'pending':
        return '🔄';
      default:
        return '❓';
    }
  };

  return (
    <div className="mt-8">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-white">Recent Transactions</h3>
        <div className="flex items-center space-x-1">
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
          <span className="text-xs text-gray-400">Live updates</span>
        </div>
      </div>
      
      <div className="space-y-3 max-h-80 overflow-y-auto pr-2">
        {mockTransactions.map((transaction, index) => (
          <div
            key={transaction.id}
            className="transaction-item animate-slide"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className="flex items-center space-x-3">
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                transaction.type === 'buy' ? 'bg-green-500/20' : 'bg-red-500/20'
              }`}>
                <span className="text-sm">
                  {transaction.type === 'buy' ? '💰' : '💸'}
                </span>
              </div>
              
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-white text-sm">
                      {transaction.type === 'buy' ? 'Buy' : 'Sell'} {transaction.amount.toLocaleString()} BR
                    </p>
                    <p className="text-xs text-gray-400">
                      {transaction.server} • {transaction.username}
                    </p>
                  </div>
                  
                  <div className="text-right">
                    <div className="flex items-center space-x-1">
                      <span className="text-xs">{getStatusIcon(transaction.status)}</span>
                      <span className={`text-xs font-medium ${getStatusColor(transaction.status)}`}>
                        {transaction.status}
                      </span>
                    </div>
                    <p className="text-xs text-gray-500">{transaction.timestamp}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-4 p-3 bg-br-red/10 rounded-lg border border-br-red/20 text-center">
        <p className="text-xs text-gray-400">
          📊 <strong>24h Volume:</strong> 2.5M BR • <strong>Active Traders:</strong> 1,234
        </p>
      </div>
    </div>
  );
};

export default TransactionList;
