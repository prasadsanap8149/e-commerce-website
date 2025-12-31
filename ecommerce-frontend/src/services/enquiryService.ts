import apiClient from "@/config/apiClient";

export interface Enquiry {
  id?: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  productId?: string;
  status?: "pending" | "reviewed" | "resolved";
  createdAt?: string;
}

export const enquiryService = {
  submitEnquiry: async (enquiry: Enquiry) => {
    const response = await apiClient.post<Enquiry>("/enquiries", enquiry);
    return response.data;
  },

  getEnquiries: async (page: number = 1, limit: number = 10) => {
    const response = await apiClient.get<{ data: Enquiry[]; total: number }>("/enquiries", {
      params: { page, limit },
    });
    return response.data;
  },

  getEnquiryById: async (id: string) => {
    const response = await apiClient.get<Enquiry>(`/enquiries/${id}`);
    return response.data;
  },

  updateEnquiry: async (id: string, enquiry: Partial<Enquiry>) => {
    const response = await apiClient.put<Enquiry>(`/enquiries/${id}`, enquiry);
    return response.data;
  },
};
