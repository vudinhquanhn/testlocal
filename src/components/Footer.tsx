
import { Facebook, Twitter, Instagram, Mail } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center mb-4">
              <span className="text-2xl font-bold text-white">VneDoc</span>
              <span className="text-lg ml-1 font-medium text-purple-300">Chat</span>
            </div>
            <p className="text-gray-400 mb-4">
              Giải pháp tra cứu thông minh cho tài liệu tiếng Việt, sử dụng công nghệ AI tiên tiến.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Mail size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-white font-medium mb-4">Sản phẩm</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Tính năng</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Giá cả</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Hướng dẫn sử dụng</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Bảo mật</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-white font-medium mb-4">Công ty</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Về chúng tôi</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Blog</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Đối tác</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Tuyển dụng</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-white font-medium mb-4">Hỗ trợ</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Trung tâm trợ giúp</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Liên hệ</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Điều khoản sử dụng</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Chính sách bảo mật</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-12 pt-8 text-center">
          <p className="text-gray-500">
            © 2025 VneDoc Chat. Tất cả các quyền được bảo lưu.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
