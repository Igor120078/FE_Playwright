/* eslint-disable import/order */
import type { Page } from '@playwright/test'
import { POM } from '@woltair/qa-fe'
import { ComponentFactory } from '@woltair/qa-fe'
import { PropertiesManager } from '@woltair/qa-fe'
import type { ButtonInterface } from '@woltair/qa-fe'
import type { LabelInterface } from '@woltair/qa-fe'

export class CallMeBackStep1POM extends POM {
	private callMeTitle: LabelInterface
	private callMeHvacBtnImg: LabelInterface
	private callMeHvacBtnInfo: LabelInterface
	private callMeHvacBtn: ButtonInterface
	private callMeFveBtnImg: LabelInterface
	private callMeFveBtnInfo: LabelInterface
	private callMeFveBtn: ButtonInterface

	constructor(page: Page) {
		super(page)

		this.callMeTitle = ComponentFactory.createLabel()
			.label()
			.setLocator(this.page.locator("text='web.woltadvisor.leave_contact.title'"))
			.setVisible(true)

		this.callMeHvacBtnImg = ComponentFactory.createLabel()
			.label()
			.setLocator(this.page.locator("img[alt='web.global.heatPump']"))
			.setVisible(true)
		this.callMeHvacBtnInfo = ComponentFactory.createLabel()
			.label()
			.setLocator(this.page.locator("text='web.woltadvisor.leave_contact.heatpumps'"))
			.setVisible(true)
		this.callMeHvacBtn = ComponentFactory.createButton()
			.button()
			.setLocator(this.page.getByTestId('meeting-hvac'))
			.setVisible(true)

		this.callMeFveBtnImg = ComponentFactory.createLabel()
			.label()
			.setLocator(this.page.locator("img[alt='web.woltadvisor.imageAlt.panel']"))
			.setVisible(true)
		this.callMeFveBtnInfo = ComponentFactory.createLabel()
			.label()
			.setLocator(this.page.locator("text='web.woltadvisor.leave_contact.photovoltaics'"))
			.setVisible(true)
		this.callMeFveBtn = ComponentFactory.createButton()
			.button()
			.setLocator(this.page.getByTestId('meeting-fve'))
			.setVisible(true)
	}

	async navigate(): Promise<void> {
		const testUrl = PropertiesManager.getProperty('PLAYWRIGHT_BASE_URL') + '/zanechejte-kontakt'
		await this.page.goto(testUrl)
	}

	async goBack(): Promise<void> {
		await this.page.goBack()
	}

	async validateAllComponents(): Promise<void> {
		await this.callMeTitle.validateSelf()
		await this.callMeHvacBtnImg.validateSelf()
		await this.callMeHvacBtnInfo.validateSelf()
		await this.callMeHvacBtn.validateSelf()
		await this.callMeFveBtnImg.validateSelf()
		await this.callMeFveBtnInfo.validateSelf()
		await this.callMeFveBtn.validateSelf()
	}

	async selectHvac() {
		await this.callMeHvacBtn.click()
		await this.callMeTitle.waitToDisappear()
	}
	async selectFve() {
		await this.callMeFveBtn.click()
		await this.callMeTitle.waitToDisappear()
	}
}
