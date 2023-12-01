export class Timer {
  private jumpInMillis: number
  private timeoutInMillis: number

  private startTimestamp: number
  private endTimestamp: number
  private lastTick: number
  private running: boolean
  private finished: boolean
  private timedOut: boolean

  constructor() {
    this.jumpInMillis = 50
    //TODO populate from config
    this.timeoutInMillis = 6000
    this.startTimestamp = 0
    this.endTimestamp = 0
    this.lastTick = 0
    this.running = false
    this.finished = false
    this.timedOut = false
  }

  setTimeout(timeoutInMillis: number): Timer {
    this.timeoutInMillis = timeoutInMillis
    return this
  }

  setJumpDelay(jumpInMillis: number): Timer {
    this.jumpInMillis = jumpInMillis
    return this
  }

  /**
   * Starts the timout count down for current setup of timeout.
   */
  public start(): void {
    this.startTimestamp = Date.now()
    this.endTimestamp = this.startTimestamp + this.timeoutInMillis
    this.running = true
  }

  /**
   * Stops current timout countdown.
   */
  public stop(): void {
    this.running = false
    this.finished = true
    this.lastTick = Date.now()
  }

  /**
   * Returns number of miliseconds from last run.
   * Returns 0 if no run was started yet.
   */
  public getRunningDurationInMillis(): number {
    return this.lastTick - this.startTimestamp
  }

  /**
   * Provides current timout which is applied to runs.
   * Each run will count down from this number;
   */
  public getTimeoutInMillis(): number {
    return this.timeoutInMillis
  }

  /**
   * Returns true if last run timodOut before stop method was called.
   * Returns false if no run was performed or last run was stopped
   * before timout counter ran out.
   */
  public isTimedOut(): boolean {
    return this.timedOut
  }

  /**
   * Returns true if no run was started or if current run has
   * not timed out yet. If run has not started yet, it is started
   * by this call.
   * Returns false if run was stopped or if run has timed out.
   */
  public async nextTick(): Promise<boolean> {
    if (!this.finished) {
      if (!this.running) this.start()
      await new Promise(resolve => setTimeout(resolve, this.jumpInMillis))
      this.lastTick = Date.now()
      if (this.lastTick >= this.endTimestamp) {
        this.running = false
        this.finished = true
        this.timedOut = true
      }
    }

    return !this.finished
  }
}
