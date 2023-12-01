import { DataPatternInterface } from '../interfaces/dataPatternInterface.js'
import { CommonPattern } from './commonPattern.js'

export class IntegerPattern extends CommonPattern implements DataPatternInterface {
  private min: number
  private max: number

  constructor() {
    super()
    this.min = 0
    this.max = 100
  }

  setMin(min: number): IntegerPattern {
    this.min = min
    return this
  }

  setMax(max: number): IntegerPattern {
    this.max = max
    return this
  }

  generate(): string {
    return this.chance.integer({ min: this.min, max: this.max }) + ''
  }
}
