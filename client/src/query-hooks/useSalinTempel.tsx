import { useQuery, useMutation, useQueryClient } from 'react-query';
import { ResponseData } from '../types/types';

const baseURL = 'https://salintempel-production.up.railway.app';
const getSalinTempels = async (): Promise<ResponseData> => {
  return await (await fetch(`${baseURL}/api/salin-tempel`)).json();
};

const removeSalinTempel = async (id: string): Promise<ResponseData> => {
  return await (
    await fetch(`${baseURL}/api/salin-tempel/${id}`, { method: 'DELETE' })
  ).json();
};

const createSalinTempel = async (data: {
  title: string;
  content: string;
  author?: string;
}): Promise<ResponseData> => {
  return await (
    await fetch(`${baseURL}/api/salin-tempel`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
  ).json();
};

export const useGetSalinTempels = () => {
  return useQuery('salin-tempel', getSalinTempels);
};

export const useRemoveSalinTempel = () => {
  const queryClient = useQueryClient();

  return useMutation(removeSalinTempel, {
    onSuccess: () => {
      queryClient.invalidateQueries('salin-tempel');
    },
  });
};

export const useCreateSalinTempel = () => {
  const queryClient = useQueryClient();

  return useMutation(createSalinTempel, {
    onSuccess: () => {
      queryClient.invalidateQueries('salin-tempel');
    },
  });
};
