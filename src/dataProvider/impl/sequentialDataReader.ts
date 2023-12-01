import { DataProviderInterface } from '../interfaces/dataProviderInterface.js'

export class SequentialDataReader<C> implements DataProviderInterface<C> {
  private data: C[] = []
  private pointer: number = 0

  constructor(data?: C[]) {
    if (data !== undefined) {
      this.load(data)
    }
  }

  load(source: C[]): void {
    this.data = source as C[]
  }

  getAll(): C[] {
    this.validateDataIsNotEmpty()
    return this.data
  }

  public getNext(): C | null {
    if (this.pointer < this.data.length) {
      this.pointer++
      return this.data[this.pointer - 1]
    }
    return null
  }

  public getCurrent(): C | null {
    if (this.pointer < this.data.length + 1) {
      return this.data[this.pointer - 1]
    }
    return null
  }

  private validateDataIsNotEmpty(): void {
    if (this.data.length === 0) throw Error('Requested data set is empty.')
  }

  public resetReader(): void {
    this.pointer = 0
  }
}
