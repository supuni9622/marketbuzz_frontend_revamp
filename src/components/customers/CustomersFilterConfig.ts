import { BasicConfig } from '@react-awesome-query-builder/ui'
import { Config } from '@react-awesome-query-builder/core'

const InitialConfig = BasicConfig

interface SelectFieldConfig {
  label: string;
  type: 'select';
  valueSources: string[];
  operators: string[];
  options: Array<{ value: string; label: string }>;
}

interface BaseFieldConfig {
  label: string;
  type: string;
  valueSources: string[];
  operators: string[];
}

type FieldConfig = BaseFieldConfig | SelectFieldConfig;

const commonTextOperators = ['equal', 'not_equal', 'contains', 'not_contains']
const commonNumberOperators = ['equal', 'not_equal', 'less', 'less_or_equal', 'greater', 'greater_or_equal', 'between']
const commonDateOperators = ['equal', 'not_equal', 'less', 'less_or_equal', 'greater', 'greater_or_equal', 'between']

export const filterConfig: Config = {
  ...InitialConfig,
  fields: {
    firstName: {
      label: 'First Name',
      type: 'text',
      valueSources: ['value'],
      operators: commonTextOperators
    },
    lastName: {
      label: 'Last Name',
      type: 'text',
      valueSources: ['value'],
      operators: commonTextOperators
    },
    email: {
      label: 'Email',
      type: 'email',
      valueSources: ['value'],
      operators: commonTextOperators
    },
    phoneNumber: {
      label: 'Phone Number',
      type: 'tel',
      valueSources: ['value'],
      operators: commonTextOperators
    },
    totalTransactionsCount: {
      label: 'Total Transactions',
      type: 'number',
      valueSources: ['value'],
      operators: commonNumberOperators
    },
    avgSpend: {
      label: 'Average Spend',
      type: 'number',
      valueSources: ['value'],
      operators: commonNumberOperators
    },
    visits: {
      label: 'Number of Visits',
      type: 'number',
      valueSources: ['value'],
      operators: commonNumberOperators
    },
    lastActivityOn: {
      label: 'Last Activity',
      type: 'date',
      valueSources: ['value'],
      operators: commonDateOperators
    },
    'optIn.marketing.allowed': {
      label: 'Marketing Permission',
      type: 'select',
      valueSources: ['value'],
      operators: ['equal'],
      options: [
        { value: 'true', label: 'Allowed' },
        { value: 'false', label: 'Denied' },
      ],
    } as SelectFieldConfig,
    createdOn: {
      label: 'Created Date',
      type: 'date',
      valueSources: ['value'],
      operators: commonDateOperators
    },
    dateOfBirth: {
      label: 'Date of Birth',
      type: 'date',
      valueSources: ['value'],
      operators: commonDateOperators
    },
    lastPurchasedDate: {
      label: 'Last Purchase Date',
      type: 'date',
      valueSources: ['value'],
      operators: commonDateOperators
    }
  },
  settings: {
    ...InitialConfig.settings,
    maxNesting: 3,
    maxNumberOfRules: 10,
    showNot: true,
    canReorder: true,
    canRegroup: true
  },
  operators: {
    ...InitialConfig.operators,
    equal: { label: 'Equals' },
    not_equal: { label: 'Not Equals' },
    less: { label: 'Less Than' },
    less_or_equal: { label: 'Less Than or Equal' },
    greater: { label: 'Greater Than' },
    greater_or_equal: { label: 'Greater Than or Equal' },
    between: { label: 'Between' },
    contains: { label: 'Contains' },
    not_contains: { label: 'Does Not Contain' }
  }
} 