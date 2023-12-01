import { Locator } from '@playwright/test'
import { ComponentInterface } from '../componentInterface.js'
import { TableFilterInterface } from './tableFilterInterface.js'
import { TableRowInterface } from './tableRowInterface.js'

/**
 * Represents common table behavior.
 */
export interface TableInterface extends ComponentInterface<TableInterface> {
  /**
   * Sets expected column names visible in the table.
   * @param columnNames
   * @returns self reference
   */
  setColumnNames(columnNames: string[]): TableInterface

  /**
   * Sets expected table data
   * @param tableContext table data expected to be in table
   * @returns self reference
   */
  setTableContext(tableContext: TableRowInterface[]): TableInterface

  /**
   * Performs read action on the table in the browser. Only reads
   * data currently loaded into table.
   * @returns data in form of raw data as read from the table
   */
  readVisibleData(filter?: TableFilterInterface): Promise<TableRowInterface[]>

  /**
   * Selects a single row and applies click action on specified element within this row.
   * Filter provided must restrict row selection to single row, otherwise throws error.
   * @param filter criteria to restrict targeted row to single match
   * @param rowElementLocator locator to be clicked in given table row identified by `filter`
   * @throws Error if zero or multiple rows match filter
   */
  click(filter: TableFilterInterface, rowElementLocator: Locator): Promise<void>
}
