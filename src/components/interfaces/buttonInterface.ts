import { ComponentInterface } from './componentInterface.js'

/**
 * Represents general behavior of button.
 */
export interface ButtonInterface extends ComponentInterface<ButtonInterface> {
  /**
   * Performs clicks in the browser on the element.
   * @returns self reference
   */
  click(): Promise<ButtonInterface>
}
