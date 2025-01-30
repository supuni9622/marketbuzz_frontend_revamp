import { Config } from "@react-awesome-query-builder/core";
import {BasicConfig } from '@react-awesome-query-builder/ui';

const InitialConfig = BasicConfig;

export const filterConfig: Config = {
  ...InitialConfig,
  operators: {
    ...InitialConfig.operators,
    ...(InitialConfig.operators.proximity && {}),
    equal: {
      ...InitialConfig.operators.equal,
      label: "Equals"
    },
    not_equal: {
      ...InitialConfig.operators.not_equal,
      label: "Not equals"
    },
    select_equals: {
      ...InitialConfig.operators.equal,
      label: "Equals"
    },
    select_not_equals: {
      ...InitialConfig.operators.not_equal,
      label: "Not equals"
    },
    like: {
      ...InitialConfig.operators.like,
      label: "Contains"
    },
    not_like: {
      ...InitialConfig.operators.not_like,
      label: "Not contains"
    },
    is_empty: {
      ...InitialConfig.operators.is_empty,
      label: "Is unknown"
    },
    is_not_empty: {
      ...InitialConfig.operators.is_not_empty,
      label: "Is known"
    },
    less: {
      ...InitialConfig.operators.less,
      label: "Less than"
    },
    less_or_equal: {
      ...InitialConfig.operators.less_or_equal,
      label: "Less than or equal"
    },
    greater: {
      ...InitialConfig.operators.greater,
      label: "Greater than"
    },
    greater_or_equal: {
      ...InitialConfig.operators.greater_or_equal,
      label: "Greater than or equal"
    },
    array_empty: {
      label: "Empty",
      reversedOp: "array_not_empty",
      labelForFormat: "NULL",
      cardinality: 0,
      formatOp: (field, _op, value, _valueSrc, _valueType, opDef) =>
        `${field} ${opDef.labelForFormat}`,
      mongoFormatOp: (field, op, value) => ({
        [field]: { $exists: true, $size: 0 }
      })
    },
    greater_than_days: {
      label: "Greater than days",
      labelForFormat: ">",
      jsonLogic: ">",
      mongoFormatOp: (field, op, value) => {
        return {
          $expr: {
            $gt: [
              {
                $dayOfMonth: `$${field}`
              },
              value
            ]
          }
        };
      }
    },
    less_than_days: {
      label: "Less than days",
      labelForFormat: "<",
      jsonLogic: "<",
      mongoFormatOp: (field, op, value) => {
        return {
          $expr: {
            $lt: [
              {
                $dayOfMonth: `$${field}`
              },
              value
            ]
          }
        };
      }
    },
    greater_than_months: {
      label: "Greater than months",
      labelForFormat: ">",
      jsonLogic: ">",
      mongoFormatOp: (field, op, value) => {
        return {
          $expr: {
            $gt: [
              {
                $month: `$${field}`
              },
              value
            ]
          }
        };
      }
    },
    less_than_months: {
      label: "Less than months",
      labelForFormat: "<",
      jsonLogic: "<",
      mongoFormatOp: (field, op, value) => {
        return {
          $expr: {
            $lt: [
              {
                $month: `$${field}`
              },
              value
            ]
          }
        };
      }
    },
    greater_than_years: {
      label: "Greater than years",
      labelForFormat: ">",
      jsonLogic: ">",
      mongoFormatOp: (field, op, value) => {
        return {
          $expr: {
            $gt: [
              {
                $year: `$${field}`
              },
              value
            ]
          }
        };
      }
    },
    less_than_years: {
      label: "Less than years",
      labelForFormat: "<",
      jsonLogic: "<",
      mongoFormatOp: (field, op, value) => {
        return {
          $expr: {
            $lt: [
              {
                $year: `$${field}`
              },
              value
            ]
          }
        };
      }
    },
    month_is: {
      label: "Month is",
      labelForFormat: "==",
      jsonLogic: "==",
      mongoFormatOp: (field, op, value) => {
        return {
          $expr: {
            $eq: [
              {
                $month: `$${field}`
              },
              value
            ]
          }
        };
      }
    },
    day_is: {
      label: "Day is",
      labelForFormat: "==",
      jsonLogic: "==",
      mongoFormatOp: (field, op, value) => {
        return {
          $expr: {
            $eq: [
              {
                $dayOfMonth: `$${field}`
              },
              value
            ]
          }
        };
      }
    },
    year_is: {
      label: "Year is",
      labelForFormat: "==",
      jsonLogic: "==",
      mongoFormatOp: (field, op, value) => {
        return {
          $expr: {
            $eq: [
              {
                $year: `$${field}`
              },
              value
            ]
          }
        };
      }
    },
    array_not_empty: {
      label: "Not Empty",
      reversedOp: "array_empty",
      labelForFormat: "NOT NULL",
      cardinality: 0,
      formatOp: (field, _op, value, _valueSrc, _valueType, opDef) =>
        `${field} ${opDef.labelForFormat}`,
      mongoFormatOp: (field, op, value) => ({
        [field]: { $exists: true, $not: { $size: 0 } }
      })
    }
  },
  settings: {
    ...InitialConfig.settings,
    maxNesting: 1, //* No groups.
    maxNumberOfRules: 6,
    showErrorMessage: true,
    showNot: false,
    clearValueOnChangeOp: true
  },
  fields: {
    firstName: {
      label: "First Name",
      type: "text",
      valueSources: ["value"],
      operators: ["equal", "not_equal", "like", "not_like"]
    },
    lastName: {
      label: "Last Name",
      type: "text",
      valueSources: ["value"],
      operators: ["equal", "not_equal", "like", "not_like"]
    },
    email: {
      label: "Email",
      type: "text",
      valueSources: ["value"],
      operators: ["equal", "not_equal", "like", "not_like"]
    },
    phoneNumber: {
      label: "Phone Number",
      type: "text",
      valueSources: ["value"],
      operators: ["equal", "not_equal", "like", "not_like"]
    },
    // avgSpent: {
    //   label: "Average Spent",
    //   type: "number",
    //   valueSources: ["value"],
    //   fieldSettings: {
    //     min: 0,
    //     max: 1000000
    //   },
    //   preferWidgets: ["slider", "rangeslider"]
    // },
    totalTransactionsCount: {
      label: "Visits",
      type: "number",
      valueSources: ["value"],
      operators: ["equal", "not_equal", "greater", "less", "greater_or_equal", "less_or_equal"]
    },
    "optIn.marketing.allowed": {
      label: "Marketing Allowed",
      type: "boolean",
      operators: ["equal"],
      valueSources: ["value"]
    },
    createdOn: {
      label: "Created On",
      type: "date",
      operators: ["equal", "less", "greater", "between"],
      valueSources: ["value"]
    },
    dateOfBirth: {
      label: "Date of Birth",
      type: "date",
      operators: ["equal", "less", "greater", "between"],
      valueSources: ["value"]
    },
    lastPurchasedDate: {
      label: "Last Activity On",
      type: "date",
      operators: ["equal", "less", "greater", "between"],
      valueSources: ["value"]
    }
  }
};