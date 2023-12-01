import { Page, test } from '@playwright/test'
import { AuthFactory } from '../../../src/authProvider/factory/authFactory'
import { SuperfixWebAuthIdentifierOptions } from '../../../src/authProvider/types/superfixWebAuthOptions'
import { TableInterface } from '../../../src/components/interfaces/table/tableInterface'
import { ComponentFactory } from '../../../src/components/factory/componentFactory'
import { ComponentUtilsFactory } from '../../../src/components/factory/componentUtilsFactory'

var testPage: Page

test.describe.serial('Table showcase tests', async () => {
  var usersTable: TableInterface
  var userFormTable: TableInterface

  let testPage: Page

  test.beforeAll(async ({ browser }) => {
    testPage = await (await browser.newContext()).newPage()

    await AuthFactory.createSuperfixWebAuth(testPage)
      .setIdentifierOption(SuperfixWebAuthIdentifierOptions.EMAIL)
      .setUserIdentifier('pavel.matuska@woltair.cz')
      .authenticate()

    usersTable = await navigateToUsersPageAndGetTable(testPage)
    userFormTable = ComponentFactory.createTable().tableForm().setLocator(testPage.locator('//form'))
  })

  test('Table showcase1 - read all visible data from user table', async ({}) => {
    console.log(await usersTable.readVisibleData())
  })

  test('Table showcase2 - read only table rows, which matches both values in any column', async ({}) => {
    console.log(
      await usersTable.readVisibleData(
        ComponentUtilsFactory.createTableFilter().filterByRowValue('Pa\n\nPavel').filterByRowValue('+420 602 480 248')
      )
    )
  })

  test('Table showcase3 - read one row and access result', async ({}) => {
    const result = await usersTable.readVisibleData(
      ComponentUtilsFactory.createTableFilter().filterByRowValue('Pa\n\nPavel').filterByRowValue('+420 602 480 248')
    )

    console.log(result[0].getValue('general.phone'))
  })

  test('Table showcase4 - read table and return zero matches (showcase2 - second parameter changed to mismatch)', async ({}) => {
    console.log(
      await usersTable.readVisibleData(
        ComponentUtilsFactory.createTableFilter().filterByRowValue('Pa\n\nPavel').filterByRowValue('+420 602 480 249')
      )
    )
  })

  test('Table showcase5 - filter matches value in ANY column using regex ', async ({}) => {
    const regex: RegExp = /.*woltair\.cz$/
    console.log(
      await usersTable.readVisibleData(
        ComponentUtilsFactory.createTableFilter().filterByRowValue('Pa\n\nPavel').filterByRowValue(regex)
      )
    )
  })

  test('Table showcase6 - filter matches value in SPECIFIED column using regex', async ({}) => {
    const regex: RegExp = /.*woltair\.cz$/
    console.log(
      await usersTable.readVisibleData(
        ComponentUtilsFactory.createTableFilter()
          .filterByRowValue('Pa\n\nPavel')
          .filterByColumnValue('general.email', regex)
      )
    )
  })

  test('Table showcase7 - validate, that exactly one match was found in table using filter from showcase5 ', async ({}) => {
    const regex: RegExp = /.*woltair\.cz$/
    console.log(
      (
        await usersTable.readVisibleData(
          ComponentUtilsFactory.createTableFilter()
            .filterByRowValue('Pa\n\nPavel')
            .filterByColumnValue('general.email', regex)
        )
      ).length === 1
    )
  })

  test('Table showcase8 - filter exactly one matching row and perform click on element in this row ', async ({}) => {
    await usersTable.click(
      ComponentUtilsFactory.createTableFilter().filterByRowValue('pavel.matuska@woltair.cz'),
      testPage.locator('//a').first() // if exactly one match is found based on filter criteria, click on element in given row with locator //a
    )
  })

  test('Table showcase9 - read table of type user-form', async ({}) => {
    const formTableExample = await asyncNavigateToUsersDetailAndGetFormTable(testPage)
    console.log(await formTableExample.readVisibleData())
  })

  test('Table showcase10 - read table of type user-form', async ({}) => {
    const formTableExample = await asyncNavigateToUsersDetailAndGetFormTable(testPage)
    console.log(await formTableExample.readVisibleData())
    await formTableExample.click(
      ComponentUtilsFactory.createTableFilter().filterByRowValue('installationWorkers.detail.employee.workWeek'),
      testPage.locator('//button').first()
    )
  })

  async function navigateToUsersPageAndGetTable(page: Page): Promise<TableInterface> {
    await page.locator("//*[@href='/users']").waitFor({ timeout: 10000 })
    await page.locator("//*[@href='/users']").click()
    const table: TableInterface = ComponentFactory.createTable().tableStatic().setLocator(page.locator('//table'))
    await table.waitToAppear()
    return table
  }

  async function asyncNavigateToUsersDetailAndGetFormTable(page: Page): Promise<TableInterface> {
    await page.locator("//*[@href='/users']").first().waitFor({ timeout: 10000 })
    await page.locator("//*[@href='/users']").first().click()
    await usersTable.waitToAppear()
    await usersTable.click(
      ComponentUtilsFactory.createTableFilter()
        .filterByRowValue('Pa\n\nPavel') //select row if any column in a row contains value "Pa\n\nPavel"
        .filterByColumnValue('general.phone', '+420 602 480 248'), // and if column called "general.phone" contains value "+420 602 480 248"
      page.locator('//a') // if exactly one match is found based on filter criteria, click on element in given row with locator //a
    )
    await userFormTable.waitToAppear()
    return userFormTable
  }
})

