import { useState, useEffect, useMemo, useCallback } from "react";
import { Card } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { useQuery } from "@tanstack/react-query";
import { getSegments, filterCustomersCount, getCustomersCount } from "@/services/CustomerService";
import { useAuthStore } from "@/store/useAuthStore";
import { useCustomersStore } from "@/store/useCustomersStore";
import { useCustomers, useCustomersCount } from "@/contexts/CustomerDataContext";
import { CustomersFilterTasks } from "@/types/customers";
import { Utility } from "@/lib/utils";
import { PreDefinedSegments } from "@/app/campaigns/sms/Constants";
import CustomerSegmentDropdown from "./CustomerSegmentDropdown";
import AllCustomerTabComponent from "./AllCustomerTabComponent";
import CustomerTabComponent from "./CustomerTabComponent";

const simpleFilterConfig = {
  firstName: { field: "firstName", type: "string" },
  lastName: { field: "lastName", type: "string" },
  email: { field: "email", type: "string" },
  phoneNumber: { field: "phoneNumber", type: "string" },
  totalTransactionsCount: { field: "totalTransactionsCount", type: "number" },
  "optIn.marketing.allowed": { field: "optIn.marketing.allowed", type: "boolean" },
  createdOn: { field: "createdOn", type: "date" },
  dateOfBirth: { field: "dateOfBirth", type: "date" },
  lastPurchasedDate: { field: "lastPurchasedDate", type: "date" },
};

export function CustomerTabs() {
  const [isLoggedIn] = useAuthStore((state) => [state.isLoggedIn]);
  const limit = useCustomersStore((state) => state.limit);
  const skip = useCustomersStore((state) => state.skip);
  const setQueryTask = useCustomersStore((state) => state.setQueryTask);

  const { customers: customersList, isLoadingCustomers, isFetchingCustomersData } = useCustomers();
  const { customersCount, isLoadingCustomersCount, isFetchingCustomersCount } = useCustomersCount();

  const [activeTab, setActiveTab] = useState("all");
  const [segmentViseCustomersCount, setSegmentViseCustomersCount] = useState([]);

  const loadSegmentsData = useCallback(() => {
    return getSegments({ limit: 100, skip: 0 });
  }, []);

  const { data: segmentsData, isLoading: isLoadingSegments, refetch } = useQuery({
    queryKey: ["segments"],
    queryFn: loadSegmentsData,
    enabled: isLoggedIn(),
    refetchOnWindowFocus: false,
  });

  const allSegments = useMemo(() => segmentsData?.items || [], [segmentsData]);

  const currentTabFilter = useMemo(() => {
    if (activeTab === "all") return null;
    return (
      PreDefinedSegments.find((segment) => segment.id === activeTab) ||
      allSegments.find((segment) => segment.id === activeTab)
    );
  }, [activeTab, allSegments]);

  const handleTabChange = useCallback((newTab) => {
    setActiveTab(newTab);
  }, []);

  useEffect(() => {
    if (activeTab !== "all") {
      const currentTab = currentTabFilter;
      const customerFilters = Utility.getMongoDBQuery(
        currentTab?.filter,
        simpleFilterConfig
      );
      setQueryTask({
        task: CustomersFilterTasks.filterCustomers,
        query: { filterObj: customerFilters },
      });
    } else {
      setQueryTask({
        task: CustomersFilterTasks.getAllCustomers,
        query: {},
      });
    }
  }, [activeTab, currentTabFilter]);

  const { data: totalCustomers } = useQuery({
    queryKey: ["customerCount"],
    queryFn: async () => {
      const response = await getCustomersCount({});
      return response?.count;
    },
    enabled: isLoggedIn(),
    refetchOnWindowFocus: false,
  });

  const getCustomersCountInSegment = useCallback(async (filterObj) => {
    const customerFilters = Utility.getMongoDBQuery(filterObj, simpleFilterConfig);
    const res = await filterCustomersCount({ filterObj: customerFilters });
    return res.count ?? 0;
  }, []);

  const loadSegmentCounts = useCallback(async () => {
    const counts = await Promise.all(
      PreDefinedSegments.map(async (segment) => {
        const count = await getCustomersCountInSegment(segment.filter);
        return { id: segment.id, count };
      })
    );
    setSegmentViseCustomersCount(counts);
  }, [getCustomersCountInSegment]);

  useEffect(() => {
    if(PreDefinedSegments){
      loadSegmentCounts();
    }
  }, [PreDefinedSegments]);

  return (
    <Card>
      <Tabs defaultValue="all" value={activeTab} onValueChange={handleTabChange}>
        <TabsList className="w-full justify-start">
          <TabsTrigger value="all">
            All Customers
            <Badge variant="secondary" className="ml-2">
              {totalCustomers || 0}
            </Badge>
          </TabsTrigger>
          {PreDefinedSegments.map((segment) => {
            const countObj = segmentViseCustomersCount.find(
              (preSegment) => preSegment.id === segment.id
            );
            return (
              <TabsTrigger key={segment.id} value={segment.id}>
                {segment.name}
                <Badge variant="secondary" className="ml-2">
                  {countObj ? countObj.count : 0}
                </Badge>
              </TabsTrigger>
            );
          })}
          <CustomerSegmentDropdown
            allSegments={allSegments}
            toggleTab={handleTabChange}
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

        {PreDefinedSegments.concat(allSegments).map((segment) => (
          <TabsContent key={segment.id} value={segment.id}>
            {segment.description && (
              <Card className="mb-4">
                <div className="p-4">
                  <h3 className="text-lg font-semibold mb-2">{segment.name}</h3>
                  <p className="text-sm text-muted-foreground">{segment.description}</p>
                </div>
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
    </Card>
  );
}

export default CustomerTabs;
