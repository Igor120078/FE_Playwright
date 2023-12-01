import { DataFactory } from '../../../src/dataGenerator/factory/dataFactory'
import { Country } from '../../../src/dto/country'

export default [
  {
    staticPhoneNumber: '739 365 005',
    texts: {
      phone_number_default: DataFactory.phoneNumberCZ().generate(),
      phone_number_without_separators: DataFactory.phoneNumberCZ()
        .setCountryPrefix()
        .usePrefixSeparator(false)
        .useBrackets(false)
        .useLeadingPlusSign(true)
        .finishPrefixConfiguration()
        .setOperatorIdentifier(Country.CZ)
        .setSeparator('', [])
        .generate(),
      phone_number_with_country_prefix_brackets: DataFactory.phoneNumberCZ()
        .setCountryPrefix()
        .usePrefixSeparator(false)
        .useBrackets(true)
        .finishPrefixConfiguration()
        .setOperatorIdentifier(Country.CZ)
        .setSeparator('', [])
        .generate(),
      phone_number_without_leading_plus_sign_and_separators: DataFactory.phoneNumberCZ()
        .setCountryPrefix()
        .useLeadingPlusSign(false)
        .usePrefixSeparator(false)
        .finishPrefixConfiguration()
        .setOperatorIdentifier(Country.CZ)
        .setSeparator('', [])
        .generate(),
      phone_number_without_leading_plus_sign_with_separators: DataFactory.phoneNumberCZ()
        .setCountryPrefix()
        .useLeadingPlusSign(false)
        .finishPrefixConfiguration()
        .setOperatorIdentifier(Country.CZ)
        .generate(),
      phone_number_without_leading_plus_sign_with_brackets_and_separators: DataFactory.phoneNumberCZ()
        .setCountryPrefix()
        .useLeadingPlusSign(false)
        .useBrackets(true)
        .finishPrefixConfiguration()
        .setOperatorIdentifier(Country.CZ)
        .generate(),
      phone_number_without_leading_plus_sign_with_brackets_without_separators: DataFactory.phoneNumberCZ()
        .setCountryPrefix()
        .useLeadingPlusSign(false)
        .useBrackets(true)
        .usePrefixSeparator(false)
        .finishPrefixConfiguration()
        .setOperatorIdentifier(Country.CZ)
        .setSeparator('', [])
        .generate(),
      phone_number_without_brackets_with_dash_separators: DataFactory.phoneNumberCZ()
        .setSeparator('-', [3, 3])
        .generate(),
      phone_number_without_country_prefix_with_separators: DataFactory.phoneNumberCZ().removeCountryPrefix().generate(),
    },
  },
  {
    staticPhoneNumber: '601252758',
    texts: {
      phone_number_default: DataFactory.phoneNumberPL().generate(),
      phone_number_without_separators: DataFactory.phoneNumberPL()
        .setCountryPrefix()
        .usePrefixSeparator(false)
        .useBrackets(false)
        .useLeadingPlusSign(true)
        .finishPrefixConfiguration()
        .setOperatorIdentifier(Country.PL)
        .setSeparator('', [])
        .generate(),
      phone_number_with_country_prefix_brackets: DataFactory.phoneNumberPL()
        .setCountryPrefix()
        .usePrefixSeparator(false)
        .useBrackets(true)
        .finishPrefixConfiguration()
        .setOperatorIdentifier(Country.PL)
        .setSeparator('', [])
        .generate(),
      phone_number_without_leading_plus_sign_and_separators: DataFactory.phoneNumberPL()
        .setCountryPrefix()
        .useLeadingPlusSign(false)
        .usePrefixSeparator(false)
        .finishPrefixConfiguration()
        .setOperatorIdentifier(Country.PL)
        .setSeparator('', [])
        .generate(),
      phone_number_without_leading_plus_sign_with_separators: DataFactory.phoneNumberPL()
        .setCountryPrefix()
        .useLeadingPlusSign(false)
        .finishPrefixConfiguration()
        .setOperatorIdentifier(Country.PL)
        .generate(),
      phone_number_without_leading_plus_sign_with_brackets_and_separators: DataFactory.phoneNumberPL()
        .setCountryPrefix()
        .useLeadingPlusSign(false)
        .useBrackets(true)
        .finishPrefixConfiguration()
        .setOperatorIdentifier(Country.PL)
        .generate(),
      phone_number_without_leading_plus_sign_with_brackets_without_separators: DataFactory.phoneNumberPL()
        .setCountryPrefix()
        .useLeadingPlusSign(false)
        .useBrackets(true)
        .usePrefixSeparator(false)
        .finishPrefixConfiguration()
        .setOperatorIdentifier(Country.PL)
        .setSeparator('', [])
        .generate(),
      phone_number_without_brackets_with_dash_separators: DataFactory.phoneNumberPL()
        .setSeparator('-', [3, 3])
        .generate(),
      phone_number_without_country_prefix_with_separators: DataFactory.phoneNumberPL().removeCountryPrefix().generate(),
    },
  },
  {
    staticPhoneNumber: '73487654393',
    texts: {
      phone_number_default: DataFactory.phoneNumberDE().generate(),
      phone_number_without_separators: DataFactory.phoneNumberDE()
        .setCountryPrefix()
        .usePrefixSeparator(false)
        .useBrackets(false)
        .useLeadingPlusSign(true)
        .finishPrefixConfiguration()
        .setSeparator('', [])
        .generate(),
      phone_number_with_country_prefix_brackets: DataFactory.phoneNumberDE()
        .setCountryPrefix()
        .usePrefixSeparator(false)
        .useBrackets(true)
        .finishPrefixConfiguration()
        .setSeparator('', [])
        .generate(),
      phone_number_without_leading_plus_sign_and_separators: DataFactory.phoneNumberDE()
        .setCountryPrefix()
        .useLeadingPlusSign(false)
        .usePrefixSeparator(false)
        .finishPrefixConfiguration()
        .setSeparator('', [])
        .generate(),
      phone_number_without_leading_plus_sign_with_separators: DataFactory.phoneNumberDE()
        .setCountryPrefix()
        .useLeadingPlusSign(false)
        .finishPrefixConfiguration()
        .generate(),
      phone_number_without_leading_plus_sign_with_brackets_and_separators: DataFactory.phoneNumberDE()
        .setCountryPrefix()
        .useLeadingPlusSign(false)
        .useBrackets(true)
        .finishPrefixConfiguration()
        .generate(),
      phone_number_without_leading_plus_sign_with_brackets_without_separators: DataFactory.phoneNumberDE()
        .setCountryPrefix()
        .useLeadingPlusSign(false)
        .useBrackets(true)
        .usePrefixSeparator(false)
        .finishPrefixConfiguration()
        .setSeparator('', [])
        .generate(),
      phone_number_without_brackets_with_dash_separators: DataFactory.phoneNumberDE()
        .setSeparator('-', [4, 3, 4])
        .generate(),
      phone_number_without_country_prefix_with_separators: DataFactory.phoneNumberDE().removeCountryPrefix().generate(),
    },
  },
  {
    staticPhoneNumber: '8548765917',
    texts: {
      phone_number_default: DataFactory.phoneNumberIT().generate(),
      phone_number_without_separators: DataFactory.phoneNumberIT()
        .setCountryPrefix()
        .usePrefixSeparator(false)
        .useBrackets(false)
        .useLeadingPlusSign(true)
        .finishPrefixConfiguration()
        .setSeparator('', [])
        .generate(),
      phone_number_with_country_prefix_brackets: DataFactory.phoneNumberIT()
        .setCountryPrefix()
        .usePrefixSeparator(false)
        .useBrackets(true)
        .finishPrefixConfiguration()
        .setSeparator('', [])
        .generate(),
      phone_number_without_leading_plus_sign_and_separators: DataFactory.phoneNumberIT()
        .setCountryPrefix()
        .useLeadingPlusSign(false)
        .usePrefixSeparator(false)
        .finishPrefixConfiguration()
        .setSeparator('', [])
        .generate(),
      phone_number_without_leading_plus_sign_with_separators: DataFactory.phoneNumberIT()
        .setCountryPrefix()
        .useLeadingPlusSign(false)
        .finishPrefixConfiguration()
        .generate(),
      phone_number_without_leading_plus_sign_with_brackets_and_separators: DataFactory.phoneNumberIT()
        .setCountryPrefix()
        .useLeadingPlusSign(false)
        .useBrackets(true)
        .finishPrefixConfiguration()
        .generate(),
      phone_number_without_leading_plus_sign_with_brackets_without_separators: DataFactory.phoneNumberIT()
        .setCountryPrefix()
        .useLeadingPlusSign(false)
        .useBrackets(true)
        .usePrefixSeparator(false)
        .finishPrefixConfiguration()
        .setSeparator('', [])
        .generate(),
      phone_number_without_brackets_with_dash_separators: DataFactory.phoneNumberIT()
        .setSeparator('-', [4, 3, 4])
        .generate(),
      phone_number_without_country_prefix_with_separators: DataFactory.phoneNumberIT().removeCountryPrefix().generate(),
    },
  },
]
