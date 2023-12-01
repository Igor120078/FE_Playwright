import { test, expect } from '@playwright/test'
import data from './phoneTestData'
import { DataProviderInterface } from '../../../src/dataProvider/interfaces/dataProviderInterface'
import { DataProviderFactory } from '../../../src/dataProvider/factory/dataProviderFactory'
import { DataFactory } from '../../../src/dataGenerator/factory/dataFactory'
import { Country } from '../../../src/dto/country'

interface PhoneDataDefinition {
  staticPhoneNumber: string
  texts: {
    phone_number_default: string
    phone_number_without_separators: string
    phone_number_with_country_prefix_brackets: string
    phone_number_without_leading_plus_sign_and_separators: string
    phone_number_without_leading_plus_sign_with_separators: string
    phone_number_without_leading_plus_sign_with_brackets_and_separators: string
    phone_number_without_leading_plus_sign_with_brackets_without_separators: string
    phone_number_without_brackets_with_dash_separators: string
    phone_number_without_country_prefix_with_separators: string
  }
}

//---------------------First example---------------------
test('Test data provider example - iterate over all data in dataset', async ({}) => {
  const testData: DataProviderInterface<PhoneDataDefinition> = DataProviderFactory.sequentailDataReader(data)
  while (testData.getNext() !== null) {
    console.log(testData.getCurrent())
  }
})

test('Test data provider example - randomly pick data from dataset', async ({}) => {
  const testData: DataProviderInterface<PhoneDataDefinition> = DataProviderFactory.randomDataReader(data)
  console.log(testData.getNext())
  console.log(testData.getCurrent())
})

test('Test phone provider example - get a random phone number', async ({}) => {
  const testData: DataProviderInterface<PhoneDataDefinition> = DataProviderFactory.randomDataReader(data)
  console.log(testData.getNext())
  console.log(testData.getCurrent())
})

test.describe('Test phone generator - get different variants', () => {
  test('Test default phone number format test', async ({}) => {
    let phoneNumberRegex: RegExp = /^\+\d{2,3}(\s\d{1,5}){1,3}$/
    let phoneNumber = DataFactory.phoneNumberCZ().generate()
    console.log(phoneNumber)
    expect(phoneNumberRegex.test(phoneNumber), 'Should match to the RegEx').toBeTruthy()
  })

  test('Test phone number without separators test', async ({}) => {
    let phoneNumberRegex: RegExp = /^\+\d{12,13}$/
    let phoneNumber = DataFactory.phoneNumberCZ()
      .setCountryPrefix()
      .usePrefixSeparator(false)
      .useBrackets(false)
      .useLeadingPlusSign(true)
      .finishPrefixConfiguration()
      .setOperatorIdentifier(Country.CZ)
      .setSeparator('', [])
      .generate()
    console.log(phoneNumber)
    expect(phoneNumberRegex.test(phoneNumber), 'Should match to the RegEx').toBeTruthy()
  })

  test('Test phone number with country prefix brackets', async ({}) => {
    let phoneNumberRegex: RegExp = /^\(\+\d{2,3}\)\d{9,11}$/
    let phoneNumber = DataFactory.phoneNumberCZ()
      .setCountryPrefix()
      .usePrefixSeparator(false)
      .useBrackets(true)
      .finishPrefixConfiguration()
      .setOperatorIdentifier(Country.CZ)
      .setSeparator('', [])
      .generate()
    console.log(phoneNumber)
    expect(phoneNumberRegex.test(phoneNumber), 'Should match to the RegEx').toBeTruthy()
  })

  test('Test phone number without leading plus sign, brackets and separators', async ({}) => {
    let phoneNumberRegex: RegExp = /^\d{11,13}$/
    let phoneNumber = DataFactory.phoneNumberPL()
      .setCountryPrefix()
      .useLeadingPlusSign(false)
      .usePrefixSeparator(false)
      .finishPrefixConfiguration()
      .setOperatorIdentifier(Country.PL)
      .setSeparator('', [])
      .generate()
    console.log(phoneNumber)
    expect(phoneNumberRegex.test(phoneNumber), 'Should match to the RegEx').toBeTruthy()
  })

  test('Test phone number without leading plus sign with separators', async ({}) => {
    let phoneNumberRegex: RegExp = /^\d{2,3}(\s\d{1,5}){1,5}$/
    let phoneNumber = DataFactory.phoneNumberDE()
      .setCountryPrefix()
      .useLeadingPlusSign(false)
      .finishPrefixConfiguration()
      .generate()
    console.log(phoneNumber)
    expect(phoneNumberRegex.test(phoneNumber), 'Should match to the RegEx').toBeTruthy()
  })

  test('Test phone number without leading plus sign with brackets and separators', async ({}) => {
    let phoneNumberRegex: RegExp = /^\(\d{2,3}\)(\s\d{1,5}){1,5}$/
    let phoneNumber = DataFactory.phoneNumberDE()
      .setCountryPrefix()
      .useLeadingPlusSign(false)
      .useBrackets(true)
      .finishPrefixConfiguration()
      .generate()
    console.log(phoneNumber)
    expect(phoneNumberRegex.test(phoneNumber), 'Should match to the RegEx').toBeTruthy()
  })

  test('Test phone number without leading plus sign with brackets without separators', async ({}) => {
    let phoneNumberRegex: RegExp = /^\(\d{2,3}\)\d{9,11}$/
    let phoneNumber = DataFactory.phoneNumberDE()
      .setCountryPrefix()
      .useLeadingPlusSign(false)
      .useBrackets(true)
      .usePrefixSeparator(false)
      .finishPrefixConfiguration()
      .setSeparator('', [])
      .generate()
    console.log(phoneNumber)
    expect(phoneNumberRegex.test(phoneNumber), 'Should match to the RegEx').toBeTruthy()
  })

  test('Test phone number with leading plus sign without brackets with dash separators', async ({}) => {
    let phoneNumberRegex: RegExp = /^\+\d{2,3}\s(\d{1,5}\-){1,5}\d{1,5}$/
    let phoneNumber = DataFactory.phoneNumberDE().setSeparator('-', [4, 3, 4]).generate()
    console.log(phoneNumber)
    expect(phoneNumberRegex.test(phoneNumber), 'Should match to the RegEx').toBeTruthy()
  })

  test('Test phone without country prefix with separators', async ({}) => {
    let phoneNumberRegex: RegExp = /^(\d{1,5}\s){1,5}\d{1,5}$/
    let phoneNumber = DataFactory.phoneNumberDE().removeCountryPrefix().generate()
    console.log(phoneNumber)
    expect(phoneNumberRegex.test(phoneNumber), 'Should match to the RegEx').toBeTruthy()
  })
})

// Test for demonstrating/verifying logic of separator setting
test('Test tmp', async ({}) => {
  console.log(DataFactory.phoneNumberCZ().generate())
  let telNumber = '73936500578'
  let separatorChar = ' '
  let separatorGroupSizes = [4, 3, 4]
  let splitString = telNumber.split('')

  let currentIndex = 0
  for (let i = 0; i < separatorGroupSizes.length; i++) {
    if (splitString.length - currentIndex > separatorGroupSizes[i]) {
      splitString.splice(separatorGroupSizes[i] + currentIndex, 0, separatorChar)
      currentIndex = separatorGroupSizes[i] + currentIndex + 1
    }
  }

  console.log(`'${splitString.join('')}'`)
})
