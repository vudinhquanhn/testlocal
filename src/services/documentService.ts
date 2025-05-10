
const API_BASE_URL = "http://frontend.unstract.localhost:90/deployment/api/mock_org/tomtat/";
const AUTH_TOKEN = "48ea2c2d-0433-4767-9df8-ddba844e125e";

interface UploadResponse {
  execution_id?: string;
  status?: string;
  error?: string;
}

export const uploadDocument = async (file: File): Promise<UploadResponse> => {
  try {
    const formData = new FormData();
    formData.append("files", file);
    formData.append("timeout", "300");
    formData.append("include_metadata", "False");
    formData.append("include_metrics", "False");

    const response = await fetch(API_BASE_URL, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${AUTH_TOKEN}`,
      },
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`Lỗi: ${response.status} ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Lỗi khi tải lên:", error);
    throw error;
  }
};

export const checkDocumentStatus = async (executionId: string): Promise<UploadResponse> => {
  try {
    const statusUrl = `${API_BASE_URL}?execution_id=${executionId}&include_metadata=False&include_metrics=False`;
    const response = await fetch(statusUrl, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${AUTH_TOKEN}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Lỗi: ${response.status} ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Lỗi khi kiểm tra trạng thái:", error);
    throw error;
  }
};
