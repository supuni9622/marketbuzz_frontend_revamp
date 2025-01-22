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

      static getMongoDBQuery(filters: any, config: any) {
        if (!filters || !filters.rules || !filters.rules.length) {
          return {};
        }

        const processRule = (rule: any) => {
          const { field, operator, value } = rule;
          const fieldConfig = config.fields[field];
          
          if (!fieldConfig) return {};

          switch (operator) {
            case 'equal':
              return { [field]: value };
            case 'not_equal':
              return { [field]: { $ne: value } };
            case 'less':
              return { [field]: { $lt: value } };
            case 'less_or_equal':
              return { [field]: { $lte: value } };
            case 'greater':
              return { [field]: { $gt: value } };
            case 'greater_or_equal':
              return { [field]: { $gte: value } };
            case 'between':
              return { [field]: { $gte: value[0], $lte: value[1] } };
            case 'contains':
              return { [field]: { $regex: value, $options: 'i' } };
            case 'not_contains':
              return { [field]: { $not: { $regex: value, $options: 'i' } } };
            default:
              return {};
          }
        };

        const processRuleGroup = (group: any) => {
          if (!group.rules) return {};

          const conditions = group.rules.map((rule: any) => {
            if (rule.rules) {
              return processRuleGroup(rule);
            }
            return processRule(rule);
          }).filter((condition: any) => Object.keys(condition).length > 0);

          if (conditions.length === 0) return {};

          return {
            [group.conjunction.toLowerCase() === 'and' ? '$and' : '$or']: conditions
          };
        };

        return processRuleGroup(filters);
      }

      static replaceOrganizationCustomAttribute(text: string, organizationName?: string): string {
        return text.replace(/\{\{organization\}\}/g, organizationName || '')
      }

      static hasCustomAttributes(text: string): boolean {
        const customAttributeRegex = /\{\{[^}]+\}\}/g
        return customAttributeRegex.test(text)
      }
}  
