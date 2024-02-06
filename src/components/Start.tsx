import { FC, useRef } from 'react'

interface IStart {
  setUserName: (userName: null) => void
}

const Start: FC<IStart> = ({ setUserName }) => {
  const inputRef = useRef<HTMLInputElement>()

  const handleClick = () => {
    inputRef.current.value && setUserName(inputRef.current.value)
  }

  return (
    <div className='start'>
      <input
        ref={inputRef}
        type='text'
        placeholder='Enter your name'
        className='startInput'
      />
      <button className='startButton' onClick={handleClick}>
        Start
      </button>
    </div>
  )
}

export default Start
