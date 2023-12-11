/* eslint-disable import/order */
import type { Page } from '@playwright/test'
import { POM } from '../../pom'
import { ComponentFactory } from '../../../components/factory/componentFactory'
import { PropertiesManager } from '../../../utils/propertiesManager/propertiesManager'
import type { ButtonInterface } from '../../../components/interfaces/buttonInterface'
import type { InputInterface } from '../../../components/interfaces/inputInterface'
import type { LabelInterface } from '../../../components/interfaces/labelInterface'

export class FveCalcStep7aPOM extends POM {
  private fveCalcMetaTitle: LabelInterface
  private performanceText: LabelInterface
  private performanceValue: LabelInterface
  private panelCountText: LabelInterface
  private panelCountValue: LabelInterface
  private batteryCapacityText: LabelInterface
  private batteryCapacityValue: LabelInterface
  private productionText: LabelInterface
  private productionValue: LabelInterface
  private totalPriceText: LabelInterface
  private totalPriceValue: LabelInterface
  private grantsText: LabelInterface
  private grantsValue: LabelInterface
  private priceWithGrantsText: LabelInterface
  private priceWithGrantsValue: LabelInterface
  private yearlySavingsText: LabelInterface
  private yearlySavingsValue: LabelInterface
  private showValuesBtn: ButtonInterface
  private emailInput: InputInterface
  private phoneInput: InputInterface
  private whyEmailText: LabelInterface
  private whyPhoneText: LabelInterface
  private showCalculationResultBtn: ButtonInterface
  private woltairConditions: LabelInterface

  constructor(page: Page) {
    super(page)

    this.fveCalcMetaTitle = ComponentFactory.createLabel()
      .label()
      .setLocator(this.page.getByText('web.meta.PRODUCTS.PHOTOVOLTAICS.KALKULACKA.meta.title'))
      .setVisible(true)
    this.performanceText = ComponentFactory.createLabel()
      .label()
      .setLocator(this.page.getByText('Výkon:'))
      .setVisible(true) // should be translation key
    this.performanceValue = ComponentFactory.createLabel()
      .label()
      .setLocator(this.page.locator("//td[text()='Výkon:']/following-sibling::td"))
      .setVisible(true)
    this.panelCountText = ComponentFactory.createLabel()
      .label()
      .setLocator(this.page.getByText('Počet panelů'))
      .setVisible(true)
    this.panelCountValue = ComponentFactory.createLabel()
      .label()
      .setLocator(this.page.locator("//td[text()='Počet panelů']/following-sibling::td"))
      .setVisible(true)
    this.batteryCapacityText = ComponentFactory.createLabel()
      .label()
      .setLocator(this.page.getByText('Kapacita baterií'))
      .setVisible(true)
    this.batteryCapacityValue = ComponentFactory.createLabel()
      .label()
      .setLocator(this.page.locator("//td[text()='Kapacita baterií']/following-sibling::td"))
      .setVisible(true)
    this.productionText = ComponentFactory.createLabel()
      .label()
      .setLocator(this.page.getByText('Předpokládaná výrova'))
      .setVisible(true)
    this.productionValue = ComponentFactory.createLabel()
      .label()
      .setLocator(this.page.locator("//td[text()='Předpokládaná výrova']/following-sibling::td"))
      .setVisible(true)
    this.totalPriceText = ComponentFactory.createLabel()
      .label()
      .setLocator(this.page.getByText('Celková cena s DPH:'))
      .setVisible(true)
    this.totalPriceValue = ComponentFactory.createLabel()
      .label()
      .setLocator(this.page.locator("//td[text()='Celková cena s DPH:']/following-sibling::td"))
      .setVisible(true)
    this.grantsText = ComponentFactory.createLabel().label().setLocator(this.page.getByText('Dotace')).setVisible(true)
    this.grantsValue = ComponentFactory.createLabel()
      .label()
      .setLocator(this.page.locator("//td[text()='Dotace']/following-sibling::td"))
      .setVisible(true)
    this.priceWithGrantsText = ComponentFactory.createLabel()
      .label()
      .setLocator(this.page.getByText('Cena po dotaci'))
      .setVisible(true)
    this.priceWithGrantsValue = ComponentFactory.createLabel()
      .label()
      .setLocator(this.page.locator("//td[text()='Cena po dotaci']/following-sibling::td"))
      .setVisible(true)
    this.yearlySavingsText = ComponentFactory.createLabel()
      .label()
      .setLocator(this.page.getByText('Roční úspora'))
      .setVisible(true)
    this.yearlySavingsValue = ComponentFactory.createLabel()
      .label()
      .setLocator(this.page.locator("//td[text()='Roční úspora']/following-sibling::td"))
      .setVisible(true)

    this.showValuesBtn = ComponentFactory.createButton()
      .button()
      .setLocator(this.page.getByText('Zobrazit hodnoty'))
      // .setTranslationKey('')
      .setVisible(true)

    this.emailInput = ComponentFactory.createInput()
      .freeTextInput()
      .setLocator(this.page.getByTestId('email'))
      .setVisible(false)
    this.phoneInput = ComponentFactory.createInput()
      .freeTextInput()
      .setLocator(this.page.getByTestId('phone'))
      .setVisible(false)
    this.whyEmailText = ComponentFactory.createLabel()
      .label()
      .setLocator(this.page.getByText('Proč potřebujeme email?'))
      .setVisible(false)
    this.whyPhoneText = ComponentFactory.createLabel()
      .label()
      .setLocator(this.page.getByText('Proč potřebujeme telefon?'))
      .setVisible(false)
    this.showCalculationResultBtn = ComponentFactory.createButton()
      .button()
      .setLocator(this.page.getByTestId('submit'))
      // .setTranslationKey('')
      .setVisible(false)

    this.woltairConditions = ComponentFactory.createLabel()
      .label()
      .setLocator(this.page.getByText('general.woltairConditions'))
      .setVisible(true)
  }

