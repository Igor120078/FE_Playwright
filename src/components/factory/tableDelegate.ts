import { FormTable } from '../impl/table/wuiFormTable.js'
import { WuiStaticTable } from '../impl/table/wuiStaticTable.js'
import { StaticTableWithoutHeader } from '../impl/table/staticTableWithoutHeader.js'
import { WuiTablePaged } from '../impl/table/wuiTablePaged.js'

export class TableDelegate {
  public tableStatic() {
    return new WuiStaticTable()
  }
  public tableStaticWithoutHeader() {
    return new StaticTableWithoutHeader()
  }
  public tableForm() {
    return new FormTable()
  }
  public tablePaged() {
    return new WuiTablePaged()
  }
}
