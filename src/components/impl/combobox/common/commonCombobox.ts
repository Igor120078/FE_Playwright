import { Locator, expect } from '@playwright/test'
import { CommonComponent } from '../../commonComponent.js'
import { ComponentFactory } from '../../../factory/componentFactory.js'
import { ComboboxInterface } from '../../../interfaces/comboboxInterface.js'

export abstract class CommonCombobox<C extends CommonCombobox<C>>
  extends CommonComponent<C>
  implements ComboboxInterface
{
  /**
   * Selected values. In case of singleselect combobox, only one or zero values should be present.
   * In case of multiselect, any number is accepted.
   */
  protected selectedValues: string[] = []

  /**
   * Locator of dropdown, which will be derived from main locator using dropdown locator
   */
  //protected dropdown: Locator | undefined

  /**
   * Xpath to element which allows opening of dropdown. This might warry as combobox
   * can allow only click to certain button / place.
   */
  protected dropdownOpener_xpath: string = ''

  /**
   * Arbitrary string that will be used as replacemenent string on runtime. This is required
   * as dropdown selection works based on user input, which is not know upfront.
   */
  protected dropdownValueReplaceIndicator: string

  /**
   * Xpath navigation to dropdown element from user-provided combobox locator
   */
  protected dropdown_xpath: string = ''

  /**
   * Xpath to specific value in dropdown, which is built using text value of combobox
   * option.
   */
  protected dropdownOption_xpath: string = ''

  /**
   * Some comboboxes might have specific way of deselection (like cancel cross next to value).
   * In case this is available, it should be used. Otherwise deselecion can be done by text deletion
   * or repeated selection of value.
   */
  protected cancelOption_xpath: string = ''

  /**
   * Xpath to element which holds currently selected value / values
   */
  protected selectectedValue_xpath: string = ''

  constructor() {
    super()
    this.dropdownValueReplaceIndicator = '<replaceThisValue>'
  }

  abstract newInstance(): ComboboxInterface

  setSelectedValue(value: string): ComboboxInterface {
    this.selectedValues.push(value)
    return this
  }

  setDeselectedValue(value: string): ComboboxInterface {
    this.selectedValues.forEach((item, index) => {
      if (item === value) this.selectedValues.splice(index, 1)
    })
    return this
  }

  async selectNthOption(index: number): Promise<void> {
    const dropdown = await this.getDropdownLocator()
    await this.openDropdown()
    const optionCount: number | undefined = await dropdown.locator(this.dropdownOption_xpath).count()
    if (optionCount !== undefined && optionCount > index) {
      this.setSelectedValue(await dropdown.locator(this.dropdownOption_xpath).nth(index).innerText())
      await dropdown.locator(this.dropdownOption_xpath).nth(index).click()
    }
    await this.closeDropdownIfOpen()
  }

  async selectOption(value: string): Promise<void> {
    const dropdown = await this.getDropdownLocator()
    await this.openDropdown()
    if (dropdown != undefined) {
      await dropdown.locator(this.dropdownOption_xpath + ["//*[text()='" + value + "']"]).click()
      this.setSelectedValue(value)
    }
    await this.closeDropdownIfOpen()
  }

  async deselectOption(value: string): Promise<void> {
    await this.locator
      .locator(this.cancelOption_xpath.replace(this.dropdownValueReplaceIndicator, value))
      .first()
      .click()
    this.setDeselectedValue(value)
    await this.closeDropdownIfOpen()
  }

  async closeDropdownIfOpen(): Promise<void> {
    const dropdown = await this.getDropdownLocator()
    if (dropdown != undefined && (await dropdown.isVisible()) != false) {
      await this.locator.locator(this.dropdownOpener_xpath).first().click()
      await expect(dropdown).not.toBeVisible()
    }
  }

  protected async openDropdown(): Promise<void> {
    await this.locator.locator(this.dropdownOpener_xpath).first().click()
    const dropdown = (await this.getDropdownLocator()).first()
    await dropdown.waitFor({ state: 'visible' })
  }

  protected async getDropdownLocator(): Promise<Locator> {
    return this.locator.locator(this.dropdown_xpath).first()
  }

  async validateSelf(): Promise<void> {
    await super.validateSelf()
    this.validateValuesMatchExpectedValues(await this.readSelectedValues())
  }

  protected validateValuesMatchExpectedValues(values: string[]): boolean {
    //TODO rework to common comparator
    for (const value of values) {
      if (this.selectedValues.indexOf(value) < 0)
        throw Error('Value found selected in combobox: "' + value + '" was not expected to be selected!')
    }
    for (const value of this.selectedValues) {
      if (values.indexOf(value) < 0)
        throw Error('Value expected to be selected in combobox: "' + value + '" was not selected!')
    }

    return true
  }

  protected async readSelectedValues(): Promise<string[]> {
    const selectedValueComponent = ComponentFactory.createLabel()
      .label()
      .setLocator(this.locator.locator(this.selectectedValue_xpath))

    const allSelectedValuesComponent = ComponentFactory.createDynamicComponent()
      .defaultDynamicComponent()
      .setComponent(selectedValueComponent)

    const selectedValues: string[] = []
    const allEmails = await allSelectedValuesComponent.readAll()
    for (const email of allEmails) {
      selectedValues.push(await email.readElementText())
    }

    return selectedValues
  }
}
