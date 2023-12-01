import { Page } from '@playwright/test'
import { ComponentFactory } from '../../components/factory/componentFactory'
import { InputInterface } from '../../components/interfaces/inputInterface'
import { POM } from '../pom'
import { ButtonInterface } from '../../components/interfaces/buttonInterface'
import { ComboboxInterface } from '../../components/interfaces/comboboxInterface'

export class AddUserPOM extends POM {
  private closeModal_button: ButtonInterface
  private firstName_input: InputInterface
  private lastName_input: InputInterface
  private role_combobox: ComboboxInterface
  private email_input: InputInterface
  private phone_input: InputInterface
  private createUser_button: ButtonInterface

  constructor(page: Page) {
    super(page)

    this.closeModal_button = ComponentFactory.createButton()
      .button()
      .setLocator(this.page.locator("//button[@class='close svelte-1oakejr']"))
      .setVisible(true)
      .setReadonly(false)
    this.firstName_input = ComponentFactory.createInput()
      .freeTextInput()
      .setLocator(this.page.locator("//input[@name='firstName']"))
      .setVisible(true)
      .setReadonly(false)
    this.lastName_input = ComponentFactory.createInput()
      .freeTextInput()
      .setLocator(this.page.locator("//input[@name='lastName']"))
      .setVisible(true)
      .setReadonly(false)
    this.role_combobox = ComponentFactory.createCombobox()
      .wuiSimpleMultiselectCombobox()
      .setLocator(page.locator("//*[contains(@class,'sv-control svelte-1l8hgl2')]"))
    this.email_input = ComponentFactory.createInput()
      .freeTextInput()
      .setLocator(this.page.locator("//input[@name='email']"))
      .setVisible(true)
      .setReadonly(false)
    this.phone_input = ComponentFactory.createInput()
      .freeTextInput()
      .setLocator(this.page.locator("//input[@name='phoneNumber']"))
      .setVisible(true)
      .setReadonly(false)
    this.createUser_button = ComponentFactory.createButton()
      .button()
      .setLocator(this.page.locator("//button[@class='button svelte-kna3qx primary fluid']"))
      .setVisible(true)
      .setReadonly(false)
  }

  async validateAllComponents(): Promise<void> {
    await this.closeModal_button.validateSelf()
    await this.firstName_input.validateSelf()
    await this.lastName_input.validateSelf()
    await this.email_input.validateSelf()
    await this.phone_input.validateSelf()
    await this.createUser_button.validateSelf()
  }

  async closeModal(): Promise<void> {
    await this.closeModal_button.click()
  }
  async setFirstName(firstName: string): Promise<void> {
    await this.firstName_input.sendTextToInput(firstName)
    await this.validateAllComponents
  }

  async setLasttName(lastName: string): Promise<void> {
    await this.lastName_input.sendTextToInput(lastName)
    await this.validateAllComponents
  }

  async setRole(): Promise<void> {
    await this.role_combobox.selectOption
    await this.validateAllComponents
  }

  async setEmail(email: string): Promise<void> {
    await this.email_input.sendTextToInput(email)
    await this.validateAllComponents
  }

  async setPhone(phone: string): Promise<void> {
    await this.phone_input.sendTextToInput(phone)
    await this.validateAllComponents
  }

  async createUser(): Promise<void> {
    await this.createUser_button.click()
    await this.validateAllComponents
  }

  async navigate(): Promise<void> {
    throw Error('Navigate is not implemented)')
  }

  async goBack(): Promise<void> {
    throw Error('goBack is not implemented)')
  }

  async waitForModalToDisappear(): Promise<void> {
    await this.closeModal_button.waitToDisappear()
    await this.firstName_input.waitToDisappear()
    await this.lastName_input.waitToDisappear()
    await this.role_combobox.waitToDisappear()
    await this.email_input.waitToDisappear()
    await this.phone_input.waitToDisappear()
    await this.createUser_button.waitToDisappear()
  }
}
