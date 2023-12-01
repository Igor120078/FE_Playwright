import { ButtonInterface } from '../../interfaces/buttonInterface.js'
import { CommonComponent } from '../commonComponent.js'

export class Button extends CommonComponent<Button> implements ButtonInterface {
  private buttonText: string = ''

  constructor() {
    super()
  }

  public newInstance(): Button {
    return new Button()
  }

  async click(): Promise<ButtonInterface> {
    await this.locator.click()
    return this
  }

  validateText(): Promise<void> {
    throw new Error('Method not implemented.')
  }
}
