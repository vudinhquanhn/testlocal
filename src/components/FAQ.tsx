
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "VneDoc Chat hỗ trợ những định dạng tài liệu nào?",
    answer: "VneDoc Chat hỗ trợ nhiều định dạng tài liệu phổ biến bao gồm PDF, DOCX, DOC, TXT, XLSX, CSV và PPTX. Chúng tôi đang không ngừng mở rộng danh sách định dạng được hỗ trợ."
  },
  {
    question: "Tài liệu của tôi có được bảo mật không?",
    answer: "Có, tài liệu của bạn được mã hóa đầu cuối và chỉ bạn mới có quyền truy cập. Chúng tôi không sử dụng dữ liệu của bạn để đào tạo mô hình AI hoặc chia sẻ với bất kỳ bên thứ ba nào. Tài liệu của bạn sẽ được lưu trữ an toàn trên máy chủ của chúng tôi và được xóa khi bạn yêu cầu."
  },
  {
    question: "VneDoc Chat có chính xác không?",
    answer: "VneDoc Chat được thiết kế để cung cấp câu trả lời chính xác dựa trên nội dung tài liệu của bạn. Mỗi câu trả lời đều đi kèm với trích dẫn từ tài liệu gốc, giúp bạn xác minh thông tin. Tuy nhiên, như mọi công nghệ AI, có thể có sai sót, vì vậy chúng tôi khuyến khích bạn kiểm tra trích dẫn nguồn khi cần thiết."
  },
  {
    question: "Tôi có thể sử dụng VneDoc Chat với tài liệu tiếng Anh không?",
    answer: "Mặc dù VneDoc Chat được tối ưu hóa cho tài liệu tiếng Việt, nhưng nó cũng có thể xử lý tài liệu tiếng Anh và nhiều ngôn ngữ khác. Tuy nhiên, hiệu suất tốt nhất đạt được với tài liệu tiếng Việt."
  },
  {
    question: "Có giới hạn kích thước tài liệu không?",
    answer: "Giới hạn kích thước tài liệu phụ thuộc vào gói dịch vụ bạn đăng ký. Gói Cá nhân có giới hạn 10MB cho mỗi tài liệu, gói Chuyên nghiệp là 50MB và gói Doanh nghiệp là 100MB. Nếu bạn cần xử lý tài liệu lớn hơn, vui lòng liên hệ với chúng tôi để được hỗ trợ."
  },
  {
    question: "Tôi có thể hủy đăng ký bất cứ lúc nào không?",
    answer: "Có, bạn có thể hủy đăng ký bất cứ lúc nào. Không có hợp đồng ràng buộc. Nếu bạn hủy, bạn vẫn có thể sử dụng dịch vụ cho đến hết chu kỳ thanh toán hiện tại."
  },
  {
    question: "VneDoc Chat có API không?",
    answer: "Có, chúng tôi cung cấp API cho gói Chuyên nghiệp và Doanh nghiệp. Điều này cho phép bạn tích hợp VneDoc Chat vào ứng dụng hoặc trang web của bạn. Tài liệu API đầy đủ được cung cấp sau khi đăng ký."
  },
  {
    question: "Làm thế nào để liên hệ với bộ phận hỗ trợ?",
    answer: "Bạn có thể liên hệ với đội ngũ hỗ trợ của chúng tôi qua email support@vnedoc.com hoặc sử dụng biểu mẫu liên hệ trên trang web. Đối với khách hàng gói Chuyên nghiệp và Doanh nghiệp, chúng tôi cung cấp hỗ trợ ưu tiên qua chat trực tiếp và điện thoại."
  }
];

const FAQ = () => {
  return (
    <section id="faq" className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Câu hỏi thường gặp</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Tìm câu trả lời cho những câu hỏi phổ biến về VneDoc Chat
          </p>
        </div>

        <div className="max-w-3xl mx-auto animate-fade-in">
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="border border-gray-200 rounded-lg overflow-hidden">
                <AccordionTrigger className="px-6 py-4 text-left hover:bg-gray-50 text-gray-900 font-medium">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="px-6 py-4 text-gray-600">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
