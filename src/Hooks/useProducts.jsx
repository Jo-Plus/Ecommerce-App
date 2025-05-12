import React from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export default function useProducts() {
  // {data: products, isLoading, isFetching, error, isError}
  const response = useQuery({
    queryKey: ['products'],
    queryFn: () => axios.get(`https://ecommerce.routemisr.com/api/v1/products`),
    select: (data) => data.data.data,
    // staleTime: 20 * 1000,
    // refetchOnMount: true,
    // refetchOnReconnect: false,
    // refetchOnWindowFocus: false,
    // retry: 6,
    // retry: (counter, err) => {
    //   if (counter > 5) {
    //     return false;
    //   }
    //   return confirm('again?')
    // },
    // refetchInterval: 1000,
    // refetchIntervalInBackground: true,
  });
  return response
}
