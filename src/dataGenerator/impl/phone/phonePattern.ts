import { Country } from '../../../dto/country.js'
import { CountryPhonePrefix } from '../../../dto/countryPhonePrefix.js'
import { DataPatternInterface } from '../../interfaces/dataPatternInterface.js'
import { CommonPattern } from '../commonPattern.js'
import { PrefixPattern } from './prefixPattern.js'
import operatorsIdentifiers from './operatorsIdentifiers.js'

export class PhonePattern extends CommonPattern implements DataPatternInterface {
  private countryPrefix: PrefixPattern | undefined
  private operatorIdentifier: Country | string
  private numberLength: number
  private separatorChar: string
  private separatorGroupSizes: number[]

  constructor() {
    super()

    this.operatorIdentifier = '605'
    this.numberLength = 6
    this.separatorChar = ''
    this.separatorGroupSizes = [3, 3]
  }

  setCountryPrefix(prefix?: CountryPhonePrefix): PrefixPattern {
    if (prefix) {
      this.countryPrefix = new PrefixPattern(prefix, this)
      return this.countryPrefix
    }
    if (!prefix && this.countryPrefix) {
      return this.countryPrefix
    }
    throw Error('Attempting to edit undefined prefix')
  }

  removeCountryPrefix(): PhonePattern {
    this.countryPrefix = undefined
    return this
  }

  setNumberLength(length: number): PhonePattern {
    this.numberLength = length
    return this
  }

  setOperatorIdentifier(identifier: Country | string): PhonePattern {
    this.operatorIdentifier = identifier
    return this
  }

  setSeparator(char: string, groupSizes: number[]): PhonePattern {
    this.separatorChar = char
    this.separatorGroupSizes = groupSizes
    return this
  }

  generate(): string {
    let finalNumber: string = ''

    if (typeof this.operatorIdentifier === 'string') {
      finalNumber += this.operatorIdentifier
    } else {
      finalNumber += this.pickRandomIdentifier(this.operatorIdentifier)
    }

    finalNumber += this.chance.string({ length: this.numberLength, numeric: true })

    if (this.isSeparatorRequired()) {
      finalNumber = this.applySeparatorToNumber(finalNumber)
    }

    return this.generateCountryPrefix() + finalNumber
  }

  private generateCountryPrefix(): string {
    if (this.countryPrefix == undefined) {
      return ''
    }
    return this.countryPrefix.buildCountryPrefix()
  }

  private pickRandomIdentifier(country: Country): string {
    let list: string[]
    switch (country) {
      case Country.CZ:
        list = operatorsIdentifiers.CZ
        break
      case Country.PL:
        list = operatorsIdentifiers.PL
        break
      default:
        throw Error('List of operators identifiers for specified country not found!')
    }
    return list[this.chance.integer({ min: 0, max: list.length - 1 })].toString()
  }

  private applySeparatorToNumber(telNumber: string): string {
    let splitString = telNumber.split('')
    let currentIndex = 0
    for (let i = 0; i < this.separatorGroupSizes.length; i++) {
      if (splitString.length - currentIndex > this.separatorGroupSizes[i]) {
        splitString.splice(this.separatorGroupSizes[i] + currentIndex, 0, this.separatorChar)
        currentIndex = this.separatorGroupSizes[i] + currentIndex + 1
      }
    }
    return splitString.join('')
  }

  private isSeparatorRequired(): boolean {
    if (this.separatorChar == '') {
      return false
    }
    return true
  }
}
