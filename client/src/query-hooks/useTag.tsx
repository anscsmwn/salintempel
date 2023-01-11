import { useQuery } from 'react-query';
import { ResponseDataTagGetAll } from '../types/types';

const baseURL = import.meta.env.VITE_BASE_URL;

const getTags = async (): Promise<ResponseDataTagGetAll> => {
  return await (await fetch(`${baseURL}/api/salin-tempel-tag`)).json();
};

export const useGetTags = () => {
  return useQuery('tags', getTags);
};
