import { DataPatternInterface } from '../interfaces/dataPatternInterface.js'
import { CommonPattern } from './commonPattern.js'

export class StringPattern extends CommonPattern implements DataPatternInterface {
  private length: number
  private characterBase: string

  constructor() {
    super()
    this.length = 5
    this.characterBase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  }

  setLength(length: number): StringPattern {
    this.length = length
    return this
  }

  setCharacterBase(characterBase: string): StringPattern {
    this.characterBase = characterBase
    return this
  }

  extendCharacterBase(additionalCharacters: string): StringPattern {
    this.characterBase = this.characterBase + additionalCharacters
    return this
  }

  generate(): string {
    return this.chance.string({ length: this.length, pool: this.characterBase })
  }
}
