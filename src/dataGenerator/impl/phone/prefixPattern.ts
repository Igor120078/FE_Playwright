import { CountryPhonePrefix } from '../../../dto/countryPhonePrefix.js'
import { PhonePattern } from './phonePattern.js'

export class PrefixPattern {
  private countryPrefix: string
  private isStartWithPlus: boolean
  private isNeedBrackets: boolean
  private isNeedSeparator: boolean
  private parent: PhonePattern

  constructor(prefix: CountryPhonePrefix, parent: PhonePattern) {
    this.parent = parent
    this.isStartWithPlus = true
    this.isNeedBrackets = false
    this.isNeedSeparator = true
    this.countryPrefix = prefix
  }

  useLeadingPlusSign(startWithPlus: boolean): PrefixPattern {
    this.isStartWithPlus = startWithPlus
    return this
  }

  useBrackets(use: boolean): PrefixPattern {
    this.isNeedBrackets = use
    return this
  }

  usePrefixSeparator(use: boolean): PrefixPattern {
    this.isNeedSeparator = use
    return this
  }

  finishPrefixConfiguration(): PhonePattern {
    return this.parent
  }

  buildCountryPrefix(): string {
    let resultPrefix: string = this.countryPrefix

    if (this.isStartWithPlus) {
      resultPrefix = '+' + this.countryPrefix
    }

    if (this.isNeedBrackets) {
      resultPrefix = '(' + resultPrefix + ')'
    }

    if (this.isNeedSeparator) {
      resultPrefix += ' '
    }

    return resultPrefix
  }
}
