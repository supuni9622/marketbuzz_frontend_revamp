import { TCustomerModelJSON } from "@shoutout-labs/market_buzz_crm_types";
import { DateBucketEnum, DateRange } from "@/types/enums";
import moment from "moment";
import { jwtDecode } from "jwt-decode";
import { Utils as QbUtils } from "@react-awesome-query-builder/core";

interface DateRangeResult {
  startDate: string;
  endDate: string;
  compareStartDate: string;
  compareEndDate: string;
}

export class Utility {
  public static changeHTMLAttribute = (attribute: string, value: string): boolean => {
    if (document.documentElement) {
      document.documentElement.setAttribute(attribute, value);
    }
    return true;
  };

  public static hasCustomAttributes = (message: string): boolean => {
    return /\[.*?\]/g.test(message);
  };

  public static findCustomAttributes = (message: string): string[] => {
    const matches = message.match(/\[.*?\]/g);
    return matches ? matches.map((match) => match.slice(1, -1)) : [];
  };

  public static getAvgSpend = (totalTransactionsCount: number, totalTransactionsSum: number): number => {
    return totalTransactionsSum / totalTransactionsCount;
  };

  public static getCustomerIndex = (selectedCustomerId: string, customerList: TCustomerModelJSON[]) => {
    return customerList.findIndex((customer) => customer.id === selectedCustomerId);
  };

  public static getDateRange = (range: string): DateRangeResult => {
    const today = new Date();
    const start = new Date();
    const compareStartDate = new Date();
    const endDate = new Date();
    const compareEndDate = new Date();

    switch (range) {
      case DateRange.TODAY:
        start.setDate(today.getDate());
        compareStartDate.setDate(today.getDate() - 1);
        endDate.setDate(today.getDate());
        compareEndDate.setDate(today.getDate() - 1);
        break;
      case DateRange.LAST_7_DAYS:
        start.setDate(today.getDate() - 7);
        compareStartDate.setDate(today.getDate() - 14);
        endDate.setDate(today.getDate() - 1);
        compareEndDate.setDate(today.getDate() - 8);
        break;
      case DateRange.LAST_28_DAYS:
        start.setDate(today.getDate() - 28);
        compareStartDate.setDate(today.getDate() - 56);
        endDate.setDate(today.getDate() - 1);
        compareEndDate.setDate(today.getDate() - 29);
        break;
      case DateRange.LAST_90_DAYS:
        start.setDate(today.getDate() - 90);
        compareStartDate.setDate(today.getDate() - 180);
        endDate.setDate(today.getDate() - 1);
        compareEndDate.setDate(today.getDate() - 91);
        break;
      case DateRange.LAST_365_DAYS:
        start.setDate(today.getDate() - 365);
        compareStartDate.setDate(today.getDate() - 730);
        endDate.setDate(today.getDate() - 1);
        compareEndDate.setDate(today.getDate() - 366);
        break;
      default:
        start.setDate(today.getDate() - 28);
        compareStartDate.setDate(today.getDate() - 56);
        endDate.setDate(today.getDate() - 1);
        compareEndDate.setDate(today.getDate() - 29);
        break;
    }

    return {
      startDate: start.toISOString().split("T")[0],
      endDate: endDate.toISOString().split("T")[0],
      compareStartDate: compareStartDate.toISOString().split("T")[0],
      compareEndDate: compareEndDate.toISOString().split("T")[0]
    };
  };

  public static extractNumericValueFromString = (text: string): number => {
    const match = text.match(/\d+/);
    return match ? parseInt(match[0], 10) : 0;
  };

  public static iterateDateRange = (
    startDate: Date,
    endDate: Date,
    callback: (dateKey: string) => void,
    interval: DateBucketEnum
  ) => {
    const start = moment(startDate);
    const end = moment(endDate);
    let current = start.clone();

    if (interval === DateBucketEnum.QUARTER) {
      const startQ = moment(startDate).startOf("quarter");
      const endQ = moment(endDate).endOf("quarter");
      let currentQ = startQ.clone();

      while (currentQ <= endQ) {
        callback(currentQ.format("YYYY-[Q]Q"));
        currentQ.add(1, "quarters");
      }
    } else {
      while (current <= end) {
        switch (interval) {
          case DateBucketEnum.DAY:
            callback(current.format("YYYY-MM-DD"));
            current.add(1, "days");
            break;
          case DateBucketEnum.WEEK:
            current.startOf("isoWeek");
            callback(current.format("YYYY-MM-DD"));
            current.add(1, "weeks");
            break;
          case DateBucketEnum.MONTH:
            callback(current.format("YYYY-MM"));
            current.add(1, "months");
            break;
          case DateBucketEnum.YEAR:
            callback(current.format("YYYY"));
            current.add(1, "years");
            break;
          default:
            throw new Error("Invalid interval");
        }
      }
    }
  };

  public static defaultDateRange = () => {
    const endDate = moment().toDate();
    const startDate = moment().subtract(1, "month").toDate();
    return { startDate, endDate, key: "selection" };
  };

  public static decodeToken(token: string): {
    user: { role: string; organizationId: string; username: string };
  } {
    return jwtDecode(token);
  }

  public static hexToRGB(hex: string) {
    hex = hex.replace(/[# ]/g, "");

    if (hex.length === 6) {
      const r = parseInt(hex.substring(0, 2), 16);
      const g = parseInt(hex.substring(2, 4), 16);
      const b = parseInt(hex.substring(4, 6), 16);
      return `${r}, ${g}, ${b}`;
    }
    
    console.error("Invalid hex code: must be 6 digits long");
    return "0, 0, 0";
  }

  public static replaceOrganizationCustomAttribute(text: string, organizationName: string) {
    return text.replace(/\[Store Name\]|\[Retail Store\]/g, organizationName);
  }

  public static isEmptyObject(object: any) {
    return Object.keys(object).length === 0;
  }

  public static isEqualObjects(a: any, b: any) {
    try {
      const serialize = (o: any) =>
        o
          ? Object.entries(o)
              .sort()
              .map((i) => {
                if (i[1] instanceof Object) i[1] = serialize(i[1]);
                return i;
              })
          : o;
      return JSON.stringify(serialize(a)) === JSON.stringify(serialize(b));
    } catch (error) {
      console.error(error);
      return false;
    }
  }

  public static getMongoDBQuery(filters: any, config: any) {
    const filterData = {
      tree: QbUtils.loadTree(filters),
      config: config
    };
    return QbUtils.mongodbFormat(filterData.tree, config);
  }

  public static getSegmentFilters({ appliedMemberFilters, filterConfig }: { 
    appliedMemberFilters: any[],
    filterConfig: any 
  }) {
    return appliedMemberFilters
      .map((aMF) =>
        aMF
          ? JSON.stringify(Utility.getMongoDBQuery(aMF, filterConfig))
          : JSON.stringify({})
      )
      .filter((item) => item);
  }
} 