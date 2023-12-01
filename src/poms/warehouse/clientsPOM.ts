import { Page } from '@playwright/test'
import { POM } from '../pom'
import { InputInterface } from '../../components/interfaces/inputInterface'
import { ComponentFactory } from '../../components/factory/componentFactory'
import { TableInterface } from '../../components/interfaces/table/tableInterface'
import { PropertiesManager } from '../../utils/propertiesManager/propertiesManager'
import { ButtonInterface } from '../../components/interfaces/buttonInterface'
import { ComponentUtilsFactory } from '../../../src/components/factory/componentUtilsFactory'

export class ClientsPOM extends POM {
  private nameSearch_input: InputInterface
  private icoSearch_input: InputInterface
  private clients_table: TableInterface
  private hideFilters: ButtonInterface

  constructor(page: Page) {
    super(page)

    this.nameSearch_input = ComponentFactory.createInput()
      .freeTextInput()
      .setLocator(this.page.getByPlaceholder('whouseAdmin.searchByName'))
      .setVisible(true)
      .setReadonly(false)
    this.icoSearch_input = ComponentFactory.createInput()
      .freeTextInput()
      .setLocator(this.page.getByPlaceholder('whouseAdmin.searchByIco'))
      .setVisible(true)
      .setReadonly(false)
    this.clients_table = ComponentFactory.createTable()
      .tableStatic()
      .setLocator(this.page.locator('//table'))
      .setVisible(true)
      .setReadonly(false)
    this.hideFilters = ComponentFactory.createButton()
      .button()
      .setLocator(this.page.locator('(//*[contains(@class,"header card-header")]//button)[2]'))
      .setVisible(true)
      .setReadonly(false)
  }

  async navigate(): Promise<void> {
    await this.page.goto(
      PropertiesManager.getProperty('WAREHOUSE_BASE_URL_CZ') + PropertiesManager.getProperty('WAREHOUSE_ROUTES_CLIENTS')
    )
    await this.validateAllComponents()
  }

  async goBack(): Promise<void> {
    await this.page.goBack()
  }

  async validateAllComponents(): Promise<void> {
    await this.nameSearch_input.validateSelf()
    await this.icoSearch_input.validateSelf()
    await this.clients_table.validateSelf()
  }

  async hideFilter(): Promise<void> {
    await this.hideFilters.click()
    await this.nameSearch_input.setVisible(false)
    await this.icoSearch_input.setVisible(false)
    //await this.validateAllComponents()
  }

  async showFilter(): Promise<void> {
    // await this.nameSearch_input.setVisible(false)
    // await this.emailSearch_input.setVisible(false)
    // await this.phoneSearch_input.setVisible(false)
    //await this.validateAllComponents()
    await this.hideFilters.click()
    await this.nameSearch_input.setVisible(true)
    await this.icoSearch_input.setVisible(true)
    //await this.validateAllComponents()
  }

  async setName(name: string): Promise<void> {
    await this.nameSearch_input.sendTextToInput(name)
    await this.page.keyboard.press('Enter')
    await this.validateAllComponents
  }

  async clearName(): Promise<void> {
    //await this.nameSearch_input.validateEnabled()
    await this.page.getByPlaceholder('whouseAdmin.searchByName').dblclick()
    await this.page.keyboard.press('Backspace')
    await this.page.keyboard.press('Enter')
  }

  async setIco(ico: string): Promise<void> {
    await this.icoSearch_input.sendTextToInput(ico)
    await this.page.keyboard.press('Enter')
    await this.validateAllComponents
  }

  async clearIco(): Promise<void> {
    await this.page.getByPlaceholder('whouseAdmin.searchByIco').dblclick()
    await this.page.keyboard.press('Backspace')
    await this.page.keyboard.press('Enter')
  }

  // async verifyMatchingNameInTable() {
  //   const numberOfMatchingRows: Number = (
  //     await this.clients_table.readVisibleData(
  //       ComponentUtilsFactory.createTableFilter().filterByRowValue('Woltair Heat & Power Germany GmbH')
  //     )
  //   ).length

  //   if (numberOfMatchingRows != 1)
  //     throw Error('filter does not match only one result! Number of matches found: ' + numberOfMatchingRows)
  // }

  async verifyMatchingNameInTable(name: string): Promise<void> {
    const numberOfMatchingRows: Number = (
      await this.clients_table.readVisibleData(ComponentUtilsFactory.createTableFilter().filterByRowValue(name))
    ).length

    if (numberOfMatchingRows != 1)
      throw Error('filter does not match only one result! Number of matches found: ' + numberOfMatchingRows)
  }

  async verifyMatchingIcoInTable() {
    const numberOfMatchingRows: Number = (
      await this.clients_table.readVisibleData(ComponentUtilsFactory.createTableFilter().filterByRowValue('WOLTAIR2'))
    ).length

    if (numberOfMatchingRows != 1)
      throw Error('filter does not match only one result! Number of matches found: ' + numberOfMatchingRows)
  }
}
