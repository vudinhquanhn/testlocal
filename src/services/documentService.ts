
// Updated API URL to use localhost directly
const API_BASE_URL = "http://localhost:90/deployment/api/mock_org/tomtat/";
const AUTH_TOKEN = "48ea2c2d-0433-4767-9df8-ddba844e125e";

interface UploadResponse {
  execution_id?: string;
  status?: string;
  error?: string;
  message?: string;
}

export const uploadDocument = async (file: File): Promise<UploadResponse> => {
  try {
    const formData = new FormData();
    formData.append("files", file);
    formData.append("timeout", "300");
    formData.append("include_metadata", "False");
    formData.append("include_metrics", "False");

    console.log("Sending request to:", API_BASE_URL);
    
    // Increased timeout for fetch with AbortController
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 30000); // 30 second timeout
    
    const response = await fetch(API_BASE_URL, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${AUTH_TOKEN}`,
      },
      body: formData,
      signal: controller.signal
    });
    
    clearTimeout(timeoutId);

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Server error response:", {
        status: response.status,
        statusText: response.statusText,
        body: errorText
      });
      
      throw new Error(`Lỗi máy chủ: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    console.log("Upload response:", data);
    return data;
  } catch (error) {
    console.error("Chi tiết lỗi khi tải lên:", error);
    
    // More descriptive error messages based on error type
    if (error instanceof TypeError && error.message.includes("Failed to fetch")) {
      throw new Error("Không thể kết nối đến máy chủ. Vui lòng kiểm tra kết nối mạng hoặc cấu hình API.");
    } else if (error instanceof DOMException && error.name === "AbortError") {
      throw new Error("Yêu cầu đã hết thời gian chờ. Vui lòng thử lại sau.");
    }
    
    throw error;
  }
};

export const checkDocumentStatus = async (executionId: string): Promise<UploadResponse> => {
  try {
    const statusUrl = `${API_BASE_URL}?execution_id=${executionId}&include_metadata=False&include_metrics=False`;
    console.log("Checking status at:", statusUrl);
    
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 30000); // 30 second timeout
    
    const response = await fetch(statusUrl, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${AUTH_TOKEN}`,
      },
      signal: controller.signal
    });
    
    clearTimeout(timeoutId);

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Status check error response:", {
        status: response.status,
        statusText: response.statusText,
        body: errorText
      });
      
      throw new Error(`Lỗi kiểm tra trạng thái: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    console.log("Status check response:", data);
    return data;
  } catch (error) {
    console.error("Chi tiết lỗi khi kiểm tra trạng thái:", error);
    
    // More descriptive error messages based on error type
    if (error instanceof TypeError && error.message.includes("Failed to fetch")) {
      throw new Error("Không thể kết nối đến máy chủ khi kiểm tra trạng thái. Vui lòng kiểm tra kết nối mạng.");
    } else if (error instanceof DOMException && error.name === "AbortError") {
      throw new Error("Kiểm tra trạng thái đã hết thời gian chờ. Vui lòng thử lại sau.");
    }
    
    throw error;
  }
};
