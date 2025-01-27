import {
  BaseTranslator,
  Comparator,
  Comparators,
  Comparison,
  Operation,
  Operator,
  Operators,
  StructuredQuery,
  isFilterEmpty,
} from '@langchain/core/structured_query'
import type { ElasticVectorSearch } from '@langchain/community/vectorstores/elasticsearch'

export type ElasticsearchFilter = {
  operator: string
  field: string
  value: unknown
}

export class ElasticsearchTranslator<T extends ElasticVectorSearch> extends BaseTranslator<T> {
  declare VisitOperationOutput: ElasticsearchFilter[]
  declare VisitComparisonOutput: ElasticsearchFilter

  allowedOperators: Operator[] = [Operators.and, Operators.or, Operators.not]
  allowedComparators: Comparator[] = [
    Comparators.eq,
    Comparators.gt,
    Comparators.gte,
    Comparators.lt,
    Comparators.lte,
    Comparators.contain,
    Comparators.like,
  ]

  formatFunction(func: Operator | Comparator): string {
    if (func in Comparators) {
      if (!this.allowedComparators.includes(func as Comparator)) {
        throw new Error(`Comparator ${func} not allowed. Allowed comparators: ${this.allowedComparators.join(', ')}`)
      }
    } else if (func in Operators) {
      if (!this.allowedOperators.includes(func as Operator)) {
        throw new Error(`Operator ${func} not allowed. Allowed operators: ${this.allowedOperators.join(', ')}`)
      }
    } else {
      throw new Error('Unknown comparator or operator')
    }

    const mapDict: Record<string, string> = {
      and: 'term',
      or: 'or',
      not: 'exclude',
      eq: 'term',
      gt: 'range',
      gte: 'range',
      lt: 'range',
      lte: 'range',
      contain: 'match',
      like: 'match',
    }

    return mapDict[func]
  }

  visitOperation(operation: Operation): this['VisitOperationOutput'] {
    const { operator, args } = operation
    if (!this.allowedOperators.includes(operator)) {
      throw new Error('Operator not allowed')
    }

    if (!args || args.length === 0) {
      return []
    }

    const results: ElasticsearchFilter[] = []
    for (const arg of args) {
      const result = arg.accept(this)
      if (Array.isArray(result)) {
        results.push(...result)
      } else {
        // @ts-expect-error xz TODO: fix this
        results.push(result)
      }
    }

    if (operator === Operators.and) {
      return results
    }

    return results.map((filter) => ({
      ...filter,
      operator: this.formatFunction(operator),
    }))
  }

  visitComparison(comparison: Comparison): this['VisitComparisonOutput'] {
    const { comparator, attribute, value } = comparison
    if (!this.allowedComparators.includes(comparator)) {
      throw new Error('Comparator not allowed')
    }

    const operator = this.formatFunction(comparator)

    if ([Comparators.gt, Comparators.gte, Comparators.lt, Comparators.lte].includes(comparator)) {
      return {
        operator,
        field: attribute,
        value: {
          [comparator]: value,
        },
      }
    }

    if ([Comparators.contain, Comparators.like].includes(comparator)) {
      return {
        operator,
        field: attribute,
        value: {
          query: value as string,
          ...(comparator === Comparators.like && { fuzziness: 'AUTO' }),
        },
      }
    }

    return {
      operator,
      field: attribute,
      value,
    }
  }

  visitStructuredQuery(query: StructuredQuery): this['VisitStructuredQueryOutput'] {
    if (!query.filter) {
      return {}
    }

    const result = query.filter.accept(this)
    return {
      filter: Array.isArray(result) ? result : [result],
    }
  }

  mergeFilters(
    defaultFilter: ElasticsearchFilter[] | undefined,
    generatedFilter: ElasticsearchFilter[] | undefined,
    mergeType = 'and',
  ): ElasticsearchFilter[] | undefined {
    if (isFilterEmpty(defaultFilter) && isFilterEmpty(generatedFilter)) {
      return undefined
    }

    if (isFilterEmpty(defaultFilter) || mergeType === 'replace') {
      return generatedFilter
    }

    if (isFilterEmpty(generatedFilter)) {
      return defaultFilter
    }

    if (mergeType === 'and') {
      return [...(defaultFilter || []), ...(generatedFilter || [])]
    }

    if (mergeType === 'or') {
      return [...(defaultFilter || []), ...(generatedFilter || [])].map((filter) => ({
        ...filter,
        operator: 'or',
      }))
    }

    throw new Error('Unknown merge type')
  }
}
