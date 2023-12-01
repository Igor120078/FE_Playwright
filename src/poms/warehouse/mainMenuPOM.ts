import { Page } from '@playwright/test'
import { POM } from '../pom'
import { ButtonInterface } from '../../components/interfaces/buttonInterface'
import { ComponentFactory } from '../../components/factory/componentFactory'
import { PropertiesManager } from '../../utils/propertiesManager/propertiesManager'
import { ComboboxInterface } from '../../components/interfaces/comboboxInterface'

export class MainMenuPOM extends POM {
  private user_button: ButtonInterface
  private languageSwitcher_dropdown: ComboboxInterface
  private sideNavigation_button: ButtonInterface
  private home_button: ButtonInterface
  private clients_button: ButtonInterface
  private users_button: ButtonInterface
  private stocking_button: ButtonInterface
  private products_button: ButtonInterface
  private picking_button: ButtonInterface
  private orders_button: ButtonInterface

  constructor(page: Page) {
    super(page)

    this.user_button = ComponentFactory.createButton()
      .button()
      .setLocator(this.page.locator("//*[contains(@class,'user-button svelte-1uvrw16')]"))
      .setVisible(true)
      .setReadonly(false)
    this.languageSwitcher_dropdown = ComponentFactory.createCombobox()
      .whMultiselectCombobox()
      .setLocator(this.page.getByTestId('language-switcher'))
      .setVisible(true)
      .setReadonly(false)
    this.sideNavigation_button = ComponentFactory.createButton()
      .button()
      .setLocator(this.page.locator("//header[@class='svelte-ciomx3']//button"))
      .setVisible(true)
      .setReadonly(false)
    this.home_button = ComponentFactory.createButton()
      .button()
      .setLocator(this.page.locator("//*[@href='/overview']"))
      .setVisible(true)
      .setReadonly(false)
    this.clients_button = ComponentFactory.createButton()
      .button()
      .setLocator(this.page.locator("//*[@href='/clients']"))
      .setVisible(true)
      .setReadonly(false)
    this.users_button = ComponentFactory.createButton()
      .button()
      .setLocator(this.page.locator("//*[@href='/users']"))
      .setVisible(true)
      .setReadonly(false)
    this.stocking_button = ComponentFactory.createButton()
      .button()
      .setLocator(this.page.locator("//*[@href='/stockings']"))
      .setVisible(true)
      .setReadonly(false)
    this.products_button = ComponentFactory.createButton()
      .button()
      .setLocator(this.page.locator("//*[@href='/products']"))
      .setVisible(true)
      .setReadonly(false)
    this.picking_button = ComponentFactory.createButton()
      .button()
      .setLocator(this.page.locator("//*[@href='/pickings/orders']"))
      .setVisible(true)
      .setReadonly(false)
    this.orders_button = ComponentFactory.createButton()
      .button()
      .setLocator(this.page.locator("//*[@href='/orders']"))
      .setVisible(true)
      .setReadonly(false)
  }

  async validateAllComponents(): Promise<void> {
    await this.user_button.validateSelf()
    await this.languageSwitcher_dropdown.validateSelf()
    await this.sideNavigation_button.validateSelf()
    await this.home_button.validateSelf()
    await this.clients_button.validateSelf()
    await this.users_button.validateSelf()
    await this.stocking_button.validateSelf()
    await this.products_button.validateSelf()
    await this.picking_button.validateSelf()
    await this.orders_button.validateSelf()
  }

  async navigate(): Promise<void> {
    await this.page.goto(
      PropertiesManager.getProperty('WAREHOUSE_BASE_URL_CZ') + PropertiesManager.getProperty('WAREHOUSE_ROUTES_HOME')
    )
    await this.validateAllComponents()
  }
  async goBack(): Promise<void> {
    await this.page.goBack()
  }

  async setClientsPage(): Promise<void> {
    await this.page.goto(
      PropertiesManager.getProperty('WAREHOUSE_BASE_URL_CZ') + PropertiesManager.getProperty('WAREHOUSE_ROUTES_CLIENTS')
    )
    await this.validateAllComponents()
  }

  async setUsersPage(): Promise<void> {
    await this.page.goto(
      PropertiesManager.getProperty('WAREHOUSE_BASE_URL_CZ') + PropertiesManager.getProperty('WAREHOUSE_ROUTES_USERS')
    )
    await this.validateAllComponents
  }

  async setStockingPage(): Promise<void> {
    await this.page.goto(
      PropertiesManager.getProperty('WAREHOUSE_BASE_URL_CZ') +
        PropertiesManager.getProperty('WAREHOUSE_ROUTES_STOCKING')
    )
    await this.validateAllComponents()
  }

  async setProductsPage(): Promise<void> {
    await this.page.goto(
      PropertiesManager.getProperty('WAREHOUSE_BASE_URL_CZ') +
        PropertiesManager.getProperty('WAREHOUSE_ROUTES_PRODUCTS')
    )
    await this.validateAllComponents()
  }

  async setPickingPage(): Promise<void> {
    await this.page.goto(
      PropertiesManager.getProperty('WAREHOUSE_BASE_URL_CZ') + PropertiesManager.getProperty('WAREHOUSE_ROUTES_PICKING')
    )
    await this.validateAllComponents()
  }

  async setOrdersPage(): Promise<void> {
    await this.page.goto(
      PropertiesManager.getProperty('WAREHOUSE_BASE_URL_CZ') + PropertiesManager.getProperty('WAREHOUSE_ROUTES_ORDERS')
    )
    await this.validateAllComponents()
  }
}
