import { ComboboxInterface } from '../../interfaces/comboboxInterface.js'
import { CommonCombobox } from './common/commonCombobox.js'

export class WuiSingleSelectCombobox extends CommonCombobox<WuiSingleSelectCombobox> implements ComboboxInterface {
  constructor() {
    super()
    this.dropdown_xpath = "//*[@class='dropdown-content']"
    this.dropdownOption_xpath = "//li[contains(@class,'option')]"
    this.cancelOption_xpath = ''
    this.dropdownOpener_xpath = '//button'
    this.selectectedValue_xpath = "//*[contains(@class,'value-container')]"
  }

  setSelectedValue(value: string): ComboboxInterface {
    this.selectedValues = []
    super.setSelectedValue(value)
    return this
  }

  deselectOption(value: string): Promise<void> {
    throw Error('Unable to deselect(' + value + ") option in 'WhSingleSelectCombobox' component!")
  }

  public newInstance(): ComboboxInterface {
    return new WuiSingleSelectCombobox()
  }
}
