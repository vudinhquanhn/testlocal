
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
      
      // Trích xuất dựa trên cấu trúc thực tế từ ảnh chụp màn hình
      if (result && 
          result.message && 
          result.message.result && 
          Array.isArray(result.message.result) && 
          result.message.result[0] && 
          result.message.result[0].result && 
          result.message.result[0].result.output) {
        
        // Lấy phần content từ output
        const output = result.message.result[0].result.output;
        
        if (output.content) {
          return output.content;
        } else if (typeof output === 'string' && output.includes('"content":')) {
          // Trường hợp output là string JSON
          try {
            const parsedOutput = JSON.parse(output);
            if (parsedOutput.content) {
              return parsedOutput.content;
            }
          } catch (e) {
            // Nếu không phải JSON hợp lệ, thử trích xuất bằng regex
            const contentMatch = output.match(/"content"\s*:\s*"([^"]*)"/);
            if (contentMatch && contentMatch[1]) {
              return contentMatch[1];
            }
          }
        }
      }
      
      // Kiểm tra cấu trúc thay thế
      if (result && 
          result.message && 
          typeof result.message === 'object') {
        
        // Tìm kiếm trường content trong bất kỳ vị trí nào
        const findContent = (obj: any): string | null => {
          if (!obj || typeof obj !== 'object') return null;
          
          if (obj.content) return obj.content;
          
          for (const key in obj) {
            if (typeof obj[key] === 'object') {
              const found = findContent(obj[key]);
              if (found) return found;
            }
          }
          
          return null;
        };
        
        const foundContent = findContent(result.message);
        if (foundContent) return foundContent;
      }
      
      return "Không tìm thấy nội dung tóm tắt trong phản hồi";
    } catch (err) {
      console.error("Lỗi khi trích xuất content:", err);
      return "Lỗi khi trích xuất nội dung";
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
