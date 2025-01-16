import { useQuery } from "@tanstack/react-query";
import { useAuthStore } from "@/store/useAuthStore";
import { AnalyticsService } from "@/services/AnalyticsService";
import type {
  TSalesSumRequest,
  TTransactionReportRequest
} from "@shoutout-labs/market_buzz_crm_types";

export function useSalesAnalytics(
  queryObj: TTransactionReportRequest,
  dateRangeQueryObj: TSalesSumRequest
) {
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  const initCompleted = useAuthStore((state) => state.initCompleted);

  const {
    data: totalSalesData,
    isLoading: isLoadingTotalSales
  } = useQuery({
    queryKey: ["totalSales"],
    queryFn: () => AnalyticsService.getTotalSalesSumAnalytics(),
    enabled: isLoggedIn() && initCompleted,
    refetchOnWindowFocus: false
  });

  const {
    data: totalTransactionsData,
    isLoading: isLoadingTotalTransactions
  } = useQuery({
    queryKey: ["totalTransactions"],
    queryFn: () => AnalyticsService.getTotalTransactionCountAnalytics(),
    enabled: isLoggedIn() && initCompleted,
    refetchOnWindowFocus: false
  });

  const {
    data: periodSalesData,
    isLoading: isLoadingPeriodSales
  } = useQuery({
    queryKey: ["periodSales", dateRangeQueryObj],
    queryFn: () => AnalyticsService.getSalesSumAnalytics(dateRangeQueryObj),
    enabled: isLoggedIn() && initCompleted && !!dateRangeQueryObj.fromDate && !!dateRangeQueryObj.toDate,
    refetchOnWindowFocus: false
  });

  const {
    data: salesBucket,
    isLoading: isLoadingSalesBucket
  } = useQuery({
    queryKey: ["salesBucket", queryObj],
    queryFn: () => AnalyticsService.getSalesDateBucketAnalytics(queryObj),
    enabled: isLoggedIn() && initCompleted && !!queryObj.fromDate && !!queryObj.toDate,
    refetchOnWindowFocus: false
  });

  return {
    // Total metrics
    totalSales: totalSalesData?.sum || 0,
    totalTransactions: totalTransactionsData?.count || 0,
    totalSalesComparison: totalSalesData?.comparisonPercentage || 0,
    totalTransactionsComparison: totalTransactionsData?.comparisonPercentage || 0,
    
    // Period metrics
    periodSales: periodSalesData?.sum || 0,
    periodSalesComparison: periodSalesData?.comparisonPercentage || 0,
    periodTransactions: salesBucket?.reduce((acc, curr) => acc + curr.transactionCount, 0) || 0,
    periodAmount: salesBucket?.reduce((acc, curr) => acc + curr.totalAmount, 0) || 0,
    
    // Average metrics
    averageSales: salesBucket?.length ? 
      (salesBucket.reduce((acc, curr) => acc + curr.totalAmount, 0) / salesBucket.reduce((acc, curr) => acc + curr.transactionCount, 0)) : 0,
    
    // Chart data
    salesBucket: salesBucket || [],
    
    // Loading state
    isLoading: isLoadingTotalSales || isLoadingTotalTransactions || isLoadingPeriodSales || isLoadingSalesBucket
  };
} 