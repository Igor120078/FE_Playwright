import { ComponentInterface } from './componentInterface.js'

/**
 * Represents general behavior of input field. This does not include labels,
 * commonly adjacent to inputs.
 */
export interface InputInterface extends ComponentInterface<InputInterface> {
  /**
   * Sets expected text.
   * @param inputText text to be expected in input
   */
  setInputText(inputText: string): InputInterface
  /**
   * Sets placeholder value to be shown inside of input.
   * @param placeholder text of placeholder
   */
  setPlaceholder(placeholder: string): InputInterface
  /**
   * Performs action of typing into the input in browser.
   * @param inputText
   */
  sendTextToInput(inputText: string): Promise<InputInterface>
}
