import { ButtonDelegate } from './buttonDelegate.js'
import { CheckboxDelegate } from './checkboxDelegate.js'
import { ComboboxDelegate } from './comboboxDeletage.js'
import { DynamicComponentDelegate } from './dynamicComponentDelegate.js'
import { InputDelegate } from './inputDelegate.js'
import { LabelDelegate } from './labelDelegate.js'
import { RadioGroupDelegate } from './radioGroup.js'
import { RadioOptionDelegate } from './radioOptionDelegate.js'
import { TableDelegate } from './tableDelegate.js'

/**
 * Facilitates static creation of web-element representation objects used for
 * web testing purposes.
 */
export class ComponentFactory {
  public static createLabel() {
    return new LabelDelegate()
  }
  public static createTable() {
    return new TableDelegate()
  }
  public static createButton() {
    return new ButtonDelegate()
  }
  public static createInput() {
    return new InputDelegate()
  }
  public static createRadioGroup() {
    return new RadioGroupDelegate()
  }
  public static createRadioOption() {
    return new RadioOptionDelegate()
  }
  public static createCheckbox() {
    return new CheckboxDelegate()
  }
  public static createCombobox() {
    return new ComboboxDelegate()
  }
  public static createDynamicComponent() {
    return new DynamicComponentDelegate()
  }
}
