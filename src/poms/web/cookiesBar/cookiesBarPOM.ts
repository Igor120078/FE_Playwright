/* eslint-disable import/order */
import type { Page } from '@playwright/test'
import { POM } from '@woltair/qa-fe'
import { ComponentFactory } from '@woltair/qa-fe'
import { PropertiesManager } from '@woltair/qa-fe'
import type { ButtonInterface } from '@woltair/qa-fe'
import type { LabelInterface } from '@woltair/qa-fe'

export class CookiesBarPOM extends POM {
	private cookiesBarHeading: LabelInterface
	private cookiesBarInfoText: LabelInterface
	private cookiesAllBtn: ButtonInterface
	private cookiesRejectBtn: ButtonInterface
	private cookiesSettingsBtn: ButtonInterface

	constructor(page: Page) {
		super(page)

		this.cookiesBarHeading = ComponentFactory.createLabel()
			.label()
			.setLocator(this.page.locator("text='web.cookies.privacyCare'"))
			.setVisible(true)
		this.cookiesBarInfoText = ComponentFactory.createLabel()
			.label()
			.setLocator(this.page.locator("text='web.cookies.infotext'"))
			.setVisible(true)
		this.cookiesAllBtn = ComponentFactory.createButton()
			.button()
			.setLocator(this.page.getByTestId('cookies-consent-accept'))
			.setTranslationKey('web.cookies.infotext.acceptAll')
			.setVisible(true)
		this.cookiesRejectBtn = ComponentFactory.createButton()
			.button()
			.setLocator(this.page.getByTestId('cookies-consent-reject'))
			.setTranslationKey('web.cookies.infotext.rejectAll')
			.setVisible(true)
		this.cookiesSettingsBtn = ComponentFactory.createButton()
			.button()
			.setLocator(this.page.getByTestId('cookiesConsent-settings'))
			.setTranslationKey('web.cookies.infotext.settings')
			.setVisible(true)
	}

	async navigate(): Promise<void> {
		const testUrl = PropertiesManager.getProperty('PLAYWRIGHT_BASE_URL') + '/?translationsShowKeys' //`${process.env.PLAYWRIGHT_BASE_URL}/?translationsShowKeys`
		await this.page.goto(testUrl)
		await this.validateAllComponents()
	}

	async goBack(): Promise<void> {
		await this.page.goBack()
	}

	async validateAllComponents(): Promise<void> {
		await this.cookiesBarHeading.validateSelf()
		await this.cookiesBarInfoText.validateSelf()
		await this.cookiesAllBtn.validateSelf()
		await this.cookiesRejectBtn.validateSelf()
		await this.cookiesSettingsBtn.validateSelf()
	}

	async acceptAllCookies() {
		await this.cookiesAllBtn.click()
		await this.setVisibilityOfAllComponents(false)
		await this.validateAllComponents()
	}

	private setVisibilityOfAllComponents(status: boolean) {
		this.cookiesBarHeading.setVisible(status)
		this.cookiesBarInfoText.setVisible(status)
		this.cookiesAllBtn.setVisible(status)
		this.cookiesRejectBtn.setVisible(status)
		this.cookiesSettingsBtn.setVisible(status)
	}
}
