import { Page } from '@playwright/test'
import { POM } from '../pom'
import { ComponentFactory } from '../../components/factory/componentFactory'
import { ButtonInterface } from '../../components/interfaces/buttonInterface'
import { InputInterface } from '../../components/interfaces/inputInterface'
import { TableInterface } from '../../components/interfaces/table/tableInterface'
import { PropertiesManager } from '../../utils/propertiesManager/propertiesManager'
import { ComponentUtilsFactory } from '../../../src/components/factory/componentUtilsFactory'

export class UsersPOM extends POM {
  private addUser_button: ButtonInterface
  private hideFilters: ButtonInterface
  private nameSearch_input: InputInterface
  private emailSearch_input: InputInterface
  private phoneSearch_input: InputInterface
  private users_table: TableInterface
  private editUsers_button: ButtonInterface

  constructor(page: Page) {
    super(page)

    this.addUser_button = ComponentFactory.createButton()
      .button()
      .setLocator(this.page.locator("(//*[contains(@class,'page-header svelte-5txmz6')]//button)[1]"))
      .setVisible(true)
      .setReadonly(false)
    this.hideFilters = ComponentFactory.createButton()
      .button()
      .setLocator(this.page.locator('(//*[contains(@class,"header card-header")]//button)[2]'))
      .setVisible(true)
      .setReadonly(false)
    this.nameSearch_input = ComponentFactory.createInput()
      .freeTextInput()
      .setLocator(this.page.getByPlaceholder('whouseAdmin.searchByName'))
      .setVisible(true)
      .setReadonly(false)
      .setPlaceholder('Vyhledat podle jména')
    this.emailSearch_input = ComponentFactory.createInput()
      .freeTextInput()
      .setLocator(this.page.getByPlaceholder('whouseAdmin.searchByEmail'))
      .setVisible(true)
      .setReadonly(false)
      .setPlaceholder('Vyhledat podle emailu')
    this.phoneSearch_input = ComponentFactory.createInput()
      .freeTextInput()
      .setLocator(this.page.getByPlaceholder('whouseAdmin.searchByPhone'))
      .setVisible(true)
      .setReadonly(false)
      .setPlaceholder('Vyhledat podle telefonu')
    this.users_table = ComponentFactory.createTable().tablePaged().setVisible(true).setReadonly(false)
    this.editUsers_button = ComponentFactory.createButton()
      .button()
      .setLocator(this.page.locator("(//button[@class='button svelte-1q98iw8 nowrap icon'])[2]"))
      .setVisible(true)
      .setReadonly(false)
  }

  async navigate(): Promise<void> {
    await this.page.goto(
      PropertiesManager.getProperty('WAREHOUSE_BASE_URL_CZ') + PropertiesManager.getProperty('WAREHOUSE_ROUTES_HOME')
    )
    await this.validateAllComponents()
  }
  async goBack(): Promise<void> {
    await this.page.goBack()
  }
  async validateAllComponents(): Promise<void> {
    await this.addUser_button.validateSelf()
    await this.hideFilters.validateSelf()
    await this.nameSearch_input.validateSelf()
    await this.emailSearch_input.validateSelf()
    await this.phoneSearch_input.validateSelf()
    await this.editUsers_button.validateSelf()
  }

  async hideFilter(): Promise<void> {
    await this.hideFilters.click()
    await this.nameSearch_input.setVisible(false)
    await this.emailSearch_input.setVisible(false)
    await this.phoneSearch_input.setVisible(false)
    //await this.validateAllComponents()
  }

  async showFilter(): Promise<void> {
    // await this.nameSearch_input.setVisible(false)
    // await this.emailSearch_input.setVisible(false)
    // await this.phoneSearch_input.setVisible(false)
    //await this.validateAllComponents()
    await this.hideFilters.click()
    await this.nameSearch_input.setVisible(true)
    await this.emailSearch_input.setVisible(true)
    await this.phoneSearch_input.setVisible(true)
    //await this.validateAllComponents()
  }

  async setName(name: string): Promise<void> {
    await this.nameSearch_input.sendTextToInput(name)
    await this.page.keyboard.press('Enter')
    await this.validateAllComponents
  }

  async setEmail(email: string): Promise<void> {
    await this.emailSearch_input.sendTextToInput(email)
    await this.validateAllComponents
  }

  async setPhone(phone: string): Promise<void> {
    await this.phoneSearch_input.sendTextToInput(phone)
    await this.validateAllComponents
  }

  async addUser(): Promise<void> {
    await this.addUser_button.click()
  }

  async editUser(): Promise<void> {
    await this.editUsers_button.click()
  }

  async verifyMatchingNameInTable() {
    const numberOfMatchingRows: Number = (
      await this.users_table.readVisibleData(
        ComponentUtilsFactory.createTableFilter().filterByRowValue('Automation Test')
      )
    ).length

    if (numberOfMatchingRows != 1)
      throw Error('filter does not match only one result! Number of matches found: ' + numberOfMatchingRows)
  }

  async verifyMatchingEmailInTable() {
    const numberOfMatchingRows: Number = (
      await this.users_table.readVisibleData(
        ComponentUtilsFactory.createTableFilter().filterByRowValue('automationtest@whouse.cz')
      )
    ).length

    if (numberOfMatchingRows != 1)
      throw Error('filter does not match only one result! Number of matches found: ' + numberOfMatchingRows)
  }

  async verifyMatchingPhoneInTable() {
    const numberOfMatchingRows: Number = (
      await this.users_table.readVisibleData(
        ComponentUtilsFactory.createTableFilter().filterByRowValue('Automation Test')
      )
    ).length

    if (numberOfMatchingRows != 1)
      throw Error('filter does not match only one result! Number of matches found: ' + numberOfMatchingRows)
  }
}
