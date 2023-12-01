import { test } from '@playwright/test'
import { AuthFactory } from '../../src/authProvider/factory/authFactory'
import { UsersPOM } from '../../src/poms/warehouse/usersPOM'
import { AddUserPOM } from '../../src/poms/warehouse/addUserPOM'
import { MainMenuPOM } from '../../src/poms/warehouse/mainMenuPOM'
import { DataProviderInterface } from '../../src/dataProvider/interfaces/dataProviderInterface'
import data from './testData.json' assert { type: 'json' }
import { DataProviderFactory } from '../../src/dataProvider/factory/dataProviderFactory'
import { EditUserPOM } from '../../src/poms/warehouse/editUserPOM'

interface TestDataDefinition {
  firstName: string
  lastName: string
  email: string
  phone: string
}

test('Verification of users page in Warehouse', async ({ page }) => {
  await AuthFactory.createWarehouseWebAuth(page).setUserIdentifier('automationuser@woltair.cz').authenticate()

  const testData: DataProviderInterface<TestDataDefinition> = DataProviderFactory.sequentailDataReader()
  testData.load(data)
  testData.getNext()

  const mainmenu: MainMenuPOM = new MainMenuPOM(page)
  await mainmenu.validateAllComponents()
  await mainmenu.setUsersPage()

  const userspage: UsersPOM = new UsersPOM(page)
  await userspage.validateAllComponents()
  await userspage.hideFilter()
  await userspage.showFilter()
  //await userspage.setName((testData.getCurrent()!.firstName ) + (testData.getCurrent()!.lastName))
  await userspage.setName(testData.getCurrent()!.firstName)
  await userspage.addUser()
  const newuserspage: AddUserPOM = new AddUserPOM(page)
  await newuserspage.validateAllComponents()
  await newuserspage.setFirstName(testData.getCurrent()!.firstName)
  await newuserspage.setLasttName(testData.getCurrent()!.lastName)
  await newuserspage.setRole()
  await newuserspage.setEmail(testData.getCurrent()!.email)
  await newuserspage.setPhone(testData.getCurrent()!.phone)
  await newuserspage.closeModal()
  await newuserspage.waitForModalToDisappear()
  await userspage.editUser()
  const edituserpage: EditUserPOM = new EditUserPOM(page)
  await edituserpage.validateAllComponents()
  //await edituserpage.deselectRole()
  await edituserpage.closeModal()
  await edituserpage.waitForModalToDisappear()
})
