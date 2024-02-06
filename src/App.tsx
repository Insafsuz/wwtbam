import { useEffect, useState } from 'react'
import Start from './components/Start'
import Timer from './components/Timer'
import Trivia from './components/Trivia'
import { data } from './data'
import { IMoneyPyramid } from './types'

function App() {
  const [moneyPyramid, setMoneyPyramid] = useState<IMoneyPyramid[]>(
    [
      { id: 1, amount: '$ 100' },
      { id: 2, amount: '$ 200' },
      { id: 3, amount: '$ 300' },
      { id: 4, amount: '$ 500' },
      { id: 5, amount: '$ 1 000' },
      { id: 6, amount: '$ 2 000' },
      { id: 7, amount: '$ 4 000' },
      { id: 8, amount: '$ 8 000' },
      { id: 9, amount: '$ 16 000' },
      { id: 10, amount: '$ 32 000' },
      { id: 11, amount: '$ 64 000' },
      { id: 12, amount: '$ 125 000' },
      { id: 13, amount: '$ 250 000' },
      { id: 14, amount: '$ 500 000' },
      { id: 15, amount: '$ 1 MILLION' },
    ].reverse()
  )
  const [questionNumber, setQuestionNumber] = useState<number>(1)
  const [stop, setStop] = useState<boolean>(false)
  const [earned, setEarned] = useState('$ 0')
  const [userName, setUserName] = useState(null)

  useEffect(() => {
    questionNumber > 1 &&
      setEarned(moneyPyramid.find(m => m.id === questionNumber - 1).amount)
  }, [moneyPyramid, questionNumber])

  return (
    <div className='app'>
      {userName ? (
        <>
          <main className='main'>
            {stop ? (
              <h1 className='endText'>{userName} your earing {earned}</h1>
            ) : (
              <>
                <div className='top'>
                  <Timer setStop={setStop} questionNumber={questionNumber} />
                </div>
                <div className='bottom'>
                  <Trivia
                    data={data}
                    questionNumber={questionNumber}
                    setQuestionNumber={setQuestionNumber}
                    setStop={setStop}
                  />
                </div>
              </>
            )}
          </main>
          <aside className='pyramid'>
            <ul className='moneyList'>
              {moneyPyramid.map(m => (
                <li
                  className={
                    questionNumber === m.id
                      ? 'moneyListItem active'
                      : 'moneyListItem'
                  }
                  key={m.id}
                >
                  <span className='moneyListItemNumber'>{m.id}</span>
                  <span className='moneyListItemAmount'>{m.amount}</span>
                </li>
              ))}
            </ul>
          </aside>
        </>
      ) : (
        <Start setUserName={setUserName} />
      )}
    </div>
  )
}

export default App