test.describe.serial('Web table showcase tests', async () => {
  test.beforeAll(async ({ browser }) => {
    testPage = await browser.newPage()
  })

  test('Table showcase11 - static table without header - WEB trash component', async ({}) => {
    const formTableExample = await asyncNavigateToWebHeadlessTable(testPage)
    console.log(await formTableExample.readVisibleData())
  })

  test('Table showcase12 - static table with header - WEB component', async ({}) => {
    const formTableExample = await asyncNavigateToStaticTable(testPage)
    console.log(await formTableExample.readVisibleData())
  })

  async function asyncNavigateToWebHeadlessTable(page: Page): Promise<TableInterface> {
    await page.goto('https://www.woltair.cz/nova-zelena-usporam-light')
    const webTable: TableInterface = ComponentFactory.createTable()
      .tableStaticWithoutHeader()
      .setLocator(page.locator("//table[@class='ck-table-resized']"))
    await webTable.waitToAppear()
    return webTable
  }

  async function asyncNavigateToStaticTable(page: Page): Promise<TableInterface> {
    await page.goto('https://www.woltair.cz/tepelna-cerpadla')
    const webTable: TableInterface = ComponentFactory.createTable()
      .tableStatic()
      .setLocator(page.locator("//table[@class='w-full']"))
    await webTable.waitToAppear()
    return webTable
  }
})

test.describe.serial('Warehouse table showcase tests', async () => {
  test.beforeAll(async ({ browser }) => {
    testPage = await (await browser.newContext()).newPage()
  })

  test('Table showcase1 - static warehouse table', async ({}) => {
    const whTable = await asyncNavigateToStaticWhTable(testPage)
    console.log(await whTable.readVisibleData())
    await whTable.click(
      ComponentUtilsFactory.createTableFilter().filterByRowValue('automationuser@woltair.cz'),
      testPage.locator('//button').first()
    )
  })

  async function asyncNavigateToStaticWhTable(page: Page): Promise<TableInterface> {
    await AuthFactory.createWarehouseWebAuth(testPage).setUserIdentifier('devs@whouse.cz').authenticate()

    await page.locator("//*[@href='/users']").first().waitFor({ timeout: 10000 })
    await page.locator("//*[@href='/users']").first().click()

    const webTable: TableInterface = ComponentFactory.createTable().tableStatic().setLocator(page.locator('//table'))
    await webTable.waitToAppear()
    return webTable
  }
})
