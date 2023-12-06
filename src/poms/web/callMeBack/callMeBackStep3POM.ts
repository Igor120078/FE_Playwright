/* eslint-disable import/order */
import type { Page } from '@playwright/test'
import { POM } from '@woltair/qa-fe'
import { ComponentFactory } from '@woltair/qa-fe'
import { PropertiesManager } from '@woltair/qa-fe'
import type { LabelInterface } from '@woltair/qa-fe'

export class CallMeBackStep3POM extends POM {
	private thankMessage: LabelInterface

	constructor(page: Page) {
		super(page)

		this.thankMessage = ComponentFactory.createLabel()
			.label()
			.setLocator(this.page.locator("text='web.forms.leaveContact.thankYou'"))
			.setVisible(true)
	}

	async navigate(): Promise<void> {
		const testUrl =
			PropertiesManager.getProperty('PLAYWRIGHT_BASE_URL') + '/fotovoltaika/zanechejte-kontakt'
		await this.page.goto(testUrl)
	}

	async goBack(): Promise<void> {
		await this.page.goBack()
	}

	async validateAllComponents(): Promise<void> {
		await this.thankMessage.waitToAppear(5000)
		await this.thankMessage.validateSelf()
	}
}
