
import React from "react";
import { Button } from "@/components/ui/button";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Textarea } from "@/components/ui/textarea";

interface ResultDisplayProps {
  result: any;
  onClose: () => void;
  onReset: () => void;
}

export const ResultDisplay: React.FC<ResultDisplayProps> = ({ result, onClose, onReset }) => {
  // Kiểm tra xem có kết quả hợp lệ không
  const hasValidResult = result && typeof result === 'object';
  
  // Kiểm tra xem có phải là thông báo lỗi không
  const isErrorResult = hasValidResult && (result.error || result.status === "failed" || result.status === "error");
  
  // Trích xuất content từ cấu trúc JSON lồng nhau dựa trên cấu trúc thực tế
  const extractContentFromResult = (result: any): string => {
    try {
      console.log("Đang phân tích kết quả:", JSON.stringify(result, null, 2));
      
      // Kiểm tra nếu có message object
      if (result && result.message) {
        // Kiểm tra cấu trúc có field result là array
        if (result.message.result && Array.isArray(result.message.result) && result.message.result.length > 0) {
          const firstResult = result.message.result[0];
          
          // Kiểm tra nếu có field result.output
          if (firstResult.result && firstResult.result.output) {
            const output = firstResult.result.output;
            
            // Trường hợp output là chuỗi có chứa JSON với \n và \"content\":
            if (typeof output === 'string') {
              // Từ hình ảnh, chúng ta thấy output có dạng: "Tóm tắt nội dung_1: "{\n \"content\": {\n..."
              const contentMatch = output.match(/\"content\"\s*:\s*\{([\s\S]*?)\}/);
              if (contentMatch && contentMatch[0]) {
                // Trích xuất nội dung content
                try {
                  // Parse phần JSON có dạng "content": {...}
                  const contentJson = `{${contentMatch[0]}}`;
                  const parsed = JSON.parse(contentJson.replace(/\\n/g, '').replace(/\\"/g, '"'));
                  if (parsed.content) {
                    return parsed.content;
                  }
                } catch (e) {
                  console.error("Lỗi khi parse JSON từ chuỗi:", e);
                }
              }
              
              // Nếu không tìm thấy theo cấu trúc trên, thử tìm text giữa dấu ngoặc kép sau \"content\":
              const simpleMatch = output.match(/\"content\"\s*:\s*\"([\s\S]*?)\"/);
              if (simpleMatch && simpleMatch[1]) {
                return simpleMatch[1].replace(/\\n/g, '\n').replace(/\\"/g, '"');
              }
              
              // Trả về output nếu không thể trích xuất
              return output;
            }
            
            // Nếu output là object
            if (typeof output === 'object' && output !== null) {
              if (output.content) {
                return output.content;
              }
            }
          }
        }
        
        // Tìm kiếm bất kỳ trường content nào trong message
        const findContentRecursively = (obj: any): string | null => {
          if (!obj || typeof obj !== 'object') return null;
          
          // Kiểm tra trường hợp đặc biệt cho chuỗi output như trong hình ảnh
          if (obj.output && typeof obj.output === 'string' && obj.output.includes('"content"')) {
            const match = obj.output.match(/\"content\"\s*:\s*\"([\s\S]*?)\"/);
            if (match && match[1]) {
              return match[1].replace(/\\n/g, '\n').replace(/\\"/g, '"');
            }
          }
          
          // Kiểm tra nếu đối tượng hiện tại có trường content
          if (obj.content !== undefined) return obj.content;
          
          // Tìm kiếm đệ quy trong tất cả các trường của đối tượng
          for (const key in obj) {
            if (typeof obj[key] === 'object' && obj[key] !== null) {
              const found = findContentRecursively(obj[key]);
              if (found !== null) return found;
            }
          }
          
          return null;
        };
        
        const foundContent = findContentRecursively(result.message);
        if (foundContent) return foundContent;
      }
      
      // Trường hợp cuối cùng: hiển thị toàn bộ output để người dùng có thể thấy dữ liệu
      if (result && 
          result.message && 
          result.message.result && 
          Array.isArray(result.message.result) && 
          result.message.result[0] && 
          result.message.result[0].result && 
          result.message.result[0].result.output) {
        
        return typeof result.message.result[0].result.output === 'string' 
          ? result.message.result[0].result.output
          : JSON.stringify(result.message.result[0].result.output, null, 2);
      }
      
      return "Không tìm thấy nội dung tóm tắt trong phản hồi";
    } catch (err) {
      console.error("Lỗi khi trích xuất content:", err);
      return JSON.stringify(result, null, 2); // Trả về toàn bộ kết quả để debug
    }
  };
  
  const contentText = hasValidResult && !isErrorResult ? extractContentFromResult(result) : "";
  
  return (
    <div className="space-y-4">
      {!hasValidResult ? (
        <Alert variant="destructive">
          <AlertTitle>Lỗi kết quả</AlertTitle>
          <AlertDescription>
            Không thể hiển thị kết quả. Định dạng kết quả không hợp lệ.
          </AlertDescription>
        </Alert>
      ) : isErrorResult ? (
        <Alert variant="destructive">
          <AlertTitle>Xử lý không thành công</AlertTitle>
          <AlertDescription>
            {result.message || result.error || "Đã xảy ra lỗi khi xử lý tài liệu."}
          </AlertDescription>
        </Alert>
      ) : (
        <div className="space-y-3">
          <h3 className="font-medium">Nội dung tóm tắt:</h3>
          <Textarea 
            value={contentText} 
            readOnly 
            className="min-h-[200px] font-normal text-sm"
          />
        </div>
      )}
      <div className="flex justify-end gap-2">
        <Button variant="outline" onClick={onClose}>
          Đóng
        </Button>
        <Button onClick={onReset}>
          Tải lên tài liệu khác
        </Button>
      </div>
    </div>
  );
};
