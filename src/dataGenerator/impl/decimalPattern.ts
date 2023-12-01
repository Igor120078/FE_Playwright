import { DataPatternInterface } from '../interfaces/dataPatternInterface.js'
import { CommonPattern } from './commonPattern.js'

export class DecimalPattern extends CommonPattern implements DataPatternInterface {
  private min: number
  private max: number
  private precission: number

  constructor() {
    super()
    this.min = 0
    this.max = 100
    this.precission = 2
  }

  setMin(min: number): DecimalPattern {
    this.min = min
    return this
  }

  setMax(max: number): DecimalPattern {
    this.max = max
    return this
  }

  setPrecission(precission: number): DecimalPattern {
    this.precission = precission
    return this
  }

  generate(): string {
    return this.chance.floating({ min: this.min, max: this.max, fixed: this.precission }) + ''
  }
}
