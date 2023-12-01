import { WuiProgressBar } from '../impl/loadingIndicator/wuiProgressBar'

export class LoadingIndicatorDelegate {
  public wuiProgressBar() {
    return new WuiProgressBar()
  }
}
