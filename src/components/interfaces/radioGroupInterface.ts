import { ComponentInterface } from './componentInterface.js'

/**
 * Radio group interface represents group of selectable items out
 * which only exactly one element can be selected at any given time.
 */
export interface RadioGroupInterface extends ComponentInterface<RadioGroupInterface> {
  /**
   * Adds expected radio option in dedicated radio button group.
   * @param radioOption radio option to be added
   */
  addRadioOption(radioOption: RadioOptionInterface): RadioGroupInterface
  /**
   * Performs selection operation in the browser on the element
   * by index option. Options are numbered by order in which they
   * were added to radio group - {@link addRadioOption}
   * @param index index of option starting from 0
   */
  selectOptionByIndex(index: number): RadioGroupInterface
  /**
   * Performs selection operation in the browser on the element
   * by name of option. Name is taken from radio option -
   * {@link RadioOptionInterface.setName}
   * @param name name of option to be selected
   */
  selectOptionByName(name: string): RadioGroupInterface
}

/**
 * Radio option representing on of multiple option in radio group.
 */
export interface RadioOptionInterface extends ComponentInterface<RadioOptionInterface> {
  /**
   * Sets option name, which can be used to address given
   * option when selecting options on page.
   * @param name name of option
   * @returns self reference
   */
  setOptionName(name: string): RadioOptionInterface
  /**
   * Sets expected text of option.
   * @param text expected text in option
   * @returns self reference
   */
  setOptionText(text: string): RadioOptionInterface
  /**
   * @returns name of option given by {@link setOptionName}.
   */
  getOptionName(): string
  /**
   * Sets expected state of selection for given option.
   * @param isSelected
   * @returns self reference
   */
  setIsSelected(isSelected: boolean): RadioOptionInterface
  /**
   * Performs selection operation on the element in the browser.
   * @returns self reference
   */
  select(): Promise<RadioOptionInterface>
}
