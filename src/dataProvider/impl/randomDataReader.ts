import { DataProviderInterface } from '../interfaces/dataProviderInterface.js'

export class RandomDataReader<C> implements DataProviderInterface<C> {
  private data: C[] = []
  private currentObjectPointer?: C | null
  private dataCurrentSelectionRound: C[] = []

  constructor(data?: C[]) {
    if (data !== undefined) {
      this.load(data)
    }
  }

  load(source: C[]): void {
    this.data = source as C[]
    this.resetReader()
  }

  getAll(): C[] {
    this.validateDataIsNotEmpty()
    return this.data
  }

  public getNext(): C | null {
    if (this.dataCurrentSelectionRound.length > 0) {
      const pointer = Math.floor(Math.random() * this.dataCurrentSelectionRound.length)
      this.currentObjectPointer = this.dataCurrentSelectionRound[pointer]
      this.dataCurrentSelectionRound.splice(pointer, 1)
      return this.currentObjectPointer
    }
    return null
  }

  public getCurrent(): C | null {
    if (this.currentObjectPointer !== null && this.currentObjectPointer !== undefined) return this.currentObjectPointer
    return null
  }

  private validateDataIsNotEmpty(): void {
    if (this.data.length === 0) throw Error('Requested data set is empty.')
  }

  public resetReader(): void {
    this.dataCurrentSelectionRound = JSON.parse(JSON.stringify(this.data))
    this.currentObjectPointer = null
  }
}
