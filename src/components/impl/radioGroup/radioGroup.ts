import { expect } from '@playwright/test'
import { ComponentInterface } from '../../interfaces/componentInterface.js'
import { RadioGroupInterface, RadioOptionInterface } from '../../interfaces/radioGroupInterface.js'
import { CommonComponent } from '../commonComponent.js'

export class RadioGroup
  extends CommonComponent<RadioGroup>
  implements RadioGroupInterface, ComponentInterface<RadioGroup>
{
  private radioOptionList: RadioOptionInterface[] = []

  constructor() {
    super()
  }

  public newInstance(): RadioGroup {
    return new RadioGroup()
  }

  addRadioOption(radioOption: RadioOptionInterface): RadioGroupInterface {
    this.radioOptionList.push(radioOption)
    return this
  }
  selectOptionByIndex(index: number): RadioGroupInterface {
    if (index >= this.radioOptionList.length)
      throw Error(
        "Requested option identified by index: '" +
          index +
          "' not found in RadioGroup. Current size of radio group is: '" +
          this.radioOptionList.length +
          "' options"
      )
    this.radioOptionList.at(index)?.select()
    return this
  }
  selectOptionByName(name: string): RadioGroupInterface {
    let matchFound: boolean = false
    for (const option of this.radioOptionList) {
      if (option.getOptionName() == name) {
        option.select()
        matchFound = true
      } else {
        option.setIsSelected(false)
      }
    }
    if (!matchFound) throw Error("Requested option identified by name: '" + name + "' not found in RadioGroup.")
    return this
  }
  async validateSelf(): Promise<void> {
    for (const item of this.radioOptionList) {
      item.validateSelf()
    }
  }
  validateText(): Promise<void> {
    throw new Error('Method not implemented.')
  }
}

export class RadioOption extends CommonComponent<RadioOption> implements RadioOptionInterface {
  private name: string = ''
  private radioButtonText: string = ''
  private isSelected: boolean = false

  constructor() {
    super()
  }

  public newInstance(): RadioOption {
    return new RadioOption()
  }

  setOptionName(name: string): RadioOptionInterface {
    this.name = name
    return this
  }
  setOptionText(text: string): RadioOptionInterface {
    this.radioButtonText = text
    return this
  }
  getOptionName(): string {
    return this.name
  }
  setIsSelected(isSelected: boolean): RadioOptionInterface {
    this.isSelected = isSelected
    return this
  }
  async select(): Promise<RadioOptionInterface> {
    await this.locator.setChecked(true)
    this.setIsSelected(true)
    return this
  }
  async validateSelf(): Promise<void> {
    await super.validateSelf()
    expect((await this.locator.isChecked()) === this.isSelected).toBeTruthy()
  }
  validateText(): Promise<void> {
    throw new Error('Method not implemented.')
  }
}
