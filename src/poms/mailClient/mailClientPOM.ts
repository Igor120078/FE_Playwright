import { Page } from '@playwright/test'
import { ComponentFactory } from '../../components/factory/componentFactory.js'
import { ButtonInterface } from '../../components/interfaces/buttonInterface.js'
import { LabelInterface } from '../../components/interfaces/labelInterface.js'
import { POM } from '../pom.js'
import { MailClients } from './mailClients.js'
import { PropertiesManager } from '../../utils/propertiesManager/propertiesManager.js'
import { CounterConditions } from '../../components/types/counterConditions.js'
import { Timer } from '../../utils/timer/timer.js'

export class MailClientPOM extends POM {
  private sideBar_label: LabelInterface
  private deleteOpenMail_button: ButtonInterface
  private singleMailItem_button: ButtonInterface
  private loadingIndicator_label: LabelInterface
  private initialMailCount!: number

  private dynamicComponent

  constructor(page: Page) {
    super(page)
    this.sideBar_label = ComponentFactory.createLabel()
      .label()
      .setLocator(this.page.locator("//span[text()='MailDev']"))
      .setVisible(true)
    this.singleMailItem_button = ComponentFactory.createButton()
      .button()
      .setLocator(this.page.locator("//ul[@class='email-list']/li"))
    this.dynamicComponent = ComponentFactory.createDynamicComponent()
      .defaultDynamicComponent<ButtonInterface>()
      .setComponent(this.singleMailItem_button)
    this.deleteOpenMail_button = ComponentFactory.createButton()
      .button()
      .setLocator(this.page.locator("//a[@ng-click='delete(item)']"))
      .setVisible(false)
    this.loadingIndicator_label = ComponentFactory.createLabel()
      .label()
      .setLocator(this.page.locator("//*[@ng-if='itemsLoading']"))
  }

  public async closePage(): Promise<void> {
    this.page.close()
  }

  public async navigateToEnv(mailClient: MailClients) {
    await this.page.goto(PropertiesManager.getProperty('UNIFIED_MAIL_CLIENT_' + mailClient))
    await this.validateAllComponents()
    await this.loadingIndicator_label.waitToDisappear()
    this.initialMailCount = await this.dynamicComponent.count()
  }

  public async navigate(): Promise<void> {
    throw Error('Navigate not implementd, use navigateToEnv(env: TempEnvironment)')
  }

  public async goBack(): Promise<void> {
    await this.page.goBack()
  }

  public async selectLastNewEmailByRecipient(recipientMail: string) {
    const timer = new Timer().setTimeout(15000).setJumpDelay(1000)
    while ((await timer.nextTick()) != false) {
      await this.dynamicComponent.waitForCount(CounterConditions.MORE_THAN, this.initialMailCount, { timeout: 15000 })
      let listOfMessages = await this.dynamicComponent.readAll()
      for (let i = 0; i < listOfMessages.length - this.initialMailCount; i++) {
        if ((await listOfMessages[i].readElementText()).includes(recipientMail)) {
          timer.stop()
          await listOfMessages[i].click()
        }
      }
    }
    if (timer.isTimedOut()) throw Error('Unable to find a new message for recipient: ' + recipientMail)
  }

  public async readSecretCodeFromEmail(): Promise<string> {
    return await this.parseCodeFromSentence(
      (await this.page
        .frameLocator('//iframe')
        .first()
        .locator('//p[contains(text(),"(bez uvozovek)")]')
        .textContent()) + ''
    )
  }

  public async deleteCurrentlySelectedEmail(): Promise<void> {
    await this.deleteOpenMail_button.click()
  }

  public async validateAllComponents(): Promise<void> {
    await this.sideBar_label.validateSelf()
  }

  private parseCodeFromSentence(sentence: string): string {
    return sentence.match(/(?<=")[^"]+(?=")/)![0]
  }
}
