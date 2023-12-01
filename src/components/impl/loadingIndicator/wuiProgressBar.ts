import { CommonComponent } from '../commonComponent.js'
import { LoadingIndicator } from '../../interfaces/loadingIndicatorInterface.js'

export class WuiProgressBar extends CommonComponent<WuiProgressBar> implements LoadingIndicator {
  constructor() {
    super()
  }

  public newInstance(): WuiProgressBar {
    return new WuiProgressBar()
  }
}
