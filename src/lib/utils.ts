import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { Utils as QbUtils } from "@react-awesome-query-builder/core";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

interface FilterConfig {
  field: string;
  type: "boolean" | "string" | "number" | "date" | "array";
  operator?: "regex" | "range" | "in" | "all";
}

type FilterValue = 
  | boolean 
  | string 
  | number 
  | Date 
  | [number, number] 
  | [Date, Date] 
  | string[] 
  | number[];

interface Filters {
  [key: string]: FilterValue;
}

export const Utility = {
  getAvgSpend: (totalTransactionsCount: number, totalTransactionsSum: number) => {
    if (totalTransactionsCount === 0) return 0;
    return totalTransactionsSum / totalTransactionsCount;
  },

  getMongoDBQuery1: (filters: Filters, filterConfig: Record<string, FilterConfig>) => {
    const query: Record<string, any> = {};

    Object.entries(filters).forEach(([key, value]) => {
      if (value === undefined || value === null || value === "") return;

      const config = filterConfig[key];
      if (!config) return;

      switch (config.type) {
        case "boolean":
          query[config.field] = value as boolean;
          break;
        case "string":
          if (config.operator === "regex") {
            query[config.field] = { $regex: value as string, $options: "i" };
          } else {
            query[config.field] = value as string;
          }
          break;
        case "number":
          if (config.operator === "range") {
            const [min, max] = value as [number, number];
            query[config.field] = {
              $gte: min,
              $lte: max
            };
          } else {
            query[config.field] = value as number;
          }
          break;
        case "date":
          if (config.operator === "range") {
            const [start, end] = value as [Date, Date];
            query[config.field] = {
              $gte: start,
              $lte: end
            };
          } else {
            query[config.field] = value as Date;
          }
          break;
        case "array":
          if (config.operator === "in") {
            query[config.field] = { $in: value as string[] | number[] };
          } else if (config.operator === "all") {
            query[config.field] = { $all: value as string[] | number[] };
          }
          break;
        default:
          query[config.field] = value;
      }
    });

    return query;
  },

  getMongoDBQuery:(filters:any, config:any) => {
    const filterData = {
      tree: QbUtils.loadTree(filters),
      config: config
    };
    return QbUtils.mongodbFormat(filterData.tree, config);
  },

  isEmptyObject: (object: any) => {
    return Object.keys(object).length === 0;
  },

  isEqualObjects: (obj1: any, obj2: any) => {
    return JSON.stringify(obj1) === JSON.stringify(obj2);
  }
};
