import { CommonTable } from './common/commonTable.js'

/**
 * Basic implementation of table, which uses `thead`, `tbody`, `tr` and `td` elements
 */
export class WuiStaticTable extends CommonTable<WuiStaticTable> {
  constructor() {
    super()
  }

  public newInstance(): WuiStaticTable {
    return new WuiStaticTable()
  }
}
