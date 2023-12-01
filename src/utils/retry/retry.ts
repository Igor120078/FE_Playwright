import { Timer } from '../timer/timer.js'
import { retryConditionInterface } from './retryConditionInterface.js'

export class Retry {
  static async run(
    condition: retryConditionInterface | boolean,
    messageOnFail: string,
    options?: { timeout?: number; jumpDelay?: number }
  ) {
    const timer: Timer = new Timer()

    if (options) {
      if (options.timeout) timer.setTimeout(options.timeout)
      if (options.jumpDelay) timer.setJumpDelay(options.jumpDelay)
    }

    while ((await timer.nextTick()) != false) {
      if (condition === true) timer.stop()
      if (typeof condition !== 'boolean' && (await condition.evaluate())) timer.stop()
    }
    if (timer.isTimedOut()) throw Error(messageOnFail + '\nTimed out after: ' + timer.getRunningDurationInMillis())
  }
}
