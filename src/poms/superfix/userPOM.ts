import { Page } from '@playwright/test'
import { LabelInterface } from '../../components/interfaces/labelInterface'
import { POM } from '../pom'
import { ComponentFactory } from '../../components/factory/componentFactory'
import { InputInterface } from '../../components/interfaces/inputInterface'
import { ComboboxInterface } from '../../components/interfaces/comboboxInterface'
import { CheckboxInterface } from '../../components/interfaces/checkboxInterface'
import { ButtonInterface } from '../../components/interfaces/buttonInterface'
import UsersAddPOM from './userAddPOM'

export default class ListOfUsersPOM extends POM {
  private pageHeading_label: LabelInterface
  private searchByUser_input: InputInterface
  private filterByName_input: InputInterface
  private filterByRoles_combobox: ComboboxInterface
  private filterByInstalationWorkersGroup_combobox: ComboboxInterface
  private filterByInstalationWorkersEmploymentType_combobox: ComboboxInterface
  private checkBoxShowInactiveUsers_checkBox: CheckboxInterface
  private filterHide_button: ButtonInterface
  private usersAddNew_button: ButtonInterface

  constructor(page: Page) {
    super(page)
    this.pageHeading_label = ComponentFactory.createLabel()
      .label()
      .setVisible(true)
      .setLocator(this.page.locator("//*[text()='users.title']"))

    this.searchByUser_input = ComponentFactory.createInput()
      .freeTextInput()
      .setLocator(this.page.getByText('forms.selectEmployee.placeholder').first())
      .setVisible(true)

    this.filterByName_input = ComponentFactory.createInput()
      .freeTextInput()
      .setLocator(this.page.getByText('general.name').first())
      .setVisible(true)

    this.filterByRoles_combobox = ComponentFactory.createCombobox()
      .wuiSimpleMultiselectCombobox()
      .setLocator(this.page.getByText('users.filter.roles.placeholder'))
      .setVisible(true)

    this.filterByInstalationWorkersGroup_combobox = ComponentFactory.createCombobox()
      .wuiSimpleMultiselectCombobox()
      .setLocator(this.page.getByText('installationWorkers.orderGroup.title'))
      .setVisible(true)

    this.filterByInstalationWorkersEmploymentType_combobox = ComponentFactory.createCombobox()
      .wuiSimpleMultiselectCombobox()
      .setLocator(this.page.getByText('installationWorkers.orderGroup.title'))
      .setVisible(true)

    this.checkBoxShowInactiveUsers_checkBox = ComponentFactory.createCheckbox()
      .checkbox()
      .setLocator(this.page.getByText('users.showInactive.label'))
      .setVisible(true)

    this.filterHide_button = ComponentFactory.createButton()
      .button()
      .setLocator(this.page.getByText('filter.hide'))
      .setVisible(true)

    this.usersAddNew_button = ComponentFactory.createButton()
      .button()
      .setLocator(this.page.getByText('users.addNew').first())
      .setVisible(true)
  }

  async navigate(): Promise<void> {
    await this.page.goto('https://www.dev.superfix.dev/users')
    await this.validateAllComponents()
  }

  async goBack(): Promise<void> {
    await this.page.goBack()
  }

  async hideFilter(): Promise<void> {
    await this.filterHide_button.click()
    await this.searchByUser_input.setVisible(false)
    await this.filterByName_input.setVisible(false)
    await this.filterByRoles_combobox.setVisible(false)
    await this.filterByInstalationWorkersGroup_combobox.setVisible(false)
    await this.filterByInstalationWorkersEmploymentType_combobox.setVisible(false)
    await this.checkBoxShowInactiveUsers_checkBox.setVisible(false)
    await this.validateAllComponents()
  }

  async showFilter(): Promise<void> {
    await this.filterHide_button.click()
    await this.searchByUser_input.setVisible(false)
    await this.filterByName_input.setVisible(false)
    await this.filterByRoles_combobox.setVisible(false)
    await this.filterByInstalationWorkersGroup_combobox.setVisible(false)
    await this.filterByInstalationWorkersEmploymentType_combobox.setVisible(false)
    await this.checkBoxShowInactiveUsers_checkBox.setVisible(false)
    await this.validateAllComponents()
    await this.filterHide_button.click()
    await this.searchByUser_input.setVisible(false)
    await this.filterByName_input.setVisible(false)
    await this.filterByRoles_combobox.setVisible(false)
    await this.filterByInstalationWorkersGroup_combobox.setVisible(false)
    await this.filterByInstalationWorkersEmploymentType_combobox.setVisible(false)
    await this.checkBoxShowInactiveUsers_checkBox.setVisible(false)
    await this.validateAllComponents()
  }

  async fillFilter(
    userName?: string,
    name?: string,
    roles?: string,
    workersGroup?: string,
    workersEmploymentType?: string
  ) {
    if (userName !== undefined) await this.searchByUser_input.sendTextToInput(userName)
    if (name !== undefined) await this.filterByName_input.sendTextToInput(name)
    if (roles !== undefined) await this.filterByRoles_combobox.selectOption(roles)
    if (workersGroup !== undefined) await this.filterByInstalationWorkersGroup_combobox.selectOption(workersGroup)
    if (workersEmploymentType !== undefined)
      await this.filterByInstalationWorkersEmploymentType_combobox.selectOption(workersEmploymentType)
  }

  async showInnactiveUser() {
    throw Error('Status...pending')
  }

  async createNewUser(): Promise<UsersAddPOM> {
    await this.usersAddNew_button.click()
    const newUserPOM = new UsersAddPOM(this.page)
    await newUserPOM.validateAllComponents()
    return newUserPOM
  }
}
