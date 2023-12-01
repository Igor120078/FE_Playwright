import { Page } from '@playwright/test'
import { POM } from '../pom.js'
import { CalcContext } from './calcContext.js'

export class Step1POM extends POM {
  constructor(page: Page) {
    super(page)
  }
  public async doSomethingSpecial(): Promise<void> {
    //do something specific for step 1
  }
  public getCurrentCalcContext(): CalcContext {
    return { exampleOfValueTransfer: 'value' }
  }
  public navigate(): Promise<void> {
    throw new Error('Method not implemented.')
  }
  public goBack(): Promise<void> {
    throw new Error('Method not implemented.')
  }
  public validateAllComponents(): Promise<void> {
    throw new Error('Method not implemented.')
  }
}
