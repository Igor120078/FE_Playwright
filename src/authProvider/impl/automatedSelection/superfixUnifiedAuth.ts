import { Page } from '@playwright/test'
import { PropertiesManager } from '../../../utils/propertiesManager/propertiesManager.js'
import { AuthFactory } from '../../factory/authFactory.js'
import { AuthProviderInterface } from '../../interfaces/authProviderInterface.js'
import { SuperfixWebAuthIdentifierOptions } from '../../types/superfixWebAuthOptions.js'
import { AuthTypes } from '../../types/authTypes.js'

export class SuperfixUnifiedAuth implements AuthProviderInterface {
  private page: Page
  private authType!: AuthTypes
  private loginType!: SuperfixWebAuthIdentifierOptions
  private userIdentifier!: string

  constructor(page: Page) {
    this.page = page
    this.loadAuthType()
  }

  async authenticate(): Promise<void> {
    switch (this.authType) {
      case AuthTypes.WEBLOGIN:
        await AuthFactory.createSuperfixWebAuth(this.page)
          .setUserIdentifier(this.userIdentifier)
          .setIdentifierOption(this.loginType)
          .authenticate()
    }
  }

  private loadAuthType(): void {
    const authTypeString = PropertiesManager.getProperty('TEST_AUTH_SUPERFIX_STYLE')
    switch (authTypeString.toUpperCase()) {
      case 'WEBLOGIN':
        this.authType = AuthTypes.WEBLOGIN
        this.loginType = this.getLoginType()
        this.userIdentifier = PropertiesManager.getProperty('TEST_AUTH_SUPERFIX_IDENTIFIER')
        return
      case 'BEARERTOKEN':
        this.authType = AuthTypes.BEARERTOKEN
        return
    }
    throw Error('Unrecognized auth type: ' + authTypeString)
  }

  private getLoginType(): SuperfixWebAuthIdentifierOptions {
    const authTypeString = PropertiesManager.getProperty('TEST_AUTH_SUPERFIX_TYPE')
    switch (authTypeString.toUpperCase()) {
      case 'EMAIL':
        return SuperfixWebAuthIdentifierOptions.EMAIL
      case 'PHONE':
        return SuperfixWebAuthIdentifierOptions.PHONE
    }
    throw Error('Undefined superfix login type: ' + authTypeString)
  }
}
