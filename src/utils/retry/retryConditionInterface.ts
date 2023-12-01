/**
 * This interface serves as a wrapper for retry condition logic.
 */
export interface retryConditionInterface {
  /**
   * Evaluates any condition that is used inside of a retry.
   * @returns true if condition is met / false if retry should be triggered
   */
  evaluate(): Promise<boolean>
}
