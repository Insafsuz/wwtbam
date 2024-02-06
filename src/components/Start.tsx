import { FC, useRef } from 'react'
import styled from 'styled-components'

const StyledStart = styled.div`
  width: 250px;
  height: 100px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  margin: auto;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`

const StartInput = styled.input`
  width: 100%;
  height: 30px;
  border: none;
  border-radius: 5px;
  padding-left: 10px;
  font-size: 18px;
  &:focus {
    outline: none;
  }
`

const StartButton = styled.button`
  width: 50%;
  height: 30px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 18px;
  font-weight: 500;
`

interface IStart {
  setUserName: (userName: null) => void
}

const Start: FC<IStart> = ({ setUserName }) => {
  const inputRef = useRef<HTMLInputElement>()

  const handleClick = () => {
    inputRef.current.value && setUserName(inputRef.current.value)
  }

  return (
    <StyledStart>
      <StartInput ref={inputRef} type='text' placeholder='Enter your name' />
      <StartButton onClick={handleClick}>Start</StartButton>
    </StyledStart>
  )
}

export default Start
