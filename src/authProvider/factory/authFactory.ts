import { Page } from '@playwright/test'
import { SuperfixWebAuth } from '../impl/manualSelection/superfixWebAuth.js'
import { WarehouseWebAuth } from '../impl/manualSelection/warehouseWebAuth.js'
import { SuperfixUnifiedAuth } from '../impl/automatedSelection/superfixUnifiedAuth.js'
import { WarehouseUnifiedAuth } from '../impl/automatedSelection/warehouseUnifiedAuth.js'

/**
 * Facilitates unified login procedure for applications.
 */
export class AuthFactory {
  public static createSuperfixWebAuth(page: Page): SuperfixWebAuth {
    return new SuperfixWebAuth(page)
  }
  public static createWarehouseWebAuth(page: Page): WarehouseWebAuth {
    return new WarehouseWebAuth(page)
  }
  public static createSuperfixAuth(page: Page): SuperfixUnifiedAuth {
    return new SuperfixUnifiedAuth(page)
  }
  public static createWarehouseAuth(page: Page): WarehouseUnifiedAuth {
    return new WarehouseUnifiedAuth(page)
  }
}
