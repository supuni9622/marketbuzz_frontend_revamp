import { useQuery } from "@tanstack/react-query";
import { useAuthStore } from "@/store/useAuthStore";
import { AnalyticsService } from "@/services/AnalyticsService";
import type {
  TCustomerReportRequest,
  TNewCustomerCountReportRequest,
  TRepeatCustomerCountReportRequest,
  TVisitFrequencyRequest
} from "@shoutout-labs/market_buzz_crm_types";

export function useCustomerAnalytics(
  queryObj: TCustomerReportRequest,
  dateRangeQueryObj: TNewCustomerCountReportRequest
) {
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  const initCompleted = useAuthStore((state) => state.initCompleted);

  const {
    data: newCustomerCount,
    isLoading: isLoadingNewCustomerCount
  } = useQuery({
    queryKey: ["newCustomerCount", dateRangeQueryObj],
    queryFn: () => AnalyticsService.getNewCustomerCountAnalytics(dateRangeQueryObj),
    enabled: isLoggedIn() && initCompleted,
    refetchOnWindowFocus: false
  });

  const {
    data: repeatCustomerCount,
    isLoading: isLoadingRepeatCustomerCount
  } = useQuery({
    queryKey: ["repeatCustomerCount", dateRangeQueryObj],
    queryFn: () => AnalyticsService.getRepeatCustomerCountAnalytics(dateRangeQueryObj),
    enabled: isLoggedIn() && initCompleted,
    refetchOnWindowFocus: false
  });

  const {
    data: visitFrequency,
    isLoading: isLoadingVisitFrequency
  } = useQuery({
    queryKey: ["visitFrequency", dateRangeQueryObj],
    queryFn: () => AnalyticsService.getVisitFrequencyAnalytics(dateRangeQueryObj as TVisitFrequencyRequest),
    enabled: isLoggedIn() && initCompleted,
    refetchOnWindowFocus: false
  });

  const {
    data: customersBucket,
    isLoading: isLoadingCustomersBucket
  } = useQuery({
    queryKey: ["customersBucket", queryObj],
    queryFn: () => AnalyticsService.getCustomersDateBucketAnalytics(queryObj),
    enabled: isLoggedIn() && initCompleted,
    refetchOnWindowFocus: false
  });

  const {
    data: repeatCustomersBucket,
    isLoading: isLoadingRepeatCustomersBucket
  } = useQuery({
    queryKey: ["repeatCustomersBucket", queryObj],
    queryFn: () => AnalyticsService.getRepeatCustomersDateBucketAnalytics(queryObj),
    enabled: isLoggedIn() && initCompleted,
    refetchOnWindowFocus: false
  });

  return {
    newCustomerCount: newCustomerCount?.count || 0,
    repeatCustomerCount: repeatCustomerCount?.count || 0,
    visitFrequency: visitFrequency?.frequency || 0,
    customersBucket: customersBucket || [],
    repeatCustomersBucket: repeatCustomersBucket || [],
    isLoading: 
      isLoadingNewCustomerCount || 
      isLoadingRepeatCustomerCount || 
      isLoadingVisitFrequency || 
      isLoadingCustomersBucket || 
      isLoadingRepeatCustomersBucket
  };
} 