const ImmediatePriority = 1
const UserBlockingPriority = 2
const NormalPriority = 3
const LowPriority = 4
const IdlePriority = 5

let taskId = 0
const tasks = new Map()

function now() {
  return typeof performance !== 'undefined' && performance.now ? performance.now() : Date.now()
}

function scheduleCallback(priorityLevel, callback) {
  const id = ++taskId
  const timeout = priorityLevel === IdlePriority ? 1 : 0
  const handle = setTimeout(() => {
    tasks.delete(id)
    callback({ didTimeout: false, timeRemaining: () => 50 })
  }, timeout)
  const task = { id, handle, priorityLevel }
  tasks.set(id, task)
  return task
}

function cancelCallback(task) {
  if (!task) return
  clearTimeout(task.handle)
  tasks.delete(task.id)
}

function runWithPriority(_priorityLevel, eventHandler) {
  return eventHandler()
}

function next(eventHandler) {
  return eventHandler()
}

function wrapCallback(callback) {
  return callback
}

function getFirstCallbackNode() {
  return tasks.values().next().value || null
}

function noop() {}

const Scheduler = {
  unstable_ImmediatePriority: ImmediatePriority,
  unstable_UserBlockingPriority: UserBlockingPriority,
  unstable_NormalPriority: NormalPriority,
  unstable_LowPriority: LowPriority,
  unstable_IdlePriority: IdlePriority,
  unstable_now: now,
  unstable_scheduleCallback: scheduleCallback,
  unstable_cancelCallback: cancelCallback,
  unstable_shouldYield: () => false,
  unstable_requestPaint: noop,
  unstable_runWithPriority: runWithPriority,
  unstable_next: next,
  unstable_wrapCallback: wrapCallback,
  unstable_getCurrentPriorityLevel: () => NormalPriority,
  unstable_getFirstCallbackNode: getFirstCallbackNode,
  unstable_continueExecution: noop,
  unstable_pauseExecution: noop,
  unstable_forceFrameRate: noop,
}

export const unstable_ImmediatePriority = ImmediatePriority
export const unstable_UserBlockingPriority = UserBlockingPriority
export const unstable_NormalPriority = NormalPriority
export const unstable_LowPriority = LowPriority
export const unstable_IdlePriority = IdlePriority
export const unstable_now = now
export const unstable_scheduleCallback = scheduleCallback
export const unstable_cancelCallback = cancelCallback
export const unstable_shouldYield = Scheduler.unstable_shouldYield
export const unstable_requestPaint = noop
export const unstable_runWithPriority = runWithPriority
export const unstable_next = next
export const unstable_wrapCallback = wrapCallback
export const unstable_getCurrentPriorityLevel = Scheduler.unstable_getCurrentPriorityLevel
export const unstable_getFirstCallbackNode = getFirstCallbackNode
export const unstable_continueExecution = noop
export const unstable_pauseExecution = noop
export const unstable_forceFrameRate = noop

export default Scheduler
