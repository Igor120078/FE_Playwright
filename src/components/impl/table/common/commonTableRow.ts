import { TableRowInterface } from '../../../interfaces/table/tableRowInterface.js'

export class CommonTableRow implements TableRowInterface {
  private rowId!: number
  private values: Map<string, string>

  constructor(id?: number) {
    if (id !== undefined) this.rowId = id
    this.values = new Map<string, string>()
  }

  setRowId(id: number): void {
    this.rowId = id
  }

  getRowId(): number {
    return this.rowId
  }

  addValue(columnName: string, value: string): void {
    this.values.set(columnName, value)
  }

  getValue(columnName: string): string | undefined {
    if (this.hasColumn(columnName)) return this.values.get(columnName)!
    return undefined
  }

  getAllRowValues(): Map<string, string> {
    return this.values
  }

  hasColumn(columnName: string): boolean {
    return this.values.has(columnName)
  }

  hasValue(rowValue: string | RegExp): boolean {
    for (let value of this.values.values()) {
      if (rowValue instanceof RegExp && value.match(rowValue)) return true
      if (typeof rowValue === 'string' && rowValue === value) return true
    }
    return false
  }

  hasValueInColumn(value: string | RegExp, column: string): boolean {
    if (this.hasColumn(column)) {
      if (value instanceof RegExp && this.values.get(column)!.match(value)) return true
      if (typeof value == 'string' && this.values.get(column) === value) return true
    }
    return false
  }
}
