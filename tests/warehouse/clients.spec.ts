import { test } from '@playwright/test'
import { AuthFactory } from '../../src/authProvider/factory/authFactory'
import { MainMenuPOM } from '../../src/poms/warehouse/mainMenuPOM'
import { ClientsPOM } from '../../src/poms/warehouse/clientsPOM'
import { DataProviderInterface } from '../../src/dataProvider/interfaces/dataProviderInterface'
import data from './clientsTestData.json' assert { type: 'json' }
import { DataProviderFactory } from '../../src/dataProvider/factory/dataProviderFactory'

interface TestDataDefinition {
  name: string
  ico: string
}

test('Verification of Clients page in Warehouse admin', async ({ page }) => {
  await AuthFactory.createWarehouseWebAuth(page).setUserIdentifier('automationuser@woltair.cz').authenticate()

  const testData: DataProviderInterface<TestDataDefinition> = DataProviderFactory.sequentailDataReader()
  testData.load(data)
  testData.getNext()

  const mainmenu: MainMenuPOM = new MainMenuPOM(page)
  await mainmenu.validateAllComponents()
  await mainmenu.setClientsPage()

  const clientspage: ClientsPOM = new ClientsPOM(page)
  await clientspage.validateAllComponents()
  await clientspage.hideFilter()
  await clientspage.showFilter()
  await clientspage.setName(testData.getCurrent()!.name)
  await clientspage.verifyMatchingNameInTable(testData.getCurrent()!.name)
  await clientspage.clearName()
  await clientspage.setIco(testData.getCurrent()!.ico)
  await clientspage.verifyMatchingIcoInTable()
})
