import { CustomersTable } from "./CustomersTable";
import { Loader } from "@/components/ui/loader";

interface CustomerTabComponentProps {
  customersList: [];
  isLoadingCustomers: boolean;
  customersCount: number;
  isLoadingCustomersCount: boolean;
}

export function CustomerTabComponent({
  customersList,
  isLoadingCustomers,
  customersCount,
  isLoadingCustomersCount
}: CustomerTabComponentProps) {
  const isLoading = isLoadingCustomers || isLoadingCustomersCount;

  return (
    <div className="space-y-4">
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
  );
}

export default CustomerTabComponent; 