import { BasicConfig } from "@react-awesome-query-builder/ui";
import type { Config } from "@react-awesome-query-builder/core";
import { Utils as QbUtils } from "@react-awesome-query-builder/core";

const InitialConfig = BasicConfig;

export const filterConfig: Config = {
  ...InitialConfig,
  settings: {
    ...InitialConfig.settings,
    maxNesting: 1,
    maxNumberOfRules: 6,
    showErrorMessage: true,
    showNot: false,
    clearValueOnChangeOp: true
  },
  operators: {
    ...InitialConfig.operators,
    equal: {
      ...InitialConfig.operators.equal,
      label: "Equals"
    },
    not_equal: {
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
    }
  },
  fields: {
    firstName: {
      label: "First Name",
      type: "text"
    },
    lastName: {
      label: "Last Name",
      type: "text"
    },
    email: {
      label: "Email",
      type: "text"
    },
    phoneNumber: {
      label: "Phone Number",
      type: "text"
    },
    totalTransactionsCount: {
      label: "Visits",
      type: "number",
      valueSources: ["value"]
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
} 