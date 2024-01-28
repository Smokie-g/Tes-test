import { useRef, useEffect } from 'react'

export const useRefetch = (func: () => void, delay: number): void => {
  const ref = useRef<() => void>()

  useEffect(() => {
    ref.current = func
  }, [func])

  useEffect(() => {
    const timer = setInterval(() => ref?.current?.(), delay)

    return () => clearInterval(timer)
  })
}
