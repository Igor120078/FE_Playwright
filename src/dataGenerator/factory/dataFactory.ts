import { DecimalPattern } from '../impl/decimalPattern.js'
import { IntegerPattern } from '../impl/integerPattern.js'
import { PhonePattern } from '../impl/phone/phonePattern.js'
import { StringPattern } from '../impl/stringPattern.js'
import { ZipCodePattern } from '../impl/zipCode/zipCodePattern.js'
import { CountryPhonePrefix } from '../../dto/countryPhonePrefix.js'
import { Country } from '../../dto/country.js'

export class DataFactory {
  static string(): StringPattern {
    return new StringPattern()
      .setCharacterBase('ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789')
      .setLength(5)
  }

  static alphaNumericAndSpecialString(): StringPattern {
    return new StringPattern()
      .setCharacterBase('ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789')
      .extendCharacterBase('!?<>_-.,:/\\')
      .setLength(5)
  }

  static integer(): IntegerPattern {
    return new IntegerPattern().setMin(0).setMax(100)
  }

  static decimal() {
    return new DecimalPattern().setMin(0).setMax(100).setPrecission(2)
  }

  static phoneNumberCZ(): PhonePattern {
    return new PhonePattern()
      .setCountryPrefix(CountryPhonePrefix.CZ)
      .finishPrefixConfiguration()
      .setNumberLength(6)
      .setOperatorIdentifier(Country.CZ)
      .setSeparator(' ', [3, 3])
  }

  static phoneNumberPL(): PhonePattern {
    return new PhonePattern()
      .setCountryPrefix(CountryPhonePrefix.PL)
      .finishPrefixConfiguration()
      .setNumberLength(6)
      .setOperatorIdentifier(Country.PL)
      .setSeparator(' ', [3, 3])
  }

  static phoneNumberDE(): PhonePattern {
    return new PhonePattern()
      .setCountryPrefix(CountryPhonePrefix.DE)
      .finishPrefixConfiguration()
      .setOperatorIdentifier('')
      .setNumberLength(11)
      .setSeparator(' ', [4, 3, 4])
  }

  static phoneNumberIT(): PhonePattern {
    return new PhonePattern()
      .setCountryPrefix(CountryPhonePrefix.IT)
      .finishPrefixConfiguration()
      .setOperatorIdentifier('')
      .setNumberLength(11)
      .setSeparator(' ', [4, 3, 4])
  }

  static zipCode(): ZipCodePattern {
    return new ZipCodePattern()
  }
}
