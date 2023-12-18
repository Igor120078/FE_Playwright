/* eslint-disable import/order */
import type { Page } from '@playwright/test'
import { POM } from '../../pom'

export abstract class HvacCalcStep7POM extends POM {
  constructor(page: Page) {
    super(page)
  }

  abstract navigate(): Promise<void>

  abstract goBack(): Promise<void>

  abstract validateAllComponents(): Promise<void>

  abstract setLocation(location: { region: string; zipCode: string }): Promise<void>
}
