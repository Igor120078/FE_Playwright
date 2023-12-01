import { BrowserContext, Page } from '@playwright/test'
import { AuthProviderInterface } from '../../interfaces/authProviderInterface.js'
import { WarehouseLandingPagePOM } from '../../../poms/login/warehouseLogin/warehouseLandingPagePOM.js'
import { MailClientPOM } from '../../../poms/mailClient/mailClientPOM.js'
import { MailClients } from '../../../poms/mailClient/mailClients.js'

export class WarehouseWebAuth implements AuthProviderInterface {
  private page: Page
  private context: BrowserContext
  private userIdentifier: string

  constructor(page: Page) {
    this.page = page
    this.context = page.context()
    this.userIdentifier = ''
  }
  async authenticate(): Promise<void> {
    await this.emailLoginProcedure()
  }

  setUserIdentifier(userIdentifier: string): WarehouseWebAuth {
    this.userIdentifier = userIdentifier
    return this
  }

  private async emailLoginProcedure(): Promise<void> {
    const loginPage: WarehouseLandingPagePOM = new WarehouseLandingPagePOM(this.page)
    const page2 = await this.context.newPage()
    const mailClient: MailClientPOM = new MailClientPOM(page2)
    await mailClient.navigateToEnv(MailClients.WAREHOUSE)

    await loginPage.navigate()
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
