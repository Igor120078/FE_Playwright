/**
 * Facilitates data reading, selection, generation and randomization
 * for purposes of testing from specific data source.
 */
export interface DataProviderInterface<C> {
  /**
   * Loads data from source.
   * @param source
   */
  load(source: C[]): void
  /**
   * Returns all current data content as array.
   */
  getAll(): C[]
  /**
   * Performs Object fetching from loaded data context.
   * Gets next item in current data content based on specified
   * algorythm. When all items are read, NULL is returned.
   * In order to start fetching all items from again, pointer
   * must be reset - see {@link resetReader()}.
   */
  getNext(): C | null
  /**
   * Repeatedly allows to get last fetched item by {@link getNext()}
   */
  getCurrent(): C | null
  /**
   * Restarts the poiter to current item for sequential object
   * fetching - see {@link getNext()}
   */
  resetReader(): void
  /**
   * Returns single random value from current data content.
   * Does not impact pointer.
   */
}
