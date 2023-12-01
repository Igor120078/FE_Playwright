import { ComboboxInterface } from '../../interfaces/comboboxInterface.js'
import { CommonCombobox } from './common/commonCombobox.js'

export class WhMultiselectCombobox extends CommonCombobox<WhMultiselectCombobox> implements ComboboxInterface {
  public newInstance(): ComboboxInterface {
    return new WhMultiselectCombobox()
  }

  constructor() {
    super()
    this.dropdown_xpath = '//div[contains(@class,"sv-dropdown")]'
    this.cancelOption_xpath =
      "//div[text()='" + this.dropdownValueReplaceIndicator + "'][@class='sv-item-content']/following-sibling::button"
    this.dropdownOption_xpath = "//div[contains(@class,'sv-dd-item')]"
    this.dropdownOpener_xpath = "//div[contains(@class,'indicator')]"
    this.selectectedValue_xpath = "//*[contains(@class,'sv-content')]//*[contains(@class,'sv-item')][@title]"
  }

  protected async openDropdown(): Promise<void> {
    await this.locator.locator(this.dropdownOpener_xpath).first().click()
    const dropdown = await this.getDropdownLocator()
    await dropdown.waitFor()
  }

  async deselectOption(value: string): Promise<void> {
    await this.locator.locator(this.cancelOption_xpath.replace(this.dropdownValueReplaceIndicator, value)).click()
    this.setDeselectedValue(value)
    const dropdown = await this.getDropdownLocator()
    dropdown.waitFor()
    await this.closeDropdownIfOpen()
  }
}
