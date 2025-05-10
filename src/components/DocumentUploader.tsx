
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { FileText, Upload } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const DocumentUploader = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [executionId, setExecutionId] = useState<string | null>(null);
  const [isPolling, setIsPolling] = useState(false);
  const { toast } = useToast();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      if (file.type === "application/pdf") {
        setSelectedFile(file);
      } else {
        toast({
          title: "Lỗi định dạng",
          description: "Vui lòng chọn tệp PDF.",
          variant: "destructive",
        });
      }
    }
  };

  const processDocument = async () => {
    if (!selectedFile) {
      toast({
        title: "Lỗi",
        description: "Vui lòng chọn tệp PDF trước khi tải lên.",
        variant: "destructive",
      });
      return;
    }

    setIsUploading(true);
    setResult(null);
    
    try {
      const formData = new FormData();
      formData.append("files", selectedFile);
      formData.append("timeout", "300");
      formData.append("include_metadata", "False");
      formData.append("include_metrics", "False");

      const response = await fetch("http://frontend.unstract.localhost/deployment/api/mock_org/tomtat/", {
        method: "POST",
        headers: {
          "Authorization": "Bearer 48ea2c2d-0433-4767-9df8-ddba844e125e",
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`Lỗi: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      console.log("Kết quả upload:", data);
      
      if (data.execution_id) {
        setExecutionId(data.execution_id);
        toast({
          title: "Tải lên thành công",
          description: "Đang xử lý tài liệu...",
        });
        checkExecutionStatus(data.execution_id);
      } else {
        throw new Error("Không nhận được execution_id từ API");
      }
    } catch (error) {
      console.error("Lỗi khi tải lên:", error);
      toast({
        title: "Lỗi khi tải lên",
        description: error instanceof Error ? error.message : "Đã xảy ra lỗi không xác định",
        variant: "destructive",
      });
      setIsUploading(false);
    }
  };

  const checkExecutionStatus = async (id: string) => {
    setIsPolling(true);
    let attempts = 0;
    const maxAttempts = 30; // Thử tối đa 30 lần
    const interval = 2000; // Mỗi 2 giây

    const pollStatus = async () => {
      if (attempts >= maxAttempts) {
        toast({
          title: "Timeout",
          description: "Quá thời gian chờ xử lý tài liệu.",
          variant: "destructive",
        });
        setIsPolling(false);
        setIsUploading(false);
        return;
      }

      try {
        const statusUrl = `http://frontend.unstract.localhost/deployment/api/mock_org/tomtat/?execution_id=${id}&include_metadata=False&include_metrics=False`;
        const response = await fetch(statusUrl, {
          method: "GET",
          headers: {
            "Authorization": "Bearer 48ea2c2d-0433-4767-9df8-ddba844e125e",
          },
        });

        if (!response.ok) {
          throw new Error(`Lỗi: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        console.log("Kết quả kiểm tra trạng thái:", data);

        if (data.status === "completed" || data.status === "success") {
          setResult(data);
          toast({
            title: "Hoàn thành",
            description: "Đã xử lý tài liệu thành công.",
          });
          setIsPolling(false);
          setIsUploading(false);
          return;
        } else if (data.status === "failed" || data.status === "error") {
          toast({
            title: "Xử lý thất bại",
            description: "Không thể xử lý tài liệu.",
            variant: "destructive",
          });
          setIsPolling(false);
          setIsUploading(false);
          return;
        }

        // Tiếp tục kiểm tra nếu chưa hoàn thành
        attempts++;
        setTimeout(pollStatus, interval);
      } catch (error) {
        console.error("Lỗi khi kiểm tra trạng thái:", error);
        toast({
          title: "Lỗi kiểm tra trạng thái",
          description: error instanceof Error ? error.message : "Đã xảy ra lỗi không xác định",
          variant: "destructive",
        });
        setIsPolling(false);
        setIsUploading(false);
      }
    };

    pollStatus();
  };

  const resetUploader = () => {
    setSelectedFile(null);
    setResult(null);
    setExecutionId(null);
  };

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
                <div className="grid w-full max-w-sm items-center gap-1.5">
                  <label htmlFor="pdf-file" className="text-sm font-medium">
                    Chọn file PDF
                  </label>
                  <Input
                    id="pdf-file"
                    type="file"
                    accept=".pdf"
                    disabled={isUploading}
                    onChange={handleFileChange}
                    className="cursor-pointer"
                  />
                  {selectedFile && (
                    <p className="text-sm text-muted-foreground">
                      Đã chọn: {selectedFile.name} ({(selectedFile.size / 1024 / 1024).toFixed(2)} MB)
                    </p>
                  )}
                </div>

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
              <div className="space-y-4">
                <div className="border rounded-md p-4 bg-gray-50 max-h-[400px] overflow-y-auto">
                  <h3 className="font-medium mb-2">Kết quả tóm tắt:</h3>
                  <pre className="whitespace-pre-wrap text-sm">
                    {JSON.stringify(result, null, 2)}
                  </pre>
                </div>
                <div className="flex justify-end gap-2">
                  <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                    Đóng
                  </Button>
                  <Button onClick={resetUploader}>
                    Tải lên tài liệu khác
                  </Button>
                </div>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default DocumentUploader;
