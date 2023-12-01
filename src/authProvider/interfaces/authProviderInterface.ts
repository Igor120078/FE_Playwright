/**
 * Facilitates authentication process for any type of
 * application access.
 */
export interface AuthProviderInterface {
  /**
   * Performs authentication process.
   */
  authenticate(): Promise<void>
}
