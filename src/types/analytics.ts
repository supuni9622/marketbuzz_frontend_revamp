import { z } from 'zod';

export const SalesReportRequestSchema = z.object({
  fromDate: z.string(),
  toDate: z.string(),
  bucketBy: z.enum(['day', 'week', 'month', 'quarter', 'year'])
});

export const SalesReportResponseSchema = z.array(z.object({
  dateBucketKey: z.string(),
  totalSales: z.number(),
  totalTransactions: z.number()
}));

export const SalesCountReportRequestSchema = z.object({
  fromDate: z.string(),
  toDate: z.string()
});

export const SalesCountReportResponseSchema = z.object({
  totalSales: z.number(),
  totalTransactions: z.number(),
  averageSales: z.number()
});

export type TSalesReportRequest = z.infer<typeof SalesReportRequestSchema>;
export type TSalesReportResponse = z.infer<typeof SalesReportResponseSchema>;
export type TSalesCountReportRequest = z.infer<typeof SalesCountReportRequestSchema>;
export type TSalesCountReportResponse = z.infer<typeof SalesCountReportResponseSchema>; 