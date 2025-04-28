import { ENDPOINT } from '@/constants/api.constants';
import axiosInstance from '../axios';

export const getTemplateByIdService = async (id: string) => {
  return await axiosInstance.get(ENDPOINT.getEmailTemplateById(id));
};
