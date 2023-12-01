import { Page } from '@playwright/test'
import { POM } from '../pom'
import { ButtonInterface } from '../../components/interfaces/buttonInterface'
import { InputInterface } from '../../components/interfaces/inputInterface'
import { ComboboxInterface } from '../../components/interfaces/comboboxInterface'
import { ComponentFactory } from '../../components/factory/componentFactory'

export class EditUserPOM extends POM {
  public navigate(): Promise<void> {
    throw new Error('Method not implemented.')
  }
  public goBack(): Promise<void> {
    throw new Error('Method not implemented.')
  }

  private closeModal_button: ButtonInterface
  private firstName_input: InputInterface
  private lastName_input: InputInterface
  private role_combobox: ComboboxInterface
  private email_input: InputInterface
  private phone_input: InputInterface
  private editUser_button: ButtonInterface

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
    this.editUser_button = ComponentFactory.createButton()
      .button()
      .setLocator(this.page.locator("//button[@class='button svelte-kna3qx primary fluid']"))
      .setVisible(true)
      .setReadonly(false)
  }

  async closeModal(): Promise<void> {
    await this.closeModal_button.click()
  }

  async validateAllComponents(): Promise<void> {
    await this.closeModal_button.validateSelf()
    await this.firstName_input.validateSelf()
    await this.lastName_input.validateSelf()
    await this.email_input.validateSelf()
    await this.phone_input.validateSelf()
    await this.editUser_button.validateSelf()
  }

  async deselectRole(): Promise<void> {
    await this.role_combobox.deselectOption('CLIENT_MANAGER')
    await this.validateAllComponents()
  }

  async waitForModalToDisappear(): Promise<void> {
    await this.closeModal_button.waitToDisappear()
    await this.firstName_input.waitToDisappear()
    await this.lastName_input.waitToDisappear()
    await this.role_combobox.waitToDisappear()
    await this.email_input.waitToDisappear()
    await this.phone_input.waitToDisappear()
    await this.editUser_button.waitToDisappear()
  }
}
