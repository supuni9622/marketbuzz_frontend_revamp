import { jwtDecode } from "jwt-decode";

export class Utility {
    public static decodeToken(token: string): {
        user: { role: string; organizationId: string; username: string };
      } {
        return jwtDecode(token);
      }
      public static getAvgSpend = (
        totalTransactionsCount: number,
        totalTransactionsSum: number
      ): number => {
        const avgSpend = totalTransactionsSum / totalTransactionsCount;
        return avgSpend;
      };

}  
