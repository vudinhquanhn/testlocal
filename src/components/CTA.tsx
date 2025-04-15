
import { Button } from "@/components/ui/button";

const CTA = () => {
  return (
    <section className="py-20 bg-gradient-purple">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto animate-fade-in">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Tiết kiệm thời gian và nâng cao hiệu suất làm việc với tài liệu tiếng Việt
          </h2>
          <p className="text-xl text-white/90 mb-10">
            Bắt đầu dùng thử miễn phí 14 ngày, không cần thẻ tín dụng.
          </p>
          <Button className="bg-white text-purple-700 shadow-lg hover:bg-gray-100 transition-colors text-lg py-6 px-8">
            Dùng thử miễn phí ngay
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CTA;
