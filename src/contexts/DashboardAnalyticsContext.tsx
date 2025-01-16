import { useQuery } from "@tanstack/react-query";
import { useAuthStore } from "@/store/useAuthStore";
import { AnalyticsService } from "@/services/AnalyticsService";
import type {
  TSalesSumRequest,
  TTransactionCountReportRequest,
  TNewCustomerCountReportRequest,
  TRepeatCustomerCountReportRequest
} from "@shoutout-labs/market_buzz_crm_types";

export function useDashboardAnalytics(
  queryParams: TSalesSumRequest & TTransactionCountReportRequest & TNewCustomerCountReportRequest & TRepeatCustomerCountReportRequest,
  isAllTime: boolean = false
) {
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  const initCompleted = useAuthStore((state) => state.initCompleted);

  // Total metrics queries
  const {
    data: totalSalesData,
    isLoading: isLoadingTotalSales
  } = useQuery({
    queryKey: ["totalSales"],
    queryFn: () => AnalyticsService.getTotalSalesSumAnalytics(),
    enabled: isLoggedIn() && initCompleted && isAllTime,
    refetchOnWindowFocus: false
  });

  const {
    data: totalTransactionsData,
    isLoading: isLoadingTotalTransactions
  } = useQuery({
    queryKey: ["totalTransactions"],
    queryFn: () => AnalyticsService.getTotalTransactionCountAnalytics(),
    enabled: isLoggedIn() && initCompleted && isAllTime,
    refetchOnWindowFocus: false
  });

  const {
    data: totalRepeatCustomersData,
    isLoading: isLoadingTotalRepeatCustomers
  } = useQuery({
    queryKey: ["totalRepeatCustomers"],
    queryFn: () => AnalyticsService.getTotalRepeatCustomerCountAnalytics(),
    enabled: isLoggedIn() && initCompleted && isAllTime,
    refetchOnWindowFocus: false
  });

  // Period metrics queries
  const {
    data: salesData,
    isLoading: isLoadingSales
  } = useQuery({
    queryKey: ["sales", queryParams],
    queryFn: () => AnalyticsService.getSalesSumAnalytics(queryParams),
    enabled: isLoggedIn() && initCompleted && !isAllTime && !!queryParams.fromDate,
    refetchOnWindowFocus: false
  });

  const {
    data: transactionsData,
    isLoading: isLoadingTransactions
  } = useQuery({
    queryKey: ["transactions", queryParams],
    queryFn: () => AnalyticsService.getTransactionCountAnalytics(queryParams),
    enabled: isLoggedIn() && initCompleted && !isAllTime && !!queryParams.fromDate,
    refetchOnWindowFocus: false
  });

  const {
    data: newCustomersData,
    isLoading: isLoadingNewCustomers
  } = useQuery({
    queryKey: ["newCustomers", queryParams],
    queryFn: () => AnalyticsService.getNewCustomerCountAnalytics(queryParams),
    enabled: isLoggedIn() && initCompleted && !isAllTime && !!queryParams.fromDate,
    refetchOnWindowFocus: false
  });

  const {
    data: repeatCustomersData,
    isLoading: isLoadingRepeatCustomers
  } = useQuery({
    queryKey: ["repeatCustomers", queryParams],
    queryFn: () => AnalyticsService.getRepeatCustomerCountAnalytics(queryParams),
    enabled: isLoggedIn() && initCompleted && !isAllTime && !!queryParams.fromDate,
    refetchOnWindowFocus: false
  });

  return {
    // Data
    sales: isAllTime ? totalSalesData : salesData,
    transactions: isAllTime ? totalTransactionsData : transactionsData,
    newCustomers: newCustomersData,
    repeatCustomers: isAllTime ? totalRepeatCustomersData : repeatCustomersData,

    // Loading states
    isLoading: isAllTime 
      ? (isLoadingTotalSales || isLoadingTotalTransactions || isLoadingTotalRepeatCustomers)
      : (isLoadingSales || isLoadingTransactions || isLoadingNewCustomers || isLoadingRepeatCustomers)
  };
} 