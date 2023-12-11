/* eslint-disable import/order */
import type { Page } from '@playwright/test'
import { POM } from '../../pom'
import { ComponentFactory } from '../../../components/factory/componentFactory'
import type { ButtonInterface } from '../../../components/interfaces/buttonInterface'
import type { LabelInterface } from '../../../components/interfaces/labelInterface'
import type { DynamicComponentInterface } from '../../../components/interfaces/dynamicComponentInterface'

export class OfferPageHowManyVariantsPOM extends POM {
  private fveOfferTitle: LabelInterface
  private offerVariants: ButtonInterface
  private dynamicOfferVariants: DynamicComponentInterface<ButtonInterface>
  private variantsNames: LabelInterface
  private dynamicVariantsNames: DynamicComponentInterface<LabelInterface>

  constructor(page: Page) {
    super(page)

    this.fveOfferTitle = ComponentFactory.createLabel()
      .label()
      .setLocator(this.page.getByText('woltadvisor.offer.title', { exact: true }))
      .setVisible(true)

    this.offerVariants = ComponentFactory.createButton()
      .button()
      .setLocator(this.page.getByText('general.variant', { exact: true }))
    this.dynamicOfferVariants = ComponentFactory.createDynamicComponent()
      .defaultDynamicComponent<ButtonInterface>()
      .setComponent(this.offerVariants)

    this.variantsNames = ComponentFactory.createLabel()
      .label()
      .setLocator(this.page.locator("//span[contains(text(),'FVE_OFFER_TYPE')]"))
    this.dynamicVariantsNames = ComponentFactory.createDynamicComponent()
      .defaultDynamicComponent<LabelInterface>()
      .setComponent(this.variantsNames)
  }

  async navigate(): Promise<void> {
    const testUrl = 'https://cz.staging.woltair.dev/fotovoltaika/nabidka?leadUid=4f38fcae-77b1-4234-9137-30c42a34181a'
    //PropertiesManager.getProperty('PLAYWRIGHT_BASE_URL') + '/fotovoltaika/kalkulacka'
    await this.page.goto(testUrl)
  }

  async goBack(): Promise<void> {
    await this.page.goBack()
  }

  async waitForOfferPage() {
    await this.fveOfferTitle.waitToAppear(45000)
  }

  async validateAllComponents(): Promise<void> {
    await this.fveOfferTitle.validateSelf()
  }

  async getOfferVariants(): Promise<ButtonInterface[]> {
    const arrayOfVariants: ButtonInterface[] = await this.dynamicOfferVariants.readAll()
    return arrayOfVariants
  }

  async getVariantName(index: number): Promise<string> {
    const arrayOfNames: LabelInterface[] = await this.dynamicVariantsNames.readAll()
    let variantText = (await arrayOfNames[index].readElementText()).split('.')[1] //replace(/\w{7}$|\w{11}$/g,
    return variantText
  }

  async checkIfOnlyOptimumVariantIsOffered(): Promise<boolean> {
    return (await this.dynamicOfferVariants.count()) < 2
  }
}
