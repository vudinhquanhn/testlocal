
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { uploadDocument, checkDocumentStatus } from "@/services/documentService";

export const useDocumentUpload = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
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
      console.log("Bắt đầu tải lên tài liệu:", selectedFile.name);
      const data = await uploadDocument(selectedFile);
      console.log("Kết quả upload:", data);
      
      if (data.execution_id) {
        setExecutionId(data.execution_id);
        toast({
          title: "Tải lên thành công",
          description: "Đang xử lý tài liệu...",
        });
        checkExecutionStatus(data.execution_id);
      } else if (data.error || data.message !== undefined) {
        // Kiểm tra nếu đây không phải là một lỗi thực sự mà là phản hồi thành công
        const dataMessage = data.message;
        
        // Perform strict null and type check before accessing properties
        if (dataMessage !== null && 
            dataMessage !== undefined &&
            typeof dataMessage === 'object') {
          
          // Additional null check before accessing 'result' property
          if ('result' in dataMessage) {
            // Explicitly cast dataMessage to avoid TypeScript errors with 'result'
            const typedDataMessage = dataMessage as {result: any[]};
            
            // Extra null check here to fix the error
            if (typedDataMessage !== null && 
                typedDataMessage.result !== null && 
                Array.isArray(typedDataMessage.result) && 
                typedDataMessage.result.length > 0) {
              // Nếu có kết quả, coi như thành công
              setResult(data);
              toast({
                title: "Hoàn thành",
                description: "Đã xử lý tài liệu thành công.",
              });
              setIsUploading(false);
              return;
            }
          }
        }
        
        throw new Error(data.error || (data.message !== null && typeof data.message === 'string' ? data.message : 'Lỗi không xác định') || "Không nhận được execution_id từ API");
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
        const data = await checkDocumentStatus(id);
        console.log("Kết quả kiểm tra trạng thái:", data);

        // Kiểm tra các cấu trúc khác nhau của phản hồi thành công
        if (data.status === "completed" || 
            data.status === "success" ||
            (data.message !== null && 
             data.message !== undefined &&
             typeof data.message === 'object')) {
          
          // Additional checks for data.message being an object and having execution_status
          if (data.message !== null && 
              typeof data.message === 'object' && 
              'execution_status' in data.message) {
            
            // Create a typed variable to satisfy TypeScript
            const messageData = data.message as {execution_status: string};
            
            if (messageData.execution_status !== null &&
                messageData.execution_status === "COMPLETED") {
              setResult(data);
              toast({
                title: "Hoàn thành",
                description: "Đã xử lý tài liệu thành công.",
              });
              setIsPolling(false);
              setIsUploading(false);
              return;
            }
          }
          
          // If we reached here with a completed/success status but no execution_status
          if (data.status === "completed" || data.status === "success") {
            setResult(data);
            toast({
              title: "Hoàn thành",
              description: "Đã xử lý tài liệu thành công.",
            });
            setIsPolling(false);
            setIsUploading(false);
            return;
          }
        } else if (data.status === "failed" || data.status === "error") {
          toast({
            title: "Xử lý thất bại",
            description: data.message !== null && data.message !== undefined && typeof data.message === 'string' ? data.message : "Không thể xử lý tài liệu.",
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

  return {
    selectedFile,
    isUploading,
    result,
    executionId,
    isPolling,
    handleFileChange,
    processDocument,
    resetUploader,
  };
};
