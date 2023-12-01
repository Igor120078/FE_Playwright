import { test } from '@playwright/test'
import ListOfUsersPOM from '../../../src/poms/superfix/userPOM'
import UsersAddPOM from '../../../src/poms/superfix/userAddPOM'
import { AuthFactory } from '../../../src/authProvider/factory/authFactory'
import { DataProviderInterface } from '../../../src/dataProvider/interfaces/dataProviderInterface'
import { DataProviderFactory } from '../../../src/dataProvider/factory/dataProviderFactory'
import data from './testData.json' assert { type: 'json' }

test('List of Users', async ({ page }) => {
  const listOfUsersPOM = new ListOfUsersPOM(page)

  interface TestDataDefinition {
    loginEmail: string
    tagName: string
  }

  const testData: DataProviderInterface<TestDataDefinition> = DataProviderFactory.randomDataReader()
  testData.load(data)
  testData.getNext()
  await AuthFactory.createSuperfixAuth(page).authenticate()
  await page.locator("//*[@href='/users']").waitFor({ timeout: 10000 })
  await page.locator("//*[@href='/users']").click()
  await listOfUsersPOM.validateAllComponents()
  await listOfUsersPOM.createNewUser()

  const newUserPOM: UsersAddPOM = await listOfUsersPOM.createNewUser()
  await newUserPOM.fillForm({
    displayedName: 'dfgg',
    firstName_input: 'skjafbv',
    sureName_input: 'skjafbv',
    companyName_input: 'svfabdfjh',
    userEmail_input: 'skjafbv@gmail.com',
    userPhone_input: '776493286',
    employeeIco_input: '776493286',
    employeeDic_input: '776493286',
    workHoursMonth_input: '160',
    bankAccount_input: '987654234',
    bankCode_input: '0800',
    googleCalendarID_input: '9876546789',
    employeeNote_input: 'ty kokos',
  })
})
