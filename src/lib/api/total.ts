import axios from 'axios';
import { useQuery } from '@tanstack/react-query';

import { BACKEND_URL } from '@lib/constants';

export interface Total {
  total: number;
  total_amount: number;
  average_amount: number;
  max_amount: number;
  min_amount: number;
}

const API_BASE_URL = `${BACKEND_URL}/total`;

export const fetchTotal = async (): Promise<Total> => {
  const response = await axios.get(API_BASE_URL);
  return response.data.data;
};

export const useTotal = () => {
  return useQuery<Total, Error>({
    queryKey: ['total'],
    queryFn: fetchTotal,
  });
};
