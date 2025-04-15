
import { UploadCloud, MessageCircle, ThumbsUp } from "lucide-react";

const steps = [
  {
    icon: <UploadCloud className="w-10 h-10 text-white" />,
    title: "Tải lên tài liệu",
    description: "Tải lên tài liệu của bạn ở định dạng PDF, DOCX hoặc TXT. Hệ thống sẽ xử lý và chuẩn bị tài liệu cho việc tra cứu."
  },
  {
    icon: <MessageCircle className="w-10 h-10 text-white" />,
    title: "Đặt câu hỏi bằng tiếng Việt",
    description: "Hỏi bất kỳ câu hỏi nào liên quan đến nội dung tài liệu bằng ngôn ngữ tự nhiên."
  },
  {
    icon: <ThumbsUp className="w-10 h-10 text-white" />,
    title: "Nhận câu trả lời ngay lập tức",
    description: "Nhận câu trả lời chính xác với trích dẫn từ tài liệu gốc, giúp bạn dễ dàng kiểm tra thông tin."
  }
];

const HowItWorks = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Cách VneDoc Chat hoạt động</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Chỉ với 3 bước đơn giản, bạn có thể bắt đầu tra cứu thông tin từ tài liệu của mình.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {steps.map((step, index) => (
            <div 
              key={index} 
              className="flex flex-col items-center text-center animate-fade-in"
              style={{ animationDelay: `${index * 200}ms` }}
            >
              <div className="mb-6 bg-gradient-purple w-20 h-20 rounded-full flex items-center justify-center shadow-purple">
                {step.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">{step.title}</h3>
              <p className="text-gray-600">{step.description}</p>
              
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-1/2">
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-gray-300">
                    <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
