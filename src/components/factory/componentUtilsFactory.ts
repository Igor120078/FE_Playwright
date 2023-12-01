import { TableFilter } from '../impl/table/common/commonTableFilter.js'
import { CommonTableRow } from '../impl/table/common/commonTableRow.js'
import { TableFilterInterface } from '../interfaces/table/tableFilterInterface.js'
import { TableRowInterface } from '../interfaces/table/tableRowInterface.js'

export class ComponentUtilsFactory {
  public static createTableFilter(): TableFilterInterface {
    return new TableFilter()
  }
  public static createTableRow(id?: number): TableRowInterface {
    return new CommonTableRow(id)
  }
}
