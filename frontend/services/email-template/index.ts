import { ENDPOINT } from '@/constants/api.constants';
import axiosInstance from '../axios';

export const getTemplateByIdService = async (id: string) => {
  return await axiosInstance.get(ENDPOINT.getEmailTemplateById(id));
};

export const delTemplateByIdService = async (id: string) => {
  return await axiosInstance.delete(ENDPOINT.getEmailTemplateById(id));
};

export const getAllTemplatesService = async (page: number) => {
  return await axiosInstance.get(ENDPOINT.emailTemplates, {
    params: { page, limit: 10 },
  });
};
