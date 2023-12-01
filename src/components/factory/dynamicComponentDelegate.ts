import { DefaultDynamicComponent } from '../impl/dynamicComponent/defaultDynamicComponent.js'
import { ComponentInterface } from '../interfaces/componentInterface.js'

export class DynamicComponentDelegate {
  public defaultDynamicComponent<C extends ComponentInterface<C>>() {
    return new DefaultDynamicComponent<C>()
  }
}
