import { TableRowInterface } from './tableRowInterface.js'

export interface TableFilterInterface {
  /**
   * Filtering criteria where value is looked up strictly in specified `column`
   * by specified `value`.
   * @param column literal name of column to be searched
   * @param value string or regex value to match in specified `column`
   * @returns self
   */
  filterByColumnValue(column: string, value: string | RegExp): TableFilterInterface

  /**
   * Filtering criteria where value is looked up in any column by specified `value`.
   * @param value string or regex value to match in any column inside row
   * @returns self
   */
  filterByRowValue(value: string | RegExp): TableFilterInterface

  /**
   * Checks if provided `tableRow` matches all criteria in current filter.
   * @param tableRow table row to which all filtering criteria will be applied
   * @returns true if row matches all filtering criteria, false if any single criteria doesnt match
   */
  validateMatch(tableRow: TableRowInterface): boolean
}
