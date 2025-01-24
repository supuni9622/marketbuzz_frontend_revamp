const currentDate = new Date();
const sixMonthsAgo = new Date();
sixMonthsAgo.setMonth(currentDate.getMonth() - 6);
export const PreDefinedSegments = [
  {
    id: "6710f0667809843b5574e269",
    description: "Customers with a known phone number.",
    name: "Reachable Customers",
    filter: {
      id: "b8baaab9-0123-4456-b89a-b192bcefca46",
      type: "group",
      children1: [
        {
          type: "rule",
          id: "bb9bbaaa-89ab-4cde-b012-3192bcf048d0",
          properties: {
            fieldSrc: "field",
            field: "phoneNumber",
            operator: "is_not_null",
            value: [],
            valueSrc: [],
            valueType: []
          }
        }
      ]
    },
    organizationId: "66f285b19ae9edb89693a5f1",
    createdBy: "66f285b19ae9edb89693a5f1",
    updatedBy: "66f285b19ae9edb89693a5f1",
    createdOn: "2024-10-17T11:09:27.016Z",
    updatedOn: "2024-10-17T11:09:27.016Z",
    __v: 0
  },
  {
    id: "6710f0667809843b5574e370",
    description:
      "Customers who have made only one visit or purchase, indicating they are new to your brand.",
    name: "First Time Customers",
    filter: {
      id: "98889ba8-0123-4456-b89a-b192b905b3cc",
      type: "group",
      children1: [
        {
          type: "rule",
          id: "ab8aba89-89ab-4cde-b012-3192b907cba0",
          properties: {
            fieldSrc: "field",
            field: "totalTransactionsCount",
            operator: "equal",
            value: [1],
            valueSrc: ["value"],
            valueType: ["number"],
            valueError: [null]
          }
        }
      ]
    },
    organizationId: "66f285b19ae9edb89693a5f1",
    createdBy: "66f285b19ae9edb89693a5f1",
    updatedBy: "66f285b19ae9edb89693a5f1",
    createdOn: "2024-10-17T11:09:27.016Z",
    updatedOn: "2024-10-17T11:09:27.016Z",
    __v: 0
  },
  {
    id: "6710f0667809843b5574e371",
    name: "Inactive  Customers",
    description:
      "Customers who haven't made a purchase in over six months, indicating a need for re-engagement.",
    filter: {
      id: "a8a889ab-0123-4456-b89a-b192bcb386c7",
      type: "group",
      children1: [
        {
          type: "rule",
          id: "989baab8-89ab-4cde-b012-3192bcb59e75",
          properties: {
            fieldSrc: "field",
            field: "lastPurchasedDate",
            operator: "less",
            value: [sixMonthsAgo.toISOString().split("T")[0]],
            valueSrc: ["value"],
            valueType: ["date"],
            valueError: [null]
          }
        }
      ]
    },
    organizationId: "66f285b19ae9edb89693a5f1",
    createdBy: "66f285b19ae9edb89693a5f1",
    updatedBy: "66f285b19ae9edb89693a5f1",
    createdOn: "2024-10-17T11:09:27.016Z",
    updatedOn: "2024-10-17T11:09:27.016Z",
    __v: 0
  }
];

export const isMarketingAllowedRule = {
  type: "rule",
  id: "9bb8b98a-4567-489a-bcde-f192bcf0edbd",
  properties: {
    fieldSrc: "field",
    field: "optIn.marketing.allowed",
    operator: "equal",
    value: [true],
    valueSrc: ["value"],
    valueType: ["boolean"],
    valueError: [null]
  }
};
