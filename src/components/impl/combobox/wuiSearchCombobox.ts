import { ComboboxInterface } from '../../interfaces/comboboxInterface.js'
import { CommonCombobox } from './common/commonCombobox.js'

export class WuiSearchCombobox extends CommonCombobox<WuiSearchCombobox> implements ComboboxInterface {
  /**
   * The component combobox has a search field
   * This code defines a TypeScript class named SuperfixSearchCombobox that extends another class called CommonCombobox<SuperfixSearchCombobox>.
   * The class also implements the ComboboxInterface
   */
  private dropdownSearch_xpath: string

  constructor() {
    super()
    this.dropdown_xpath = "//div[contains(@class,'dropdown-content')]"
    this.dropdownSearch_xpath = "//div[@class='search-container']//input"
    this.cancelOption_xpath = ''
    this.dropdownOption_xpath = "//ul[contains(@class,'list')]//*"
    this.dropdownOpener_xpath = '//button'
  }

  /**
   * This method is used to select an option in the combobox.
   * It locates the dropdown and the search input field within the dropdown.
   * It opens the dropdown, clicks on the search input, fills it with the provided value, and
   * clicks on the option in the dropdown that matches the given value.
   */
  async selectOption(value: string): Promise<void> {
    const dropdown = await this.getDropdownLocator()
    const searchInput = await dropdown.locator(this.dropdownSearch_xpath).first()
    await this.openDropdown()
    if (dropdown != undefined) {
      await searchInput.click()
      await searchInput.fill(value)
      await dropdown.locator(this.dropdownOption_xpath + ["[text()='" + value + "']"]).click()
    }
  }
  /**
   * This method throws an error indicating that selecting the nth option is not available for search comboboxes.
   * It suggests using selectOption instead.
   */
  async selectNthOption(index: number): Promise<void> {
    throw Error('Select Nth(' + index + ') option is not available for search combobox. Use selectOption instead')
  }
  /**
   * This method throws an error indicating that deselecting an option is not available for search comboboxes.
   */
  async deselectOption(value: string): Promise<void> {
    throw Error('Deselect option(' + value + ') is not available for search combobox')
  }
  /**
   * This method throws an error indicating that it's not implemented.
   */
  newInstance(): ComboboxInterface {
    throw new Error('Method not implemented.')
  }
  /**
   * This method returns an empty array. It seems to be a placeholder and
   * does not provide any functionality to read selected values.
   */
  protected async readSelectedValues(): Promise<string[]> {
    return []
  }
}
