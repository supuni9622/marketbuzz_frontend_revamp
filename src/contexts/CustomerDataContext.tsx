import { useQuery } from "@tanstack/react-query";
import { useAuthStore } from "@/store/useAuthStore";
import { CustomerService, CustomerFilterBaseQuery, CustomerFilterBaseQueryWithSkipLimit } from "@/services/CustomerService";

export function useCustomers(queryObj: CustomerFilterBaseQueryWithSkipLimit) {
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  const initCompleted = useAuthStore((state) => state.initCompleted);

  const {
    data: customers,
    isLoading: isLoadingCustomers,
    refetch: refetchCustomersData,
    isFetching: isFetchingCustomersData
  } = useQuery({
    queryKey: ["customers", queryObj],
    queryFn: async () => {
      const customerResponse = await CustomerService.getCustomers(queryObj);
      return customerResponse.items;
    },
    enabled: isLoggedIn() && initCompleted,
    refetchOnWindowFocus: false
  });

  return {
    customers,
    isLoadingCustomers,
    refetchCustomersData,
    isFetchingCustomersData
  };
} 