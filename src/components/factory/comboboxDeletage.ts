import { WhMultiselectCombobox } from '../impl/combobox/whMultiselectCombobox.js'
import { WuiSearchCombobox } from '../impl/combobox/wuiSearchCombobox.js'
import { WuiSimpleMultiselectCombobox } from '../impl/combobox/wuiSimpleMultiselectCombobox.js'
import { WuiSingleSelectCombobox } from '../impl/combobox/wuiSingleSelectCombobox.js'
import { ComboboxInterface } from '../interfaces/comboboxInterface.js'

export class ComboboxDelegate {
  public whMultiselectCombobox(): ComboboxInterface {
    return new WhMultiselectCombobox()
  }

  public wuiSimpleMultiselectCombobox(): ComboboxInterface {
    return new WuiSimpleMultiselectCombobox()
  }

  public wuiSingleSelectCombobox(): ComboboxInterface {
    return new WuiSingleSelectCombobox()
  }

  public wuiSearchCombobox(): ComboboxInterface {
    return new WuiSearchCombobox()
  }
}
