import { Locator } from '@playwright/test'
import { TableFilterInterface } from '../../interfaces/table/tableFilterInterface.js'
import { TableRowInterface } from '../../interfaces/table/tableRowInterface.js'
import { CommonTable } from './common/commonTable.js'
import { ComponentUtilsFactory } from '../../factory/componentUtilsFactory.js'

/**
 * Table of simple key_value format without header.
 * All values are on same level without row wrapper element, hence key(column named as label)
 * value is found and first following-sibling is selected as value(column named as value).
 */
export class FormTable extends CommonTable<FormTable> {
  constructor() {
    super()
    this.headerLocatorXpath = 'NOT USED - COLUMN NAMES NOT AVAILABLE'
    this.bodyRowsLocatorXpath = "//div[contains(@class,'label-col')]"
    this.targetRowLocatorXpath = '//following-sibling::div[1]'
  }

  async readTableColumnNames(): Promise<string[]> {
    let columnNames: string[] = []
    columnNames.push('Label')
    columnNames.push('Value')
    return columnNames
  }

  protected async readRowValues(
    rowIndex: number,
    rowLocator: Locator,
    columnNames: string[]
  ): Promise<TableRowInterface> {
    const newRowInstance: TableRowInterface = ComponentUtilsFactory.createTableRow(rowIndex++)
    var columnIndex: number = 0
    newRowInstance.addValue(columnNames.at(columnIndex++) + '', await rowLocator.innerText())
    newRowInstance.addValue(
      columnNames.at(columnIndex++) + '',
      await rowLocator.locator(this.targetRowLocatorXpath).innerText()
    )
    return newRowInstance
  }

  async click(tableFilter: TableFilterInterface, rowElementLocator: Locator): Promise<void> {
    const filteredTableData = await this.readVisibleData(tableFilter)
    this.validateExactlyOneRowPresent(filteredTableData)
    const targetRowLocatorKey = this.locator.locator(
      "//div[contains(@class,'row-col')]" + '[' + (filteredTableData[0].getRowId() * 2 + 1) + ']'
    )
    const targetRowLocatorValue = this.locator.locator(
      "//div[contains(@class,'row-col')]" + '[' + (filteredTableData[0].getRowId() * 2 + 2) + ']'
    )

    if ((await targetRowLocatorKey.locator(rowElementLocator).count()) === 1) {
      await targetRowLocatorKey.locator(rowElementLocator).click()
      return
    }
    if ((await targetRowLocatorValue.locator(rowElementLocator).count()) === 1) {
      await targetRowLocatorValue.locator(rowElementLocator).click()
      return
    }
    throw Error('Unable to click on table element, single match for filter was not found!')
  }

  public newInstance(): FormTable {
    return new FormTable()
  }
}
