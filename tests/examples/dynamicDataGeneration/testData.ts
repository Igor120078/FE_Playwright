import { DataFactory } from '../../../src/dataGenerator/factory/dataFactory'
import { CountryPhonePrefix } from '../../../src/dto/countryPhonePrefix'
import operatorIdentifiersCz from '../../../src/dataGenerator/impl/phone/operatorIdentifiersCz'
const reusableRandomString: string = DataFactory.string().generate()

export default [
  {
    staticMail: 'test@email.com',
    texts: {
      random_text_generated_every_time: DataFactory.string().generate(),
      random_string_generated_once_and_then_reused: reusableRandomString,
      random_decimal_number: DataFactory.decimal().setMin(1).setMax(1000).setPrecission(5).generate(),
      random_integer_number: DataFactory.integer().setMin(1).setMax(2).generate(),
      random_phone_number: DataFactory.phoneNumberCZ().generate(),
    },
  },
  {
    staticMail: 'test@email.com',
    texts: {
      random_text_generated_every_time: DataFactory.string().generate(),
      random_string_generated_once_and_then_reused: reusableRandomString,
      random_decimal_number: DataFactory.decimal().setMin(1).setMax(1000).setPrecission(5).generate(),
      random_integer_number: DataFactory.integer().setMin(1).setMax(2).generate(),
      random_phone_number: DataFactory.phoneNumberCZ().setSeparator('-', [3, 3]).generate(),
    },
  },
  {
    staticMail: 'test@email.com',
    texts: {
      random_text_generated_every_time: DataFactory.string().generate(),
      random_string_generated_once_and_then_reused: reusableRandomString,
      random_decimal_number: DataFactory.decimal().setMin(1).setMax(1000).setPrecission(5).generate(),
      random_integer_number: DataFactory.integer().setMin(1).setMax(2).generate(),
      random_phone_number: DataFactory.phoneNumberCZ()
        .setCountryPrefix(CountryPhonePrefix.CZ)
        .useBrackets(true)
        .usePrefixSeparator(true)
        .finishPrefixConfiguration()
        .setOperatorIdentifier(operatorIdentifiersCz)
        .generate(),
    },
  },
  {
    staticMail: 'test@email.com',
    texts: {
      random_text_generated_every_time: DataFactory.string().generate(),
      random_string_generated_once_and_then_reused: reusableRandomString,
      random_decimal_number: DataFactory.decimal().setMin(1).setMax(1000).setPrecission(5).generate(),
      random_integer_number: DataFactory.integer().setMin(1).setMax(2).generate(),
      random_phone_number: DataFactory.phoneNumberCZ()
        .setCountryPrefix()
        .useLeadingPlusSign(false)
        .usePrefixSeparator(true)
        .finishPrefixConfiguration()
        .generate(),
    },
  },
]
