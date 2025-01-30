'use client'

import { useState, useEffect, useMemo, useCallback } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useCustomers, useCustomersCount } from '@/contexts/CustomerDataContext';
import { useCustomersStore } from '@/store/useCustomersStore';
import { useAuthStore } from '@/store/useAuthStore';
import { useQuery } from '@tanstack/react-query';
import { getSegments, getCustomersCount,filterCustomersCount } from '@/services';
import { PreDefinedSegments } from '@/app/campaigns/sms/Constants';
import { Utility } from '@/lib/utils';
import { filterConfig } from '@/components/customers/CustomersFilterConfig';
import { CustomersFilterTasks } from '@/types/customers';
import { CustomerSegmentDropdown } from '@/components/customers/CustomerSegmentDropdown';
import { Badge } from '@/components/ui/badge';
import { TSegmentModelJSON } from "@shoutout-labs/market_buzz_crm_types";
import AllCustomerTabComponent from "./components/AllCustomerTabComponent";
import CustomerTabComponent from "./components/CustomerTabComponent";

function CustomersContent() {
  const [activeTab, setActiveTab] = useState('all');
  const [segmentViseCustomersCount, setSegmentViseCustomersCount] = useState(
    []
  );
    // eslint-disable-next-line
    const [limitSegments, setLimitSegments] = useState(100);
    // eslint-disable-next-line
    const [skipSegments, setSkipSegments] = useState(0);

  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  const limit = useCustomersStore((state) => state.limit);
  const skip = useCustomersStore((state) => state.skip);
  const setQueryTask = useCustomersStore((state) => state.setQueryTask);

  const {
    customers: customersList,
    isLoadingCustomers,
    isFetchingCustomersData
  } = useCustomers();
  const { customersCount, isLoadingCustomersCount, isFetchingCustomersCount } =
    useCustomersCount();


  const toggleTab = (tab: any) => {
      if (activeTab !== tab) {
        setActiveTab(tab);
      }
    };
  
    const loadSegmentsData = () => {
      const queryObj = {
        limit: limitSegments,
        skip: skipSegments
      };
      return getSegments(queryObj);
    };

    const {
      data: segmentsData,
      isLoading,
      refetch
    } = useQuery<any>({
      queryKey: ["segments", skipSegments],
      queryFn: loadSegmentsData,
      enabled: isLoggedIn(),
      refetchOnWindowFocus: false
    });

  
    const allSegments = useMemo(() => {
      if (!isLoading && segmentsData?.items.length > 0) {
        return segmentsData?.items;
      }
    }, [segmentsData, isLoading]);

    
  useEffect(() => {
    if (activeTab !== "all") {
      const currentTab =
        PreDefinedSegments.find((segment) => segment?.id === activeTab) ||
        allSegments?.find((segment:  TSegmentModelJSON) => segment?.id === activeTab);

      const customerFilters = Utility.getMongoDBQuery(
        currentTab?.filter,
        filterConfig
      );

      setQueryTask({
        task: CustomersFilterTasks.filterCustomers,
        query: { filterObj: customerFilters }
      });
    } else {
      setQueryTask({
        task: CustomersFilterTasks.getAllCustomers,
        query: {}
      });
    }
  }, [activeTab, allSegments]);

  const { data: totalCustomers, isLoading: isLoadingTotalCustomers } =
  useQuery<number>({
    queryKey: ["customerCount"],
    queryFn: async () => {
      const response = await getCustomersCount({});
      return response?.count;
    },
    enabled: isLoggedIn,
    refetchOnWindowFocus: false
  });

const getCustomersCountInSegment = useCallback(async (filterObj:any) => {
  const customerFilters = Utility.getMongoDBQuery(filterObj, filterConfig);
  const res = await filterCustomersCount({ filterObj: customerFilters });
  return res.count ?? 0;
}, []);

const loadSegmentCounts = useCallback(async () => {
  if (!PreDefinedSegments) return [];

  const counts = await Promise.all(
    PreDefinedSegments.map(async (segment) => {
      const count = await getCustomersCountInSegment(segment.filter);
      return { id: segment.id, count };
    })
  );

  setSegmentViseCustomersCount(counts);
}, [PreDefinedSegments, getCustomersCountInSegment]);

useEffect(() => {
  if (PreDefinedSegments) {
    loadSegmentCounts();
  }
}, [PreDefinedSegments]);

  return (
    <div className="w-full">
      <Card>
        <CardContent>
          <Tabs value={activeTab} onValueChange={toggleTab} className="w-full">
            <TabsList className="mb-3 flex space-x-2 border-b">
              <TabsTrigger value="all" className="px-4 py-2 flex items-center">
                All Customers
                <Badge className="ml-2">{String(totalCustomers)}</Badge>
              </TabsTrigger>
              {PreDefinedSegments.map((segment) => {
                const countObj = segmentViseCustomersCount?.find(
                  (preSegment) => preSegment.id === segment.id
                );
                return (
                  <TabsTrigger key={segment.id} value={segment.id} className="px-4 py-2 flex items-center">
                    {segment.name}
                    <Badge className="ml-2">{countObj ? countObj.count : 0}</Badge>
                  </TabsTrigger>
                );
              })}
              <CustomerSegmentDropdown
                allSegments={allSegments}
                toggleTab={toggleTab}
                isAllCustomers={false}
                title="+ More Segments"
                selectedSegmentName=""
              />
            </TabsList>

            <TabsContent value="all">
              <AllCustomerTabComponent
                handleSegmentCreationSuccess={refetch}
                limit={limit}
                skip={skip}
                setQueryTask={setQueryTask}
                customersList={customersList || []}
                isLoadingCustomers={isLoadingCustomers}
                isFetchingCustomersData={isFetchingCustomersData}
                customersCount={customersCount || 0}
                isLoadingCustomersCount={isLoadingCustomersCount}
                isFetchingCustomersCount={isFetchingCustomersCount}
              />
            </TabsContent>

            {PreDefinedSegments.concat(allSegments || []).map((segment) => (
              <TabsContent key={segment.id} value={segment.id}>
                {segment.description && (
                  <Card className="border shadow-sm p-4 mb-4">
                    <h6 className="mb-2 font-semibold">{segment.name}</h6>
                    <p className="text-gray-600">{segment.description}</p>
                  </Card>
                )}
                <CustomerTabComponent
                  customersList={customersList || []}
                  isLoadingCustomers={isLoadingCustomers}
                  customersCount={customersCount || 0}
                  isLoadingCustomersCount={isLoadingCustomersCount}
                />
              </TabsContent>
            ))}
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}

export default function CustomersPage() {
  return <CustomersContent />;
} 