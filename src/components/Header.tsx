
import React from 'react';
import { Button } from '@/components/ui/button';

interface HeaderProps {
  onProfileClick: () => void;
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
}

const Header: React.FC<HeaderProps> = ({ onProfileClick, isDarkMode, onToggleDarkMode }) => {
  return (
    <header className="sticky top-0 z-50 bg-br-black/90 backdrop-blur-md border-b border-br-red/20">
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-br-red rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">BR</span>
          </div>
          <div>
            <h1 className="text-xl font-bold text-white">Black Russia</h1>
            <p className="text-xs text-gray-400">Currency Exchange</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={onToggleDarkMode}
            className="text-gray-400 hover:text-white"
          >
            {isDarkMode ? '🌙' : '☀️'}
          </Button>
          <Button
            variant="ghost" 
            size="sm"
            onClick={onProfileClick}
            className="text-gray-400 hover:text-white"
          >
            👤
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
