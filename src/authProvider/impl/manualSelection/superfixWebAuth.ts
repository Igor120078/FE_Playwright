import { BrowserContext, Page } from '@playwright/test'
import { SuperfixLandingPagePOM } from '../../../poms/login/superfixLogin/superfixLandingPagePOM.js'
import { MailClientPOM } from '../../../poms/mailClient/mailClientPOM.js'
import { AuthProviderInterface } from '../../interfaces/authProviderInterface.js'
import { SuperfixWebAuthIdentifierOptions } from '../../types/superfixWebAuthOptions.js'
import { MailClients } from '../../../poms/mailClient/mailClients.js'

export class SuperfixWebAuth implements AuthProviderInterface {
  private page: Page
  private context: BrowserContext
  private option?: SuperfixWebAuthIdentifierOptions
  private userIdentifier!: string

  constructor(page: Page) {
    this.page = page
    this.context = page.context()
    this.userIdentifier
  }

  /**
   * Enters login page and authenticates user via user interface using auth
   * method selected - see {@link SuperfixWebAuthIdentifierOptions}.
   * In case of email auth, unified mailbox should not contain any emails
   * from tested mail address.
   */
  async authenticate(): Promise<void> {
    await this.isConfigSufficient()
    if (this.option === SuperfixWebAuthIdentifierOptions.EMAIL) await this.emailLoginProcedure()
    if (this.option === SuperfixWebAuthIdentifierOptions.PHONE)
      throw Error('Login via phone for Superfix web user interface is not defined yet!')
  }

  setIdentifierOption(option: SuperfixWebAuthIdentifierOptions): SuperfixWebAuth {
    this.option = option
    return this
  }

  setUserIdentifier(userIdentifier: string): SuperfixWebAuth {
    this.userIdentifier = userIdentifier
    return this
  }

  private isConfigSufficient(): void {
    if (this.option === undefined)
      throw Error('For Superfix login via web interface, login identifier option must be defined!')
  }

  private async emailLoginProcedure(): Promise<void> {
    const loginPage: SuperfixLandingPagePOM = new SuperfixLandingPagePOM(this.page)
    const page2 = await this.context.newPage()
    const mailClient: MailClientPOM = new MailClientPOM(page2)

    await mailClient.navigateToEnv(MailClients.SUPERFIX)
    await loginPage.navigate()
    await loginPage.switchLoginTypeToEmail()
    await loginPage.setEmail(this.userIdentifier)
    await loginPage.requestCode()
    await mailClient.selectLastNewEmailByRecipient(this.userIdentifier)
    const secretCode = await mailClient.readSecretCodeFromEmail()
    await mailClient.deleteCurrentlySelectedEmail()
    await mailClient.closePage()

    await loginPage.setSecretCode(secretCode)
    await loginPage.submit()
  }
}
