import { ComponentInterface } from './componentInterface.js'

/**
 * Represents general behavior of checkbox
 */
export interface CheckboxInterface extends ComponentInterface<CheckboxInterface> {
  /**
   * Sets expected checked/unchecked state of the element. This state
   * will be used as "expectation" when performing validation of element
   * in browser.
   * @returns self reference
   */
  setChecked(checked: boolean): CheckboxInterface
  /**
   * Performs checks in the browser on the element. If the element
   * was unchecked, it will remain unchecked.
   * @returns self reference
   */
  check(): Promise<CheckboxInterface>
  /**
   * Performs uncheck in the browser on the element. If element was
   * unchecked before this call, element will remain unchecked.
   * @returns self reference
   */
  uncheck(): Promise<CheckboxInterface>

  /**
   * Applies check state based on true/false value. Use this method in case you
   * want to drive the state of checking or unchecking dynamically.
   * @param checkStateToApply - true - performs check / false performs uncheck
   * @throws Error if checkStateToApply is undefined
   */
  applyCheckState(checkStateToApply: boolean): Promise<CheckboxInterface>
}
