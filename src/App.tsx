import { useEffect, useState } from 'react'
import styled from 'styled-components'
import Sidebar from './components/Sidebar'
import Start from './components/Start'
import Timer from './components/Timer'
import Trivia from './components/Trivia'
import { earnings, questions } from './data'

const StyledTitle = styled.h1`
  font-size: 28px;
  font-weight: 700;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`

function App() {
  const [questionNumber, setQuestionNumber] = useState<number>(1)
  const [stop, setStop] = useState<boolean>(false)
  const [earned, setEarned] = useState('$ 0')
  const [userName, setUserName] = useState(null)

  useEffect(() => {
    questionNumber > 1 &&
      setEarned(earnings.find(m => m.id === questionNumber - 1).amount)
  }, [earnings, questionNumber])

  return (
    <div className='app'>
      {userName ? (
        <>
          <main className='main'>
            {stop ? (
              <StyledTitle>
                {userName} your earing {earned}
              </StyledTitle>
            ) : (
              <>
                <div className='top'>
                  <Timer setStop={setStop} questionNumber={questionNumber} />
                </div>
                <div className='bottom'>
                  <Trivia
                    questions={questions}
                    questionNumber={questionNumber}
                    setQuestionNumber={setQuestionNumber}
                    setStop={setStop}
                  />
                </div>
              </>
            )}
          </main>
          <Sidebar earnings={earnings} questionNumber={questionNumber} />
        </>
      ) : (
        <Start setUserName={setUserName} />
      )}
    </div>
  )
}

export default App
