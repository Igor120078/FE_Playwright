import { ComponentInterface } from './componentInterface.js'

/**
 * Represents general behavior of Combobox
 */
export interface ComboboxInterface extends ComponentInterface<ComboboxInterface> {
  /**
   * Sets value expected to be selected in combobox.
   * @param value
   */
  setSelectedValue(value: string): ComboboxInterface

  /**
   * Searches for value previously set as selected, and if found,
   * removes it from the list of expected selected items.
   * @param value
   */
  setDeselectedValue(value: string): ComboboxInterface

  /**
   * Performs selection of the item in the broser on the element.
   * @param value item by name which option will be selected
   */
  selectOption(value: string): Promise<void>

  /**
   * Performs index based selection of the item in the browser on the
   * element. Index starts at 0 for first element as present in DOM.
   */
  selectNthOption(index: number): Promise<void>

  /**
   * Performs deselect action in the browser on the element
   * specified by its textual name.
   * @param value value to be deselected by its text
   */
  deselectOption(value: string): Promise<void>

  /**
   * Performs close action on the dropdown on the combobox in
   * the browser if if is currently open. If dropdown is not
   * present, no action is taken and no error is thrown.
   */
  closeDropdownIfOpen(): Promise<void>
}
