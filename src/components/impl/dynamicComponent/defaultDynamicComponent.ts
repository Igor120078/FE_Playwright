import { DynamicComponentInterface } from '../../interfaces/dynamicComponentInterface.js'
import { CounterConditions } from '../../types/counterConditions.js'
import { ComponentInterface } from '../../interfaces/componentInterface.js'
import { retryConditionInterface } from '../../../utils/retry/retryConditionInterface.js'
import { Retry } from '../../../utils/retry/retry.js'

export class DefaultDynamicComponent<C extends ComponentInterface<C>> implements DynamicComponentInterface<C> {
  protected component!: ComponentInterface<C>
  protected timeout?: number

  setComponent(component: C): DynamicComponentInterface<C> {
    this.component = component
    return this
  }

  async count(): Promise<number> {
    return await this.component.getLocator().count()
  }

  async waitForCount(
    condition: CounterConditions,
    count: number,
    options?: { timeout?: number; jumpDelay?: number }
  ): Promise<void> {
    await Retry.run(
      new ElementCountValidation<ComponentInterface<C>>(condition, count, this.component),
      'Waiting for count failed! Condition: ' + CounterConditions[condition] + ' ExpectedCount: ' + count,
      options
    )
  }

  async readAll(): Promise<C[]> {
    const returnArray: C[] = []
    let totalComponentCount: number = await this.component.getLocator().count()
    for (let i = 0; i < totalComponentCount; i++) {
      returnArray.push(this.component.newInstance().setLocator(this.component.getLocator().nth(i)))
    }
    return returnArray
  }
}

class ElementCountValidation<C extends ComponentInterface<C>> implements retryConditionInterface {
  condition: CounterConditions
  expectedCount: number
  component: C

  constructor(condition: CounterConditions, count: number, component: C) {
    this.component = component
    this.condition = condition
    this.expectedCount = count
  }

  async evaluate(): Promise<boolean> {
    let actualCountOnPage: number = await this.component.getLocator().count()
    switch (this.condition) {
      case CounterConditions.EXACT:
        if (actualCountOnPage === this.expectedCount) return true
        return false
      case CounterConditions.LESS_THAN:
        if (actualCountOnPage < this.expectedCount) return true
        return false
      case CounterConditions.MORE_THAN:
        if (actualCountOnPage > this.expectedCount) return true
        return false
    }
    throw Error('Unexpected CounterCondition option!')
  }
}
