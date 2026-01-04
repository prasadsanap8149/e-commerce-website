import apiClient, { extractErrorMessage, ApiError } from "@/config/apiClient";

export interface Enquiry {
  id?: number;
  name: string;
  email: string;
  phone: string;
  message: string;
  productId?: string | number;
  status?: "PENDING" | "REVIEWED" | "RESOLVED";
  createdAt?: string;
  updatedAt?: string;
}

// Type alias for creating new enquiries
export type EnquiryRequest = Omit<Enquiry, 'id' | 'status' | 'createdAt' | 'updatedAt'>;

export interface EnquiryPage {
  content: Enquiry[];
  totalPages: number;
  totalElements: number;
  size: number;
  number: number;
}

// Validation constants
const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const PHONE_REGEX = /^[+]?[0-9\-\s()]{7,20}$/;

// Validation helper
const validateEnquiry = (enquiry: EnquiryRequest): void => {
  if (!enquiry.name?.trim()) {
    throw new ApiError("Name is required", 400, "VALIDATION_ERROR");
  }
  if (enquiry.name.trim().length < 2 || enquiry.name.trim().length > 100) {
    throw new ApiError("Name must be between 2 and 100 characters", 400, "VALIDATION_ERROR");
  }
  
  if (!enquiry.email?.trim()) {
    throw new ApiError("Email is required", 400, "VALIDATION_ERROR");
  }
  if (!EMAIL_REGEX.test(enquiry.email.trim())) {
    throw new ApiError("Please provide a valid email address", 400, "VALIDATION_ERROR");
  }
  
  if (!enquiry.phone?.trim()) {
    throw new ApiError("Phone number is required", 400, "VALIDATION_ERROR");
  }
  if (!PHONE_REGEX.test(enquiry.phone.trim())) {
    throw new ApiError("Please provide a valid phone number", 400, "VALIDATION_ERROR");
  }
  
  if (!enquiry.message?.trim()) {
    throw new ApiError("Message is required", 400, "VALIDATION_ERROR");
  }
  if (enquiry.message.trim().length < 10 || enquiry.message.trim().length > 5000) {
    throw new ApiError("Message must be between 10 and 5000 characters", 400, "VALIDATION_ERROR");
  }
};

// Sanitize enquiry data
const sanitizeEnquiry = (enquiry: EnquiryRequest): EnquiryRequest => ({
  name: enquiry.name.trim(),
  email: enquiry.email.trim().toLowerCase(),
  phone: enquiry.phone.trim().replace(/[^0-9+\-()\s]/g, ""),
  message: enquiry.message.trim(),
  productId: enquiry.productId,
});

// Type guard for Enquiry
const isValidEnquiry = (data: unknown): data is Enquiry => {
  if (!data || typeof data !== "object") return false;
  const enquiry = data as Enquiry;
  return (
    typeof enquiry.name === "string" &&
    typeof enquiry.email === "string"
  );
};

// Type guard for EnquiryPage
const isValidEnquiryPage = (data: unknown): data is EnquiryPage => {
  if (!data || typeof data !== "object") return false;
  const page = data as EnquiryPage;
  return (
    Array.isArray(page.content) &&
    typeof page.totalPages === "number" &&
    typeof page.totalElements === "number"
  );
};

