import { test } from '@playwright/test'
import data from './testData'
import { DataProviderInterface } from '../../../src/dataProvider/interfaces/dataProviderInterface'
import { DataProviderFactory } from '../../../src/dataProvider/factory/dataProviderFactory'

interface TestDataDefinition {
  staticMail: string
  texts: {
    random_text_generated_every_time: string
    random_string_generated_once_and_then_reused: string
    random_decimal_number: string
    random_integer_number: string
    random_phone_number: string
  }
}

//---------------------First example---------------------
test('Test data provider example - iterate over all data in dataset', async ({}) => {
  const testData: DataProviderInterface<TestDataDefinition> = DataProviderFactory.sequentailDataReader(data)
  while (testData.getNext() !== null) {
    console.log(testData.getCurrent())
  }
})

test('Test data provider example - randomly pick data from dataset', async ({}) => {
  const testData: DataProviderInterface<TestDataDefinition> = DataProviderFactory.randomDataReader(data)
  console.log(testData.getNext())
  console.log(testData.getCurrent())
})

test('Test phone provider example - get a random phone number', async ({}) => {
  const testData: DataProviderInterface<TestDataDefinition> = DataProviderFactory.randomDataReader(data)
  console.log(testData.getNext())
  console.log(testData.getCurrent())
})
