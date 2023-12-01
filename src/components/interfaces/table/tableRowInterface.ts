/**
 * Represents raw table data in form of dictionary - key: value pars.
 */
export interface TableRowInterface {
  /**
   * Row ID is used to have a guaranteed way index rows within webpage.
   * @param id represents row index
   */
  setRowId(id: number): void

  /**
   * Row ID is used to have a guaranteed way index rows within webpage.
   * @returns index of the row
   */
  getRowId(): number

  /**
   * Add one key:value pair to row. Table row accepts unlimited number
   * of key:value pairs.
   * @param columnName name of table column
   * @param value text value of table data
   */
  addValue(columnName: string, value: string): void

  /**
   * Returns string value based on column name.
   * @param columnName name of column under which value is saved
   * @returns undefined if column doesnt exist, string value if found
   */
  getValue(columnName: string): string | undefined

  /**
   * Used to retrieve all key:value pairs saved in row. Key represents table column names
   * and value represents table data.
   * @returns map of values if any value was added. empty map if no value was added
   */
  getAllRowValues(): Map<string, string>

  /**
   * Checks if column name was already added to row data - see {@link addValue()}
   * @param columnName true if exact column name was found, false if column name does not exist
   */
  hasColumn(columnName: string | RegExp): boolean

  /**
   * Checks if value is found in any row within row.
   * @param rowValue string to be matched in current row
   * @returns true if text was found, false if text was not found
   */
  hasValue(rowValue: string | RegExp): boolean

  /**
   * Checks if value is found under specific column in row.
   * @param value string to be matched in current row
   * @param column name of column where `value` is searched
   * @returns true if value was found under specified column. false if no match
   * was found
   *
   */
  hasValueInColumn(value: string | RegExp, column: string | RegExp): boolean
}
