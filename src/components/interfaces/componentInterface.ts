import { Locator } from '@playwright/test'

/**
 * Groups common behavior of web elements broadly applicable to all types
 * of components.
 */
export interface ComponentInterface<C> {
  /**
   * Access element on page and read all inner text.
   * @returns returns all inner texts from element as string
   */
  readElementText(): Promise<string>

  /**
   * Sets locator, which will be used to locate element. Locator search
   * is not performed immeadiatelly, rather it will be performed only
   * when active operation is performed on element. This parameter should
   * always be filled in constructor or directly on declaration of
   * element.
   * @param locator
   * @returns self reference
   */
  setLocator(locator: Locator): C

  /**
   * @returns currently used locator, last set using {@link setLocator()} method
   */
  getLocator(): Locator

  /**
   * Sets override on global timeout setting, when performing wait
   * operations on this element. Timeout will be applied to all active
   * interactions with page.
   * @param timeout timeout in ms
   * @returns self reference
   */
  setTimeout(timeout: number): C

  /**
   * Sets expected visibility of element. This state will be used as
   * "expectation" when validating this element on page.
   * @param visible
   * @returns self reference
   */
  setVisible(visible: boolean): C

  /**
   * Sets expected enabled/disabled state of element. This state
   * will be used as "expectation" when validating this element
   * on page.
   * @param visible
   * @returns self reference
   */
  setEnabled(enabled: boolean): C

  /**
   * Validates currently set enabled state matches state of element on
   * page. If state was not set for this element, throws error.
   * @returns boolean
   * @throws Error if expected state was not set yet {@link setEnabled}
   */
  validateEnabled(): Promise<boolean>

  /**
   * Sets expected read-only state of element. will be used as
   * "expectation" when validating this element on page.
   * @param readonly
   * @returns self reference
   */
  setReadonly(readonly: boolean): C

  /**
   * Sets expected translation key for given element. Can be used
   * to validate text content in multiple language translations.
   * @param translationKey
   * @returns self reference
   */
  setTranslationKey(translationKey: string): C

  /**
   * Validates currently set read-only state matches state of element on
   * page. If state was not set for this element, throws error.
   * @returns boolean
   * @throws Error if expected state was not set yet {@link setReadonly}
   */
  validateReadonly(): Promise<boolean>

  /**
   * Validates currently set visibility matches state of element on
   * page. If state was not set for this element, throws error.
   * @returns boolean
   * @throws Error if expected state was not set yet {@link setVisible}
   */
  validateVisible(): Promise<boolean>

  /**
   * Runs full validation of all currently set states. If no state
   * was set yet, no validation will be performed.
   */
  validateSelf(timeout?: number): Promise<void>

  /**
   * Runs full validation of text based on translation key.
   */
  validateText(): Promise<void>

  /**
   * Waits for element to appear in given state within timeout.
   * @param timeout wait time in ms. If no timeout is set, elements
   * default timeout is used - {@link setTimeout}. If Object timeout
   * is not set, default to gloabl config value.
   * @param state state for which wait is looking for. If no
   * state is specified, checks for visibility.
   */
  waitToAppear(timeout?: number, state?: string): void

  /**
   * Waits for element to not be visible.
   * @param timeout wait time in ms. If no timeout is set, elements
   * default timeout is used - {@link setTimeout}. If Object timeout
   * is not set, default to gloabl config value.
   */
  waitToDisappear(timeout?: number): void

  /**
   * Creates new instance of its own type.
   * @returns empty instance of its class
   */
  newInstance(): C
}
