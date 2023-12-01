import { test } from '@playwright/test'
import { PropertiesManager } from '../../../src/utils/propertiesManager/propertiesManager.js'

test('Env test', async ({}) => {
  console.log(PropertiesManager.getProperty('TEST_ENVIRONMENT'))
  console.log(PropertiesManager.getProperty('SUPERFIX_BASE_URL_CZ'))
})
