
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";

const plans = [
  {
    name: "Cá nhân",
    price: "99.000",
    period: "mỗi tháng",
    description: "Lý tưởng cho người dùng cá nhân và sinh viên",
    features: [
      "Tải lên tối đa 10 tài liệu",
      "Kích thước tài liệu tối đa 10MB",
      "100 câu hỏi mỗi tháng",
      "Hỗ trợ email",
      "Xuất câu trả lời ra PDF"
    ],
    cta: "Bắt đầu dùng thử",
    mostPopular: false
  },
  {
    name: "Chuyên nghiệp",
    price: "249.000",
    period: "mỗi tháng",
    description: "Phù hợp cho chuyên gia và doanh nghiệp nhỏ",
    features: [
      "Tải lên tối đa 50 tài liệu",
      "Kích thước tài liệu tối đa 50MB",
      "500 câu hỏi mỗi tháng",
      "Hỗ trợ ưu tiên",
      "Xuất câu trả lời ra PDF",
      "Tích hợp API cơ bản",
      "Không quảng cáo"
    ],
    cta: "Bắt đầu dùng thử",
    mostPopular: true
  },
  {
    name: "Doanh nghiệp",
    price: "Liên hệ",
    period: "giá tùy chỉnh",
    description: "Dành cho doanh nghiệp lớn với nhu cầu cao",
    features: [
      "Không giới hạn tài liệu",
      "Kích thước tài liệu tối đa 100MB",
      "Câu hỏi không giới hạn",
      "Hỗ trợ 24/7 ưu tiên cao",
      "Tùy chỉnh theo nhu cầu",
      "Tích hợp API đầy đủ",
      "Triển khai trên máy chủ riêng",
      "Quản lý người dùng & phân quyền"
    ],
    cta: "Liên hệ bộ phận kinh doanh",
    mostPopular: false
  }
];

const Pricing = () => {
  return (
    <section id="pricing" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Giá cả phù hợp</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Chọn gói dịch vụ phù hợp với nhu cầu của bạn. Tất cả các gói đều có 14 ngày dùng thử miễn phí.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <div 
              key={index} 
              className={`rounded-xl p-8 bg-white border ${
                plan.mostPopular 
                  ? 'border-purple-400 shadow-purple relative' 
                  : 'border-gray-200 shadow-md'
              } animate-fade-in`}
              style={{ animationDelay: `${index * 150}ms` }}
            >
              {plan.mostPopular && (
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gradient-purple text-white px-4 py-1 rounded-full text-sm font-medium">
                  Phổ biến nhất
                </div>
              )}
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{plan.name}</h3>
              <div className="mb-6">
                <div className="flex items-baseline">
                  {plan.price !== "Liên hệ" ? (
                    <>
                      <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
                      <span className="text-gray-600 ml-2">₫</span>
                    </>
                  ) : (
                    <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
                  )}
                </div>
                <p className="text-gray-500">{plan.period}</p>
              </div>
              <p className="text-gray-600 mb-6">{plan.description}</p>
              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-start">
                    <span className="flex-shrink-0 mt-1">
                      <Check className="h-5 w-5 text-purple-500" />
                    </span>
                    <span className="ml-3 text-gray-600">{feature}</span>
                  </li>
                ))}
              </ul>
              <Button 
                className={`w-full ${
                  plan.mostPopular 
                    ? 'bg-gradient-purple shadow-purple hover:opacity-90' 
                    : 'bg-white border-2 border-purple-300 text-purple-600 hover:bg-purple-50'
                } transition-all`}
                variant={plan.mostPopular ? "default" : "outline"}
              >
                {plan.cta}
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;
