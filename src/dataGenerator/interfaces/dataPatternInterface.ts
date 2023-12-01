/**
 * Facilitates data generation definition. Implementations should
 * prioritize builder pattern in order to set any required attributes,
 * which will have impact on resulting string.
 */
export interface DataPatternInterface {
  /**
   * Generates string representing data based on predefined pattern
   */
  generate(): string
}