  async navigate(): Promise<void> {
    const testUrl = PropertiesManager.getProperty('PLAYWRIGHT_BASE_URL') + '/fotovoltaika/kalkulacka'
    await this.page.goto(testUrl)
  }

  async goBack(): Promise<void> {
    await this.page.goBack()
  }

  async validateAllComponents(): Promise<void> {
    await this.fveCalcMetaTitle.validateSelf()
    await this.performanceText.validateSelf()
    await this.performanceValue.validateSelf()
    await this.panelCountText.validateSelf()
    await this.panelCountValue.validateSelf()
    await this.batteryCapacityText.validateSelf()
    await this.batteryCapacityValue.validateSelf()
    await this.productionText.validateSelf()
    await this.productionValue.validateSelf()
    await this.totalPriceText.validateSelf()
    await this.totalPriceValue.validateSelf()
    await this.grantsText.validateSelf()
    await this.grantsValue.validateSelf()
    await this.priceWithGrantsText.validateSelf()
    await this.priceWithGrantsValue.validateSelf()
    await this.yearlySavingsText.validateSelf()
    await this.yearlySavingsValue.validateSelf()
    await this.showValuesBtn.validateSelf()
    await this.emailInput.validateSelf()
    await this.phoneInput.validateSelf()
    await this.whyEmailText.validateSelf()
    await this.whyPhoneText.validateSelf()
    await this.showCalculationResultBtn.validateSelf()
    await this.woltairConditions.validateSelf()
  }

  async checkIfVariantWithShowValues() {
    return await this.showValuesBtn.validateVisible()
  }

  async clickShowValues() {
    await this.showValuesBtn.click()
    await this.showValuesBtn.setVisible(false)
    await this.emailInput.setVisible(true)
    await this.phoneInput.setVisible(true)
    await this.whyEmailText.setVisible(true)
    await this.whyPhoneText.setVisible(true)
    await this.showCalculationResultBtn.setVisible(true)
  }

  async fillEmailInput(email: string) {
    await this.emailInput.sendTextToInput(email)
    await this.emailInput.validateSelf()
  }
  async fillPhoneInput(phone: string) {
    await this.phoneInput.sendTextToInput(phone)
    await this.phoneInput.validateSelf()
  }

  async clickShowCalculationResults() {
    await this.showCalculationResultBtn.click()
    await this.showCalculationResultBtn.waitToDisappear()
  }
}
