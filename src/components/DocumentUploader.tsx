
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { FileText, Upload } from "lucide-react";
import { useDocumentUpload } from "@/hooks/useDocumentUpload";
import { FileUploadField } from "@/components/FileUploadField";
import { ResultDisplay } from "@/components/ResultDisplay";

const DocumentUploader = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const {
    selectedFile,
    isUploading,
    result,
    handleFileChange,
    processDocument,
    resetUploader,
  } = useDocumentUpload();

  return (
    <div className="w-full max-w-xl mx-auto">
      <Button
        onClick={() => setIsDialogOpen(true)}
        className="flex items-center gap-2 bg-primary hover:bg-primary/90 text-white"
      >
        <FileText size={18} />
        Tóm tắt tài liệu PDF
      </Button>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Tải lên tài liệu cần tóm tắt</DialogTitle>
          </DialogHeader>

          <div className="space-y-6 py-4">
            {!result ? (
              <div className="space-y-4">
                <FileUploadField 
                  onFileChange={handleFileChange}
                  disabled={isUploading}
                  selectedFile={selectedFile}
                />

                <div className="flex justify-end gap-2">
                  <Button
                    variant="outline"
                    onClick={() => setIsDialogOpen(false)}
                    disabled={isUploading}
                  >
                    Hủy
                  </Button>
                  <Button
                    onClick={processDocument}
                    disabled={!selectedFile || isUploading}
                    className="flex items-center gap-2"
                  >
                    {isUploading ? (
                      <>
                        <div className="h-4 w-4 animate-spin rounded-full border-2 border-gray-300 border-t-white" />
                        Đang xử lý...
                      </>
                    ) : (
                      <>
                        <Upload size={16} />
                        Tải lên và Xử lý
                      </>
                    )}
                  </Button>
                </div>
              </div>
            ) : (
              <ResultDisplay 
                result={result} 
                onClose={() => setIsDialogOpen(false)}
                onReset={resetUploader}
              />
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default DocumentUploader;
