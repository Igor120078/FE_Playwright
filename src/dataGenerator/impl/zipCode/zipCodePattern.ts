import { Country } from '../../../dto/country.js'
import { DataPatternInterface } from '../../interfaces/dataPatternInterface.js'
import { CommonPattern } from '../commonPattern.js'
import czCodes from './cz_zipCodeList.js'
import deCodes from './de_zipCodeList.js'
import itCodes from './it_zipCodeList.js'
import plCodes from './pl_zipCodeList.js'

interface ZipCodeListInterface {
  valid: string[]
  invalid: string[]
}

export class ZipCodePattern extends CommonPattern implements DataPatternInterface {
  private useSeparator: boolean
  private country: Country
  private validZipCode: boolean
  private zipCodeList!: ZipCodeListInterface

  constructor() {
    super()
    this.country = Country.CZ
    this.useSeparator = true
    this.validZipCode = true
    this.loadZipCodes()
  }

  setSeparator(useSeparator: boolean): ZipCodePattern {
    this.useSeparator = useSeparator
    return this
  }

  generate(): string {
    this.loadZipCodes()
    let resultZipCode: string

    if (this.validZipCode) {
      resultZipCode = this.pickRandom(this.zipCodeList.valid)
    } else {
      resultZipCode = this.pickRandom(this.zipCodeList.invalid)
    }

    if (this.useSeparator) {
      resultZipCode = this.addSeparator(resultZipCode)
    }

    return resultZipCode
  }

  private addSeparator(zipCode: string) {
    let splitString = zipCode.split('')
    splitString.splice(3, 0, ' ')
    return splitString.join('')
  }

  private loadZipCodes() {
    switch (this.country) {
      case Country.CZ:
        this.zipCodeList = czCodes as ZipCodeListInterface
        break
      case Country.DE:
        this.zipCodeList = deCodes as ZipCodeListInterface
        break
      case Country.IT:
        this.zipCodeList = itCodes as ZipCodeListInterface
        break
      case Country.PL:
        this.zipCodeList = plCodes as ZipCodeListInterface
        break
      default:
        throw Error('Zipcode list for specified country not found!')
    }
  }

  private pickRandom(list: string[]): string {
    return list[this.chance.integer({ min: 0, max: list.length - 1 })].toString()
  }
}
