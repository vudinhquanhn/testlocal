
import React from "react";
import { Button } from "@/components/ui/button";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";

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
        <div className="border rounded-md p-4 bg-gray-50 max-h-[400px] overflow-y-auto">
          <h3 className="font-medium mb-2">Kết quả tóm tắt:</h3>
          <pre className="whitespace-pre-wrap text-sm">
            {JSON.stringify(result, null, 2)}
          </pre>
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
