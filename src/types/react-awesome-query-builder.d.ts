declare module '@react-awesome-query-builder/ui' {
  import { FC } from 'react'
  import { ImmutableTree, Config, BuilderProps } from '@react-awesome-query-builder/core'

  export const Query: FC<{
    value: ImmutableTree
    onChange: (immutableTree: ImmutableTree, config: Config) => void
    renderBuilder: (props: BuilderProps) => JSX.Element
  } & Config>

  export const Builder: FC<BuilderProps>
  export const BasicConfig: Config
}

declare module '@react-awesome-query-builder/core' {
  export interface JsonGroup {
    id: string
    type: 'group'
    properties: {
      conjunction: 'AND' | 'OR'
      not: boolean
    }
    children1: {
      [key: string]: {
        type: 'rule'
        properties: {
          field: string | null
          operator: string | null
          value: any[]
          valueSrc: string[]
          valueType: string[]
        }
      }
    }
  }

  export interface Config {
    fields: {
      [key: string]: {
        label: string
        type: string
        valueSources: string[]
        operators: string[]
      }
    }
    settings: {
      maxNesting: number
      maxNumberOfRules: number
      showNot: boolean
      canReorder: boolean
      canRegroup: boolean
      [key: string]: any
    }
    operators: {
      [key: string]: {
        label: string
        [key: string]: any
      }
    }
  }

  export interface BuilderProps {
    [key: string]: any
  }

  export type ImmutableTree = any

  export const Utils: {
    uuid: () => string
    checkTree: (tree: any, config: Config) => ImmutableTree
    loadTree: (tree: JsonGroup) => ImmutableTree
    getTree: (immutableTree: ImmutableTree) => JsonGroup
  }
} 