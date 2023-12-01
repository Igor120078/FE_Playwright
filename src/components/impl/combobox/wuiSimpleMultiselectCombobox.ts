import { ComboboxInterface } from '../../interfaces/comboboxInterface.js'
import { CommonCombobox } from './common/commonCombobox.js'

export class WuiSimpleMultiselectCombobox
  extends CommonCombobox<WuiSimpleMultiselectCombobox>
  implements ComboboxInterface
{
  constructor() {
    super()
    this.dropdown_xpath = "//*[@class='dropdown-content']" //"//li[contains(@class,'list')]"
    this.dropdownOption_xpath = "//li[contains(@class,'option')]"
    this.cancelOption_xpath =
      "//span[text()='" + this.dropdownValueReplaceIndicator + "']/ancestor::span//button[contains(@class,'remove')]"
    this.dropdownOpener_xpath = "//button[@class='button svelte-1q98iw8 nowrap icon']"
    this.selectectedValue_xpath = "//*[contains(@class,'tag-label')]"
  }

  public newInstance(): ComboboxInterface {
    return new WuiSimpleMultiselectCombobox()
  }
}