export const enquiryService = {
  // Submit a new enquiry
  submitEnquiry: async (enquiry: EnquiryRequest): Promise<Enquiry> => {
    try {
      // Validate before sending
      validateEnquiry(enquiry);
      
      // Sanitize data
      const sanitizedEnquiry = sanitizeEnquiry(enquiry);
      
      const response = await apiClient.post<Enquiry>("/enquiries", sanitizedEnquiry);
      
      if (!isValidEnquiry(response.data)) {
        throw new ApiError("Invalid response data", 500, "INVALID_DATA");
      }
      
      return response.data;
    } catch (error) {
      if (error instanceof ApiError) throw error;
      console.error("Error submitting enquiry:", extractErrorMessage(error));
      throw new ApiError(
        extractErrorMessage(error),
        error instanceof ApiError ? error.status : 500,
        "SUBMIT_ENQUIRY_ERROR"
      );
    }
  },

  // Get all enquiries (admin) - paginated
  getEnquiries: async (page: number = 1, size: number = 10): Promise<EnquiryPage> => {
    try {
      // Validate and sanitize pagination params
      const sanitizedPage = Math.max(1, Math.floor(page));
      const sanitizedSize = Math.max(1, Math.min(100, Math.floor(size)));
      
      const response = await apiClient.get<EnquiryPage>("/enquiries", {
        params: { page: sanitizedPage, size: sanitizedSize },
      });
      
      if (!isValidEnquiryPage(response.data)) {
        console.warn("Invalid enquiry page data received");
        return {
          content: [],
          totalPages: 0,
          totalElements: 0,
          size: sanitizedSize,
          number: sanitizedPage - 1,
        };
      }
      
      return response.data;
    } catch (error) {
      console.error("Error fetching enquiries:", extractErrorMessage(error));
      throw new ApiError(
        extractErrorMessage(error),
        error instanceof ApiError ? error.status : 500,
        "FETCH_ENQUIRIES_ERROR"
      );
    }
  },

  // Get enquiry by ID (admin)
  getEnquiryById: async (id: string | number): Promise<Enquiry> => {
    if (!id) {
      throw new ApiError("Enquiry ID is required", 400, "INVALID_ID");
    }
    
    try {
      const response = await apiClient.get<Enquiry>(`/enquiries/${encodeURIComponent(String(id))}`);
      
      if (!isValidEnquiry(response.data)) {
        throw new ApiError("Invalid enquiry data received", 500, "INVALID_DATA");
      }
      
      return response.data;
    } catch (error) {
      if (error instanceof ApiError) throw error;
      console.error(`Error fetching enquiry ${id}:`, extractErrorMessage(error));
      throw new ApiError(
        extractErrorMessage(error),
        error instanceof ApiError ? error.status : 500,
        "FETCH_ENQUIRY_ERROR"
      );
    }
  },

  // Get enquiries by status (admin)
  getEnquiriesByStatus: async (
    status: "PENDING" | "REVIEWED" | "RESOLVED",
    page: number = 1,
    size: number = 10
  ): Promise<EnquiryPage> => {
    // Validate status
    const validStatuses = ["PENDING", "REVIEWED", "RESOLVED"];
    if (!validStatuses.includes(status)) {
      throw new ApiError(
        `Invalid status. Must be one of: ${validStatuses.join(", ")}`,
        400,
        "INVALID_STATUS"
      );
    }
    
    try {
      const sanitizedPage = Math.max(1, Math.floor(page));
      const sanitizedSize = Math.max(1, Math.min(100, Math.floor(size)));
      
      const response = await apiClient.get<EnquiryPage>(`/enquiries/status/${status}`, {
        params: { page: sanitizedPage, size: sanitizedSize },
      });
      
      if (!isValidEnquiryPage(response.data)) {
        console.warn("Invalid enquiry page data received");
        return {
          content: [],
          totalPages: 0,
          totalElements: 0,
          size: sanitizedSize,
          number: sanitizedPage - 1,
        };
      }
      
      return response.data;
    } catch (error) {
      console.error(`Error fetching enquiries with status ${status}:`, extractErrorMessage(error));
      throw new ApiError(
        extractErrorMessage(error),
        error instanceof ApiError ? error.status : 500,
        "FETCH_ENQUIRIES_BY_STATUS_ERROR"
      );
    }
  },

  // Update enquiry status (admin)
  updateEnquiryStatus: async (
    id: string | number,
    status: "PENDING" | "REVIEWED" | "RESOLVED"
  ): Promise<Enquiry> => {
    if (!id) {
      throw new ApiError("Enquiry ID is required", 400, "INVALID_ID");
    }
    
    const validStatuses = ["PENDING", "REVIEWED", "RESOLVED"];
    if (!validStatuses.includes(status)) {
      throw new ApiError(
        `Invalid status. Must be one of: ${validStatuses.join(", ")}`,
        400,
        "INVALID_STATUS"
      );
    }
    
    try {
      const response = await apiClient.put<Enquiry>(
        `/enquiries/${encodeURIComponent(String(id))}/status`,
        null,
        { params: { status } }
      );
      
      if (!isValidEnquiry(response.data)) {
        throw new ApiError("Invalid enquiry data received", 500, "INVALID_DATA");
      }
      
      return response.data;
    } catch (error) {
      if (error instanceof ApiError) throw error;
      console.error(`Error updating enquiry ${id} status:`, extractErrorMessage(error));
      throw new ApiError(
        extractErrorMessage(error),
        error instanceof ApiError ? error.status : 500,
        "UPDATE_ENQUIRY_STATUS_ERROR"
      );
    }
  },

  // Delete enquiry (admin)
  deleteEnquiry: async (id: string | number): Promise<void> => {
    if (!id) {
      throw new ApiError("Enquiry ID is required", 400, "INVALID_ID");
    }
    
    try {
      await apiClient.delete(`/enquiries/${encodeURIComponent(String(id))}`);
    } catch (error) {
      console.error(`Error deleting enquiry ${id}:`, extractErrorMessage(error));
      throw new ApiError(
        extractErrorMessage(error),
        error instanceof ApiError ? error.status : 500,
        "DELETE_ENQUIRY_ERROR"
      );
    }
  },
};
