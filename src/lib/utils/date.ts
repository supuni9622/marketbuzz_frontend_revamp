import { DateRange } from "@/types/enums";
import { format, subDays } from "date-fns";

export interface DateRangeResult {
  startDate: string;
  endDate: string;
  compareStartDate: string;
  compareEndDate: string;
}

export const getDateRange = (range: DateRange): DateRangeResult => {
  const today = new Date();
  const yesterday = subDays(today, 1);
  
  switch (range) {
    case DateRange.TODAY: {
      const compareDate = subDays(today, 1);
      return {
        startDate: format(today, 'yyyy-MM-dd'),
        endDate: format(today, 'yyyy-MM-dd'),
        compareStartDate: format(compareDate, 'yyyy-MM-dd'),
        compareEndDate: format(compareDate, 'yyyy-MM-dd')
      };
    }
    case DateRange.LAST_7_DAYS: {
      const startDate = subDays(yesterday, 6);
      const compareStartDate = subDays(startDate, 7);
      const compareEndDate = subDays(yesterday, 7);
      return {
        startDate: format(startDate, 'yyyy-MM-dd'),
        endDate: format(yesterday, 'yyyy-MM-dd'),
        compareStartDate: format(compareStartDate, 'yyyy-MM-dd'),
        compareEndDate: format(compareEndDate, 'yyyy-MM-dd')
      };
    }
    case DateRange.LAST_28_DAYS: {
      const startDate = subDays(yesterday, 27);
      const compareStartDate = subDays(startDate, 28);
      const compareEndDate = subDays(yesterday, 28);
      return {
        startDate: format(startDate, 'yyyy-MM-dd'),
        endDate: format(yesterday, 'yyyy-MM-dd'),
        compareStartDate: format(compareStartDate, 'yyyy-MM-dd'),
        compareEndDate: format(compareEndDate, 'yyyy-MM-dd')
      };
    }
    case DateRange.LAST_90_DAYS: {
      const startDate = subDays(yesterday, 89);
      const compareStartDate = subDays(startDate, 90);
      const compareEndDate = subDays(yesterday, 90);
      return {
        startDate: format(startDate, 'yyyy-MM-dd'),
        endDate: format(yesterday, 'yyyy-MM-dd'),
        compareStartDate: format(compareStartDate, 'yyyy-MM-dd'),
        compareEndDate: format(compareEndDate, 'yyyy-MM-dd')
      };
    }
    case DateRange.LAST_365_DAYS: {
      const startDate = subDays(yesterday, 364);
      const compareStartDate = subDays(startDate, 365);
      const compareEndDate = subDays(yesterday, 365);
      return {
        startDate: format(startDate, 'yyyy-MM-dd'),
        endDate: format(yesterday, 'yyyy-MM-dd'),
        compareStartDate: format(compareStartDate, 'yyyy-MM-dd'),
        compareEndDate: format(compareEndDate, 'yyyy-MM-dd')
      };
    }
    default:
      return {
        startDate: '',
        endDate: '',
        compareStartDate: '',
        compareEndDate: ''
      };
  }
};

export const extractNumericValueFromString = (value: string): number => {
  const match = value.match(/\d+/);
  return match ? parseInt(match[0], 10) : -1;
}; 