import { useState, useCallback } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Pagination } from '@/components/common/Pagination';
import { useCustomersStore } from "@/store/useCustomersStore";
import { TCustomerModelJSON } from "@shoutout-labs/market_buzz_crm_types";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Utility } from "@/lib/utils";
import { ColumnSelectorDropdown } from "./ColumnSelectorDropdown";
import numeral from "numeral";
import { CustomerDetailsPanel } from "@/components/customers/CustomerDetailsPanel";

interface CustomersTableProps {
  customersResults: TCustomerModelJSON[];
  customersCount: number;
}

export function CustomersTable({
  customersResults,
  customersCount
}: CustomersTableProps) {

  const limit = useCustomersStore((state) => state.limit);
  const skip = useCustomersStore((state) => state.skip);
  const setSkip = useCustomersStore((state) => state.setSkip);
  const setSelectedCustomer = useCustomersStore((state) => state.setSelectedCustomer);
  const selectedCustomer = useCustomersStore((state) => state.selectedCustomer);

  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const [visibleColumns, setVisibleColumns] = useState({
    lastName: true,
    email: true,
    phoneNumber: true,
    avgSpend: true,
    visits: true,
    birthDay: false,
    createdOn: false,
    lastActivityOn: false
  });

  const handleRowClick = useCallback(
    (customer: TCustomerModelJSON) => {
      setIsSheetOpen(true);
      setSelectedCustomer(customer);
    },
    [setSelectedCustomer]
  );

  const toggleColumnVisibility = (column: keyof typeof visibleColumns) => {
    setVisibleColumns((prev) => ({
      ...prev,
      [column]: !prev[column]
    }));
  };

  return (
    <>
      <div className="flex justify-end mb-4">
        <ColumnSelectorDropdown
          visibleColumns={visibleColumns}
          toggleColumnVisibility={toggleColumnVisibility}
        />
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>First Name</TableHead>
              {visibleColumns.lastName && <TableHead>Last Name</TableHead>}
              {visibleColumns.email && <TableHead>Email</TableHead>}
              {visibleColumns.phoneNumber && <TableHead>Phone Number</TableHead>}
              {visibleColumns.avgSpend && <TableHead>Avg. Spend</TableHead>}
              {visibleColumns.visits && <TableHead>Visits</TableHead>}
              {visibleColumns.birthDay && <TableHead>Birthday</TableHead>}
              {visibleColumns.createdOn && <TableHead>Created On</TableHead>}
              {visibleColumns.lastActivityOn && (
                <TableHead>Last Activity</TableHead>
              )}
            </TableRow>
          </TableHeader>
          <TableBody>
            {customersResults && customersResults.length > 0 ? (
              customersResults.map((customer) => (
                <TableRow
                  key={customer.referenceId}
                  className="cursor-pointer"
                  onClick={() => handleRowClick(customer)}
                >
                  <TableCell>{customer.firstName}</TableCell>
                  {visibleColumns.lastName && (
                    <TableCell>{customer.lastName}</TableCell>
                  )}
                  {visibleColumns.email && <TableCell>{customer.email}</TableCell>}
                  {visibleColumns.phoneNumber && (
                    <TableCell>{customer.phoneNumber}</TableCell>
                  )}
                  {visibleColumns.avgSpend && (
                    <TableCell>
                      ${" "}
                      {numeral(
                        Utility.getAvgSpend(
                          customer.totalTransactionsCount || 1,
                          customer.totalTransactionsSum || 0
                        )
                      ).format("0.00")}
                    </TableCell>
                  )}
                  {visibleColumns.visits && (
                    <TableCell>{customer.totalTransactionsCount}</TableCell>
                  )}
                  {visibleColumns.birthDay && (
                    <TableCell>
                      {customer.dateOfBirthDay
                        ? new Date(customer.dateOfBirthDay).toLocaleDateString()
                        : ""}
                    </TableCell>
                  )}
                  {visibleColumns.createdOn && (
                    <TableCell>
                      {customer.createdOn
                        ? new Date(customer.createdOn).toLocaleDateString()
                        : ""}
                    </TableCell>
                  )}
                  {visibleColumns.lastActivityOn && (
                    <TableCell>
                      {customer.lastPurchasedDate
                        ? new Date(customer.lastPurchasedDate).toLocaleDateString()
                        : ""}
                    </TableCell>
                  )}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={Object.values(visibleColumns).filter(Boolean).length + 1}
                  className="text-center"
                >
                  No data found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-between mt-4">
        <div className="text-sm text-muted-foreground">
          Showing{" "}
          <span className="font-medium">
            {Math.min(customersCount, skip + limit)}
          </span>{" "}
          of <span className="font-medium">{customersCount}</span> Results
        </div>
        
        <Pagination
          dataCount={customersCount || 0}
          currentPage={skip / limit + 1}
          setCurrentPage={(pageNumber: number) => {
            setSkip(limit * (pageNumber - 1));
          }}
          perPageData={limit}
          setSkip={setSkip}
          loadCustomerData={() => {}}
        />
      </div>

      <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
        <SheetContent>
          <CustomerDetailsPanel
            customer={selectedCustomer as TCustomerModelJSON}
          />
        </SheetContent>
      </Sheet>
    </>
  );
}

export default CustomersTable; 