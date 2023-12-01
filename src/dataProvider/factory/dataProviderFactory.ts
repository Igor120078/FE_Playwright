import { RandomDataReader } from '../impl/randomDataReader.js'
import { SequentialDataReader } from '../impl/sequentialDataReader.js'

export class DataProviderFactory {
  static sequentailDataReader<C>(data?: C[]): SequentialDataReader<C> {
    return new SequentialDataReader<C>(data)
  }
  static randomDataReader<C>(data?: C[]): RandomDataReader<C> {
    return new RandomDataReader<C>(data)
  }
}
