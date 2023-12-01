import { expect, test } from '@playwright/test'
import { DataFactory } from '../../../src/dataGenerator/factory/dataFactory'

test('Test data provider example - iterate over all data in dataset', async ({}) => {
  let spaceLessZipRegex: RegExp = /^\d{5}$/
  let spaceZipRegex: RegExp = /^(\d{3})\s(\d{2})$/

  expect(spaceZipRegex.test(DataFactory.zipCode().generate())).toBeTruthy()
  expect(spaceLessZipRegex.test(DataFactory.zipCode().setSeparator(false).generate())).toBeTruthy()
})
