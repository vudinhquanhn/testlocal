
import React from "react";
import { Input } from "@/components/ui/input";

interface FileUploadFieldProps {
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled: boolean;
  selectedFile: File | null;
}

export const FileUploadField: React.FC<FileUploadFieldProps> = ({ 
  onFileChange, 
  disabled, 
  selectedFile 
}) => {
  return (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <label htmlFor="pdf-file" className="text-sm font-medium">
        Chọn file PDF
      </label>
      <Input
        id="pdf-file"
        type="file"
        accept=".pdf"
        disabled={disabled}
        onChange={onFileChange}
        className="cursor-pointer"
      />
      {selectedFile && (
        <p className="text-sm text-muted-foreground">
          Đã chọn: {selectedFile.name} ({(selectedFile.size / 1024 / 1024).toFixed(2)} MB)
        </p>
      )}
    </div>
  );
};
