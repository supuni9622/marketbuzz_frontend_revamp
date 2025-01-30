export enum CustomersFilterTasks {
  filterCustomers = "filterCustomers",
  searchCustomers = "searchCustomers",
  getAllCustomers = "getAllCustomers"
}

export interface CustomerFilterSkipLimit {
  limit: number;
  skip: number;
}

export interface CustomerFilterBaseQuery {
  marketingAllowed?: boolean;
  isRequiredPhoneNumber?: boolean;
  hasTransactions?: boolean;
}

export interface SearchCustomerQuery {
  query: string;
}

export interface FilterCustomerQuery {
  filterObj: object;
}

export type SearchCustomerQueryWithSkipLimit = SearchCustomerQuery & CustomerFilterSkipLimit;
export type FilterCustomerQueryWithSkipLimit = FilterCustomerQuery & CustomerFilterSkipLimit;
export type CustomerFilterBaseQueryWithSkipLimit = CustomerFilterBaseQuery & CustomerFilterSkipLimit;

export interface CustomerQueryTask {
  task: CustomersFilterTasks;
  query: CustomerFilterBaseQuery | SearchCustomerQuery | FilterCustomerQuery;
} 