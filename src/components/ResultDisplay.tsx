
import React from "react";
import { Button } from "@/components/ui/button";

interface ResultDisplayProps {
  result: any;
  onClose: () => void;
  onReset: () => void;
}

export const ResultDisplay: React.FC<ResultDisplayProps> = ({ result, onClose, onReset }) => {
  return (
    <div className="space-y-4">
      <div className="border rounded-md p-4 bg-gray-50 max-h-[400px] overflow-y-auto">
        <h3 className="font-medium mb-2">Kết quả tóm tắt:</h3>
        <pre className="whitespace-pre-wrap text-sm">
          {JSON.stringify(result, null, 2)}
        </pre>
      </div>
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
