
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <a href="/" className="flex items-center">
              <span className="text-2xl font-bold text-purple-700">VneDoc</span>
              <span className="text-lg ml-1 font-medium text-gray-700">Chat</span>
            </a>
          </div>

          {/* Desktop nav links */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="#features" className="text-gray-600 hover:text-purple-500 transition-colors">Tính năng</a>
            <a href="#pricing" className="text-gray-600 hover:text-purple-500 transition-colors">Giá cả</a>
            <a href="#faq" className="text-gray-600 hover:text-purple-500 transition-colors">Câu hỏi thường gặp</a>
            <Button className="bg-gradient-purple hover:opacity-90 transition-opacity">
              Dùng thử miễn phí
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-purple-500 focus:outline-none"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white shadow-md">
            <a href="#features" className="block px-3 py-2 text-gray-600 hover:text-purple-500">Tính năng</a>
            <a href="#pricing" className="block px-3 py-2 text-gray-600 hover:text-purple-500">Giá cả</a>
            <a href="#faq" className="block px-3 py-2 text-gray-600 hover:text-purple-500">Câu hỏi thường gặp</a>
            <div className="px-3 py-2">
              <Button className="w-full bg-gradient-purple hover:opacity-90 transition-opacity">
                Dùng thử miễn phí
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
