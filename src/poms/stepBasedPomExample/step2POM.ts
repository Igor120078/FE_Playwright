import { Page } from '@playwright/test'
import { POM } from '../pom.js'
import { CalcContext } from './calcContext.js'

export class Step2POM extends POM {
  private calcContext: CalcContext
  constructor(page: Page, calcContext: CalcContext) {
    super(page)
    this.calcContext = calcContext
  }
  public async doSomethingSpecial(): Promise<void> {
    //do something specific for step 1
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
