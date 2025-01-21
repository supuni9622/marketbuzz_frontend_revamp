import { BasicConfig } from '@react-awesome-query-builder/ui'
import { Config } from '@react-awesome-query-builder/core'

const InitialConfig = BasicConfig

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
      type: 'text',
      valueSources: ['value'],
      operators: commonTextOperators
    },
    phoneNumber: {
      label: 'Phone Number',
      type: 'text',
      valueSources: ['value'],
      operators: commonTextOperators
    },
    totalTransactionsCount: {
      label: 'Total Transactions',
      type: 'number',
      valueSources: ['value'],
      operators: commonNumberOperators
    },
    'optIn.marketing.allowed': {
      label: 'Marketing Permission',
      type: 'boolean',
      valueSources: ['value'],
      operators: ['equal']
    },
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