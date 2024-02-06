import { FC, useEffect, useState } from 'react'


interface ITimer {
  setStop: (stop: boolean) => void
  questionNumber: number
}

const Timer: FC<ITimer> = ({ setStop, questionNumber }) => {
  const [timer, setTimer] = useState(3)

  useEffect(() => {
    if (timer === 0) {
      setStop(true)
    }
    const interval = setTimeout(() => {
      setTimer(timer - 1)
    }, 1000)

    return () => clearInterval(interval)
  }, [setStop, timer])

  useEffect(() => {
    setTimer(30)
  }, [questionNumber])

  return <div className='timer'>{timer}</div>
}

export default Timer
