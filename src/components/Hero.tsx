
import { Button } from "@/components/ui/button";

const Hero = () => {
  return (
    <section className="relative pt-28 pb-20 overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden z-0">
        <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-purple-100 opacity-50"></div>
        <div className="absolute top-1/2 -left-40 w-96 h-96 rounded-full bg-purple-100 opacity-50"></div>
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-4xl mx-auto animate-fade-in">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-gray-900 mb-6">
            Tra cứu tài liệu tiếng Việt <span className="text-purple-500">thông minh</span> với AI
          </h1>
          <p className="text-xl text-gray-600 mb-10 max-w-3xl mx-auto">
            Tải lên tài liệu của bạn và đặt câu hỏi bằng tiếng Việt. 
            VneDoc Chat sẽ cung cấp câu trả lời nhanh chóng và chính xác dựa trên nội dung tài liệu.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button className="bg-gradient-purple shadow-purple text-lg py-6 px-8 hover:opacity-90 transition-opacity">
              Dùng thử miễn phí
            </Button>
            <Button variant="outline" className="border-2 border-purple-300 text-purple-600 text-lg py-6 px-8 hover:bg-purple-50 transition-colors">
              Tìm hiểu thêm
            </Button>
          </div>
        </div>

        {/* Hero image */}
        <div className="mt-16 max-w-5xl mx-auto animate-slide-up">
          <div className="rounded-2xl overflow-hidden shadow-xl border border-gray-200">
            <img 
              src="https://placehold.co/1200x800/f2f0fb/9b87f5" 
              alt="VneDoc Chat Demo" 
              className="w-full h-auto"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
