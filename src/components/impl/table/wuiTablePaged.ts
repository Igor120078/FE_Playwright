import { CommonTable } from './common/commonTable.js'

/**
 * Table with pager. Currently currently paging or scrolling is not implemented,
 * hence there is no difference between this table and static table.
 */
export class WuiTablePaged extends CommonTable<WuiTablePaged> {
  constructor() {
    super()
  }

  public newInstance(): WuiTablePaged {
    return new WuiTablePaged()
  }
}
