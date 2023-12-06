/* eslint-disable import/order */
import type { Page } from '@playwright/test'
import { POM } from '@woltair/qa-fe'
import { ComponentFactory } from '@woltair/qa-fe'
import { PropertiesManager } from '@woltair/qa-fe'
import type { ButtonInterface } from '@woltair/qa-fe'
import type { LabelInterface } from '@woltair/qa-fe'
import type { InputInterface } from '@woltair/qa-fe'
import type { CheckboxInterface } from '@woltair/qa-fe'

export class CallMeBackStep2POM extends POM {
	private contactFormTitle: LabelInterface
	private willCallInfo: LabelInterface
	private inputNameInfo: LabelInterface
	private inputPhoneInfo: LabelInterface
	private inputZipcodeInfo: LabelInterface
	private promoCodeInfo: LabelInterface
	private generalConditionsInfo: LabelInterface
	private inputName: InputInterface
	private inputPhone: InputInterface
	private inputZipcode: InputInterface
	private promoCodeCheckBox: CheckboxInterface
	private submitBtn: ButtonInterface

	constructor(page: Page) {
		super(page)

		this.contactFormTitle = ComponentFactory.createLabel()
			.label()
			.setLocator(this.page.locator("text='web.forms.leaveContact.title'"))
			.setVisible(true)

		this.willCallInfo = ComponentFactory.createLabel()
			.label()
			.setLocator(this.page.locator("text='web.forms.leaveContact.wewillcall'"))
			.setVisible(true)
		this.inputNameInfo = ComponentFactory.createLabel()
			.label()
			.setLocator(this.page.locator("text='web.forms.name_and_surname'"))
			.setVisible(true)
		this.inputPhoneInfo = ComponentFactory.createLabel()
			.label()
			.setLocator(this.page.locator("text='general.phone *'"))
			.setVisible(true)
		this.inputZipcodeInfo = ComponentFactory.createLabel()
			.label()
			.setLocator(this.page.locator("text='web.forms.zipcode *'"))
			.setVisible(true)
		this.promoCodeInfo = ComponentFactory.createLabel()
			.label()
			.setLocator(this.page.locator("text='web.forms.leaveContact.promocode'"))
			.setVisible(true)
		this.generalConditionsInfo = ComponentFactory.createLabel()
			.label()
			.setLocator(this.page.locator("text='general.woltairConditions'"))
			.setVisible(true)

		this.inputName = ComponentFactory.createInput()
			.freeTextInput()
			.setLocator(this.page.locator("input[name='personName']"))
			.setVisible(true)
			.setEnabled(true)
			.setReadonly(false)
		this.inputPhone = ComponentFactory.createInput()
			.freeTextInput()
			.setLocator(this.page.locator("input[name='phone']"))
			.setVisible(true)
			.setEnabled(true)
			.setReadonly(false)
		this.inputZipcode = ComponentFactory.createInput()
			.freeTextInput()
			.setLocator(this.page.locator("input[name='zipcode']"))
			.setVisible(true)
			.setEnabled(true)
			.setReadonly(false)
		this.promoCodeCheckBox = ComponentFactory.createCheckbox()
			.checkbox()
			.setLocator(this.page.locator("input[id='affiliateCodeShow']"))
			.setVisible(true)

		this.submitBtn = ComponentFactory.createButton()
			.button()
			.setLocator(this.page.locator("text='web.forms.submit'"))
			.setTranslationKey('web.forms.submit')
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
		await this.contactFormTitle.validateSelf()
		await this.willCallInfo.validateSelf()
		await this.inputNameInfo.validateSelf()
		await this.inputPhoneInfo.validateSelf()
		await this.inputZipcodeInfo.validateSelf()
		await this.promoCodeInfo.validateSelf()
		await this.generalConditionsInfo.validateSelf()
		await this.inputName.validateSelf()
		await this.inputPhone.validateSelf()
		await this.inputZipcode.validateSelf()
		await this.promoCodeCheckBox.validateSelf()
		await this.submitBtn.validateSelf()
	}

	async fillName(name: string) {
		await this.inputName.sendTextToInput(name)
		await this.inputName.validateSelf()
	}
	async fillPhone(phone: string) {
		await this.inputPhone.sendTextToInput(phone)
		await this.inputPhone.validateSelf()
	}
	async fillZipcode(zipcode: string) {
		await this.inputZipcode.sendTextToInput(zipcode)
		await this.inputZipcode.validateSelf()
	}

	async submitForm() {
		await this.submitBtn.click()
		await this.contactFormTitle.waitToDisappear()
	}
}
