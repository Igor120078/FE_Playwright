import { Locator } from '@playwright/test'
import { TableInterface } from '../../../interfaces/table/tableInterface.js'
import { CommonComponent } from '../../commonComponent.js'
import { TableRowInterface } from '../../../interfaces/table/tableRowInterface.js'
import { TableFilterInterface } from '../../../interfaces/table/tableFilterInterface.js'
import { ComponentUtilsFactory } from '../../../factory/componentUtilsFactory.js'

export abstract class CommonTable<C extends CommonTable<C>> extends CommonComponent<C> implements TableInterface {
  private columnNames: string[] = []
  private tableContext: TableRowInterface[] = []

  /**
   * locator of elements in table header, which hold column names
   */
  protected headerLocatorXpath: string
  /**
   * locator of rows, that are considered table data (make sure header row is not trageted by this xpath)
   */
  protected bodyRowsLocatorXpath: string
  /**
   * locator which targets single row at a time. table data are iterated over this locator using [index]
   * xpath suffix
   */
  protected targetRowLocatorXpath: string
  /**
   * locator which identifies single data cell locator inside of a row. when reading row data, this locator
   * will be iterated over in order to read cells one-by-one
   */
  protected targetRowdDataLocatorXpath: string

  protected constructor() {
    super()
    this.headerLocatorXpath = '//thead//th'
    this.bodyRowsLocatorXpath = '//tbody//tr'
    this.targetRowLocatorXpath = '//tr'
    this.targetRowdDataLocatorXpath = '//td'
  }

  abstract newInstance(): CommonTable<C>

  setColumnNames(columnNames: string[]): TableInterface {
    this.columnNames = columnNames
    return this
  }

  setTableContext(tableContext: TableRowInterface[]): TableInterface {
    this.tableContext = tableContext
    return this
  }

  validateText(): Promise<void> {
    throw new Error('Method not implemented.')
  }

  async readVisibleData(tableFilter?: TableFilterInterface): Promise<TableRowInterface[]> {
    return await this.readVisibleTableData(await this.readTableColumnNames(), tableFilter)
  }

  async click(tableFilter: TableFilterInterface, rowElementLocator: Locator): Promise<void> {
    const filteredTableData = await this.readVisibleData(tableFilter)
    this.validateExactlyOneRowPresent(filteredTableData)
    const targetRowLocator = this.locator.locator(
      this.targetRowLocatorXpath + '[' + (filteredTableData[0].getRowId() + 1) + ']'
    )
    await targetRowLocator.locator(rowElementLocator).click()
  }

  async readTableColumnNames(): Promise<string[]> {
    let headerLocator: Locator = this.locator.locator(this.headerLocatorXpath)
    let columnNames: string[] = []
    for (const column of await headerLocator.all()) {
      columnNames.push(await column.innerText())
    }
    return columnNames
  }

  protected async readVisibleTableData(
    columnNames: string[],
    filter?: TableFilterInterface
  ): Promise<TableRowInterface[]> {
    const rowLocator: Locator = this.locator.locator(this.bodyRowsLocatorXpath)
    const tableContext: TableRowInterface[] = []
    var rowIndex: number = 0
    for (const row of await rowLocator.all()) {
      const currentRow: TableRowInterface = await this.readRowValues(rowIndex++, row, columnNames)
      if (filter !== undefined && !filter.validateMatch(currentRow)) {
        continue
      }
      tableContext.push(currentRow)
    }
    return tableContext
  }

  protected validateExactlyOneRowPresent(filteredTableData: TableRowInterface[] | undefined): boolean {
    if (filteredTableData === undefined || filteredTableData.length === 0)
      throw Error('No rows match filter criteria, single match is expected! Matches: ' + filteredTableData)
    if (filteredTableData.length !== 1) throw Error('Multiple rows match flter criteria, single match is expected!')

    return true
  }

  protected async readRowValues(
    rowIndex: number,
    rowLocator: Locator,
    columnNames: string[]
  ): Promise<TableRowInterface> {
    const newRowInstance: TableRowInterface = ComponentUtilsFactory.createTableRow(rowIndex++)
    var columnIndex: number = 0
    for (const column of await rowLocator.locator(this.targetRowdDataLocatorXpath).all()) {
      newRowInstance.addValue(columnNames.at(columnIndex++) + '', await column.innerText())
    }
    return newRowInstance
  }
}
