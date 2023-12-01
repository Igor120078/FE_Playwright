import { Page } from '@playwright/test'
import { AuthProviderInterface } from '../../interfaces/authProviderInterface.js'
import { AuthFactory } from '../../factory/authFactory.js'
import { PropertiesManager } from '../../../utils/propertiesManager/propertiesManager.js'

export class WarehouseUnifiedAuth implements AuthProviderInterface {
  private page: Page
  private userIdentifier!: string

  constructor(page: Page) {
    this.page = page
    this.loadAuthType()
  }

  async authenticate(): Promise<void> {
    await AuthFactory.createWarehouseWebAuth(this.page).setUserIdentifier(this.userIdentifier).authenticate()
  }

  private loadAuthType(): void {
    this.userIdentifier = PropertiesManager.getProperty('TEST_AUTH_WAREHOUSE_IDENTIFIER')
  }
}
