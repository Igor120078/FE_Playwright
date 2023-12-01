import { CommonTable } from './common/commonTable.js'

/**
 * Table which does not have header values. Name of each columns is added in format `column_x`.
 * The only override is in process of column name reading. First data row is used to declare
 * correct number of columns. All other methods are same as static table.
 */
export class StaticTableWithoutHeader extends CommonTable<StaticTableWithoutHeader> {
  constructor() {
    super()
    this.headerLocatorXpath = '//tbody//tr[1]//td'
  }

  async readTableColumnNames(): Promise<string[]> {
    let columnNames: string[] = []
    var columnCount = await this.locator.locator(this.headerLocatorXpath).count()
    for (let i = 0; i < columnCount; i++) {
      columnNames.push('column_' + i)
    }
    return columnNames
  }

  public newInstance(): StaticTableWithoutHeader {
    return new StaticTableWithoutHeader()
  }
}
