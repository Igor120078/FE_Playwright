# Purpose

Contains automation framework developed by testing team.

# Usage

Add desired library version to dependencies
```json
"dependencies": {
		"@woltair/qa-fe": "^0.1.29"
}
```

Import from library
```typescript
import { DataProviderFactory } from '@woltair/qa-fe'
import { ComponentFactory } from '@woltair/qa-fe'
```

# Library content

## authProvider
Wraps all auth procedures required in tests. Auth method and credentials are picked from environmental variables, 
or can be manually provided. AuthProvider should only be used in context of static factory: [AuthFactory](src/authProvider/factory/authFactory.ts)<br>
<br>
Example:
```typescript
await AuthFactory.createSuperfixAuth(page, await page.context()).authenticate();
```

## components
Provides definition and implementations of web components (button, combobox, ...) used in POMs. Test specifications 
and POMs should not use underlying framework(playwright, selenium, Appium, ...) directly, but rather use this wrapper, 
which provides  this capability.

Components should only be declared by using [ComponentFactory](src/components/factory/componentFactory.ts)!<br>
All components should have strongly typed declaration!<br>
<br>
Components might use special utility classes (filters, ...) which can be declared by using [ComponentUtilsFactory](src/components/factory/componentUtilsFactory.ts)!<br>
<br>
Example:
```
ComponentFactory.createLabel()
      .label()
      .setLocator(this.page.getByTestId('form-name-input-label'))
      .setEnabled(true)
      .setVisible(true);
```

## dataGenerator
Facilitates generation of any test data patterns which might be required for testing purposes. 
All non-static test data should always be loaded from data generator. Data generation should be 
accessed by using [DataFactory](src/dataGenerator//factory/dataFactory.ts)!<br>
General types of patterns:
- randomly generated [random string, email with randomized prefix, ...]
- list of allowed values [fixed titles, ...]
- externally loaded data [using APIs, external databases, ...]
Example:
```typescript
const randomString: string = DataFactory.string().generate()
const randomDecimalNumber: number = DataFactory.decimal().setMin(1).setMax(1000).setPrecission(5).generate()
```

## dataProvider
Facilitates data feeding proccess for tests. All test data should only load test data using this 
module. Main purpose is to wrap the data-loading process, provide single-access point for any required 
data logging, validations and possible data transformation. Also allows to pick either random data from the pool 
or sequentially go through all available data.<br>
Data provider requires a data definition which will be loaded. This should be done via declaration of interface in spec.ts file, where given data is loaded.
Data provider should only be declared by using [DataProviderFactory](src/dataProvider/factory/dataProviderFactory.ts)!<br>
Example:
```typescript
//Test data definition
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

//Test which uses data of TestDataDefinition format
test('Test data provider example - iterate over all data in dataset', async ({}) => {
  const testData: DataProviderInterface<TestDataDefinition> = DataProviderFactory.sequentailDataReader(data)
  while (testData.getNext() !== null) {
    console.log(testData.getCurrent())
  }
})
```

## dto / commonTypes
Library of common types. All Enums, Types or Interfaces which are expected to be used across the whole of company applications
should be declared here. If it is not immediatelly obvious, that a type is common, it can be declared localy. However if it is used
outside of module at least once, it should be moved to common library immediatelly.

## fixtures
Overrides for playwright fixtures. Concept of fixtures is badly designed as of 01-Nov-23 and should be reserved strictly for temporary
hotfixes. As fixtures aggregate multiple concerns(browser access, page access, static API library, ...), global providers should be created for each concern instead.
Example of overriding default fixture
```typescript
//override playwright test with custom test command
import { test } from '../../../src/fixtures/customFixture.js'


test('Context using custom fixture', async ({ customVariableLoadedFromFixture }) => {
  console.log(customVariableLoadedFromFixture)
})
```

## poms
Common POMs definitions. ALL POMs in all repositories must extend common abstract definition.
Currently, contains also commonly used POMs which are not currently assigned to specific repository. In future, such POMs should be moved to separate repository.


## utils
Small utility classes. In case a class is not exported, it is not expected to be used outside of framework repository.
Published utility classes must have NO dependencies outside themselves, other libraries, or classes which are not published.
