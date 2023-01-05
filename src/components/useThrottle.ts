let pause = false

interface Callable {
  (...args:unknown[]): void
}

/** 
 * @param callback
 * @param time in milliseconds
 */
const useThrottle = (callback: Callable, time: number) => {
  return (...props: unknown[]) => {
    if(pause) return

    pause = true


    setTimeout(() => {
      callback(...props)
      pause = false
    }, time);
  }
}

export default useThrottle
