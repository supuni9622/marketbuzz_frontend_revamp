import { useQuery } from "@tanstack/react-query";
import { useAuthStore } from "@/store/useAuthStore";
import { getTemplates, getCampaigns, getCampaignsCount } from "@/services/CampaignService";
import { TCampaignGetRequest } from "@shoutout-labs/market_buzz_crm_types";

const DEFAULT_PAGE_SIZE = 10;

export function useCampaignTemplates(queryObj?: Partial<TCampaignGetRequest>) {
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  const initCompleted = useAuthStore((state) => state.initCompleted);

  const defaultQueryObj: TCampaignGetRequest = {
    limit: DEFAULT_PAGE_SIZE,
    skip: 0,
    ...queryObj
  };

  const {
    data: templates,
    isLoading: isLoadingTemplates,
    refetch: refetchTemplates,
    isFetching: isFetchingTemplates,
    error: templatesError
  } = useQuery({
    queryKey: ["campaignTemplates", defaultQueryObj],
    queryFn: async () => {
      try {
        const response = await getTemplates(defaultQueryObj);
        return response.items;
      } catch (error) {
        console.error('Error fetching templates:', error);
        return [];
      }
    },
    enabled: isLoggedIn() && initCompleted,
    refetchOnWindowFocus: false
  });

  return {
    templates,
    isLoadingTemplates,
    refetchTemplates,
    isFetchingTemplates,
    error: templatesError
  };
}

export function useCampaigns(queryObj?: Partial<TCampaignGetRequest>) {
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  const initCompleted = useAuthStore((state) => state.initCompleted);

  const defaultQueryObj: TCampaignGetRequest = {
    limit: DEFAULT_PAGE_SIZE,
    skip: 0,
    ...queryObj
  };

  const {
    data: campaignsResponse,
    isLoading: isLoadingCampaigns,
    refetch: refetchCampaigns,
    isFetching: isFetchingCampaigns,
    error: campaignsError
  } = useQuery({
    queryKey: ["campaigns", defaultQueryObj],
    queryFn: async () => {
      try {
        const response = await getCampaigns(defaultQueryObj);
        return response;
      } catch (error) {
        console.error('Error fetching campaigns:', error);
        return { items: [], count: 0 };
      }
    },
    enabled: isLoggedIn() && initCompleted,
    refetchOnWindowFocus: false
  });

  const {
    data: countResponse,
    error: countError
  } = useQuery({
    queryKey: ["campaignsCount"],
    queryFn: async () => {
      try {
        return await getCampaignsCount();
      } catch (error) {
        console.error('Error fetching campaigns count:', error);
        return { count: 0 };
      }
    },
    enabled: isLoggedIn() && initCompleted,
    refetchOnWindowFocus: false
  });

  return {
    campaigns: campaignsResponse?.items || [],
    totalCount: countResponse?.count || 0,
    isLoadingCampaigns,
    refetchCampaigns,
    isFetchingCampaigns,
    error: campaignsError || countError
  };
} 