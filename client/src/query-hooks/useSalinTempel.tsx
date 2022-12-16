import { useMutation, useQueryClient, useInfiniteQuery } from 'react-query';
import { UserAuth } from '../context/authContext';
import { ResponseData, ResponseDataGetAll } from '../types/types';

const baseURL = import.meta.env.VITE_BASE_URL;

const getSalinTempels = async ({
  pageParam = `${baseURL}/api/salin-tempel`,
}): Promise<ResponseDataGetAll> => {
  return await (await fetch(pageParam)).json();
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
  return useInfiniteQuery('salin-tempel', getSalinTempels, {
    getNextPageParam: (lastPage) => lastPage.next,
  });
};

export const useRemoveSalinTempel = () => {
  const queryClient = useQueryClient();
  return useMutation(removeSalinTempel, {
    onSuccess: () => {
      queryClient.invalidateQueries('salin-tempel');
    },
  });
};

export const useGetSalinTempelSort = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      isSortNew,
      isSortPopular,
    }: {
      [key: string]: boolean;
    }) => {
      const formattedParams = () => {
        const params: {
          [key: string]: string;
        } = {
          sort: isSortNew ? 'new' : '',
          type: isSortPopular ? 'popular' : '',
        };
        // loop through params and remove empty values
        Object.keys(params).forEach((key) => {
          if (!params[key]) {
            delete params[key];
          }
        });
        // if params key is empty, return empty string and if not return params in format of query string
        return Object.keys(params).length === 0
          ? ''
          : `?${new URLSearchParams(params).toString()}`;
      };
      const data = await getSalinTempels({
        pageParam: `${baseURL}/api/salin-tempel/${formattedParams()}`,
      });
      return data;
    },
    onSuccess: (response) => {
      queryClient.setQueryData('salin-tempel', {
        pages: [response],
      });
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
