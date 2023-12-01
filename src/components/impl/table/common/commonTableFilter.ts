import { TableFilterInterface } from '../../../interfaces/table/tableFilterInterface.js'
import { TableRowInterface } from '../../../interfaces/table/tableRowInterface.js'

export class TableFilter implements TableFilterInterface {
  private columnValues: Map<string, string | RegExp>
  private rowValues: (string | RegExp)[]

  constructor() {
    this.columnValues = new Map<string, string>()
    this.rowValues = []
  }

  public static newInstance(): TableFilterInterface {
    return new TableFilter()
  }

  validateMatch(tableRow: TableRowInterface): boolean {
    for (let [key, value] of this.columnValues) {
      if (!tableRow.hasValueInColumn(value, key)) return false
    }
    for (let value of this.rowValues) {
      if (!tableRow.hasValue(value)) return false
    }
    return true
  }

  filterByColumnValue(column: string, value: string | RegExp): TableFilterInterface {
    this.columnValues.set(column, value)
    return this
  }

  filterByRowValue(value: string | RegExp): TableFilterInterface {
    this.rowValues.push(value)
    return this
  }
}
