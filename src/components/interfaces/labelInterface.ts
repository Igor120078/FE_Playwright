import { ComponentInterface } from './componentInterface.js'

/**
 * Represents common behavior of label, of common text fields(headings,
 * titles, input labels, ...).
 */
export interface LabelInterface extends ComponentInterface<LabelInterface> {
  /**
   * Sets expected text value of the label.
   * @param labelText text value of label
   */
  setLabelText(labelText: string): LabelInterface
}
