import { CounterConditions } from '../types/counterConditions.js'
import { ComponentInterface } from './componentInterface.js'

export interface DynamicComponentInterface<C extends ComponentInterface<C>> {
  /**
   * Component with locator, which will be searched in the page. Multiple instances
   * of object can be matched in page.
   * @param component any component which implements DefaultComponentInterface
   */
  setComponent(component: C): DynamicComponentInterface<C>

  /**
   * @returns number of matches for component provided by {@link setComponent()}
   */
  count(): Promise<number>

  /**
   * Waits for specified number of elements to be present. E.g.: waitForCount(CounterConditions.EXACT,5)
   * will wait for given element to appear on page exactly 5 times. waitForCount(CounterConditions.LESS_THAN,5)
   * will wait for <5 occurences on the page.
   * @param condition type of matching condition (>=<)
   * @param count number of expected count to validate
   * @param optionalTimout allows override of default timeout
   */
  waitForCount(
    condition: CounterConditions,
    count: number,
    options?: { timeout?: number; jumpDelay?: number }
  ): Promise<void>

  /**
   * Reads the page based on component provided via {@link setComponent} and provides list of all
   * components which match this components locator.
   */
  readAll(): Promise<C[]>
}
