import { useQuery } from 'react-query';

type SalinTempel = {
  content: string;
  like: number;
  title: string;
  _id: string;
};

type ResponseData = {
  data: SalinTempel[];
  end_point: string;
  method: string;
  status: string;
  total: number;
};
const baseURL = 'https://salintempel-production.up.railway.app';
const getSalinTempels = async (): Promise<ResponseData> => {
  return await (await fetch(`${baseURL}/api/salin-tempel`)).json();
};

export const useGetSalinTempels = () => {
  return useQuery('salin-tempel', getSalinTempels);
};
