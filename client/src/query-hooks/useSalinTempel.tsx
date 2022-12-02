import { useQuery } from 'react-query';

const baseURL = 'https://salintempel-production.up.railway.app';
const getSalinTempels = async () => {
  return await (
    await fetch(
      'https://salintempel-production.up.railway.app/api/salin-tempel',
    )
  ).json();
};

export const useGetSalinTempels = () => {
  return useQuery('salin-tempel', getSalinTempels);
};
