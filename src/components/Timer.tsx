import { FC, useEffect, useState } from 'react'
import styled from 'styled-components'

const StyledTimer = styled.div`
  width: 70px;
  height: 70px;
  border-radius: 50%;
  border: 5px solid #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 30px;
  font-weight: 700;
  position: absolute;
  left: 140px;
  bottom: 10px;
`

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

  return <StyledTimer>{timer}</StyledTimer>
}

export default Timer
