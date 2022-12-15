import { useQuery, useMutation, useQueryClient } from 'react-query';
import { UserAuth } from '../context/authContext';
import { ResponseData } from '../types/types';

const baseURL = import.meta.env.VITE_BASE_URL;
const getSalinTempels = async (): Promise<ResponseData> => {
  return await (await fetch(`${baseURL}/api/salin-tempel`)).json();
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

const likeSalinTempel = async (id: string, userId: string) => {
  return await (
    await fetch(`${baseURL}/api/salin-tempel/${id}/like/${userId}`, {
      method: 'PUT',
    })
  ).json();
};

const removeSalinTempel = async (id: string): Promise<ResponseData> => {
  return await (
    await fetch(`${baseURL}/api/salin-tempel/${id}`, { method: 'DELETE' })
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

export const useLikeSalinTempel = () => {
  const queryClient = useQueryClient();
  const { user } = UserAuth();

  return useMutation(
    async (id: string) => {
      likeSalinTempel(id, user?.email!);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('salin-tempel');
      },
    },
  );
};

export const useCreateSalinTempel = () => {
  const queryClient = useQueryClient();

  return useMutation(createSalinTempel, {
    onSuccess: () => {
      queryClient.invalidateQueries('salin-tempel');
    },
  });
};
