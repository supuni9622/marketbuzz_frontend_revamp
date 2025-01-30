import { useCallback, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CustomersTable } from "./CustomersTable";
import CustomersFilter from "./CustomersFilter";
import { useToggle } from "@/hooks/use-toggle";
//import { Utility } from "@/lib/utils";
import { Loader } from "@/components/ui/loader";
import { filterConfig } from "./CustomersFilterConfig"
import { CustomersFilterTasks } from "@/types/customers";
import SearchOption from "./SearchOption";
import { Utility } from "@/utility/Utility";

interface AllCustomerTabComponentProps {
  handleSegmentCreationSuccess: () => void;
  limit: number;
  skip: number;
  setQueryTask: (queryTask: { task: CustomersFilterTasks; query: any }) => void;
  customersList: [];
  isLoadingCustomers: boolean;
  isFetchingCustomersData: boolean;
  customersCount: number;
  isLoadingCustomersCount: boolean;
  isFetchingCustomersCount: boolean;
}

export function AllCustomerTabComponent({
  handleSegmentCreationSuccess,
  limit,
  skip,
  setQueryTask,
  customersList,
  isLoadingCustomers,
  isFetchingCustomersData,
  customersCount,
  isLoadingCustomersCount,
  isFetchingCustomersCount
}: AllCustomerTabComponentProps) {
  const [isSearchResult, setIsSearchResult] = useState<boolean>(false);
  const [showFilters, toggleShowFilters] = useToggle(false);
  const [isFilterResult, setIsFilterResult] = useState<boolean>(false);
  const [currentFilters, setCurrentFilters] = useState({});
  const [searchValue, setSearchValue] = useState("");

  const handleSearch = useCallback(
    async (value: string) => {
      if (!value.trim()) return;

      try {
        const queryObjSearch = { query: value };
        setIsSearchResult(true);
        setQueryTask({
          task: CustomersFilterTasks.searchCustomers,
          query: queryObjSearch
        });
      } catch (error) {
        console.error("Error searching customers:", error);
      }
    },
    [setQueryTask]
  );

  const onFilterCustomers = useCallback(
    async (filters:any) => {
      const customerFilters = Utility.getMongoDBQuery(filters, filterConfig);
      try {
        setQueryTask({
          task: CustomersFilterTasks.filterCustomers,
          query: { filterObj: customerFilters }
        });
      } catch (e) {
        console.error("Error filtering customers:", e);
      }
    },
    [limit, skip, setQueryTask]
  );

  const isLoading =
    isLoadingCustomers ||
    isLoadingCustomersCount ||
    isFetchingCustomersCount ||
    isFetchingCustomersData;

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div className="flex-1 max-w-sm">
          <SearchOption
            handleSearch={handleSearch}
            setSearchValue={setSearchValue}
          />
        </div>
        <Button
          variant="outline"
          onClick={() => toggleShowFilters()}
        >
          {showFilters ? "Hide Filters" : "Filter Customers"}
        </Button>
      </div>

      {showFilters && (
        <CustomersFilter
          isLoading={isLoading}
          setIsFilterResult={setIsFilterResult}
          onFilterCustomers={onFilterCustomers}
          currentFilters={currentFilters}
          setCurrentFilters={setCurrentFilters}
          handleSegmentCreationSuccess={handleSegmentCreationSuccess}
        />
      )}

      <div className="mt-4">
        {isLoading ? (
          <div className="flex justify-center">
            <Loader />
          </div>
        ) : (
          customersList && (
            <CustomersTable
              customersResults={customersList}
              customersCount={customersCount}
            />
          )
        )}
      </div>
    </div>
  );
}

export default AllCustomerTabComponent; 