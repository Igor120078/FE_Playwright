/* eslint-disable import/order */
import type { Page } from '@playwright/test'
import { POM } from '@woltair/qa-fe'
import { ComponentFactory } from '@woltair/qa-fe'
import { PropertiesManager } from '@woltair/qa-fe'
import type { ButtonInterface } from '@woltair/qa-fe'
import type { LabelInterface } from '@woltair/qa-fe'

export class HomePagePOM extends POM {
	private homePageHeading: LabelInterface
	private homePageSubheading: LabelInterface
	private homePageReferencesHeading: LabelInterface
	private homePageReferencesSubtext: LabelInterface
	// Calculator section
	private homePageCalcBtn: ButtonInterface
	// CallMe section
	private callMeBtn: ButtonInterface

	constructor(page: Page) {
		super(page)

		this.homePageHeading = ComponentFactory.createLabel()
			.label()
			.setLocator(this.page.locator("text='web.homepage.PUBLIC.header.heading'"))
			.setVisible(true)
		this.homePageSubheading = ComponentFactory.createLabel()
			.label()
			.setLocator(this.page.locator("text='web.homepage.PUBLIC.header.subheading'"))
			.setVisible(true)
		this.homePageReferencesHeading = ComponentFactory.createLabel()
			.label()
			.setLocator(this.page.locator("text='web.components.THUMBNAILS.heading'"))
			.setVisible(true)
		this.homePageReferencesSubtext = ComponentFactory.createLabel()
			.label()
			.setLocator(this.page.locator("text='web.homepage.PUBLIC.header.referencesSubtext'"))
			.setVisible(true)
		this.homePageCalcBtn = ComponentFactory.createButton()
			.button()
			.setLocator(this.page.getByTestId('page-link-calculator'))
			.setTranslationKey('web.homepage.PUBLIC.header.calculator.text')
			.setVisible(true)
		this.callMeBtn = ComponentFactory.createButton()
			.button()
			.setLocator(this.page.getByTestId('meeting'))
			.setVisible(true)
	}

	async navigate(): Promise<void> {
		const testUrl = PropertiesManager.getProperty('PLAYWRIGHT_BASE_URL') + '/?translationsShowKeys'
		await this.page.goto(testUrl)
	}

	// Tohle je berle pro zviditelneni translations keys
	async makeAllTranslationsKeysVisible() {
		await this.page.getByTestId('page-link-hvac').click()
		await this.page.getByTestId('calculator').waitFor()
		await this.goBack()
	}

	async goBack(): Promise<void> {
		await this.page.goBack()
	}

	async validateAllComponents(): Promise<void> {
		await this.homePageHeading.validateSelf()
		await this.homePageSubheading.validateSelf()
		await this.homePageReferencesHeading.validateSelf()
		await this.homePageReferencesSubtext.validateSelf()
		await this.homePageCalcBtn.validateSelf()
		await this.callMeBtn.validateSelf()
	}

	async startCallMeForm() {
		await this.callMeBtn.click()
	}
	async startCalculator() {
		await this.homePageCalcBtn.click()
	}
}
