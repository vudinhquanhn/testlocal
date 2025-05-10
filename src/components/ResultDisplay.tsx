
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
  
  // Trích xuất content từ cấu trúc JSON lồng nhau
  const extractContentFromResult = (result: any): string => {
    try {
      if (result && 
          result.result && 
          Array.isArray(result.result) && 
          result.result[0] && 
          result.result[0].result && 
          result.result[0].result.output && 
          result.result[0].result.output.content) {
        return result.result[0].result.output.content;
      }
      return "Không tìm thấy nội dung tóm tắt";
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
