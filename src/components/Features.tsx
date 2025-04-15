
import { MessageSquare, Search, Languages, FileText, Shield, Zap } from "lucide-react";

const features = [
  {
    icon: <FileText className="w-12 h-12 text-purple-400" />,
    title: "Hỗ trợ nhiều định dạng tài liệu",
    description: "Tải lên tài liệu PDF, DOCX, TXT và nhiều định dạng khác. VneDoc Chat sẽ tự động xử lý và phân tích nội dung."
  },
  {
    icon: <Languages className="w-12 h-12 text-purple-400" />,
    title: "Hiểu tiếng Việt tự nhiên",
    description: "Hệ thống được tối ưu để hiểu và xử lý ngôn ngữ tiếng Việt, bao gồm các cách diễn đạt phức tạp và thuật ngữ chuyên ngành."
  },
  {
    icon: <MessageSquare className="w-12 h-12 text-purple-400" />,
    title: "Trả lời chính xác và trích dẫn nguồn",
    description: "Mọi câu trả lời đều được cung cấp cùng với trích dẫn từ tài liệu gốc, giúp bạn dễ dàng kiểm tra thông tin."
  },
  {
    icon: <Search className="w-12 h-12 text-purple-400" />,
    title: "Tìm kiếm thông minh",
    description: "Không chỉ tìm kiếm từ khóa đơn giản, VneDoc Chat còn hiểu ngữ cảnh và ý định trong câu hỏi của bạn."
  },
  {
    icon: <Shield className="w-12 h-12 text-purple-400" />,
    title: "Bảo mật dữ liệu",
    description: "Tài liệu của bạn được mã hóa và bảo mật. Chúng tôi không sử dụng dữ liệu của bạn để huấn luyện AI hoặc chia sẻ với bên thứ ba."
  },
  {
    icon: <Zap className="w-12 h-12 text-purple-400" />,
    title: "Phản hồi nhanh chóng",
    description: "Nhận câu trả lời trong vài giây, giúp bạn tiết kiệm thời gian và tăng hiệu quả công việc."
  }
];

const Features = () => {
  return (
    <section id="features" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Tính năng nổi bật</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            VneDoc Chat giúp bạn trích xuất thông tin từ tài liệu tiếng Việt một cách nhanh chóng và hiệu quả.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="bg-white rounded-xl p-8 shadow-md border border-gray-100 hover:shadow-purple transition-shadow animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="mb-5 inline-block bg-purple-50 p-3 rounded-lg">{feature.icon}</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
