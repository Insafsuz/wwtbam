import { FC, useEffect, useState } from 'react'
import useSound from 'use-sound'
import play from '../assets/play.mp3'
import correct from '../assets/correct.mp3'
import wrong from '../assets/wrong.mp3'
import { IAnswer, IQuestion } from '../types'

interface TriviaProps {
  data: IQuestion[]
  questionNumber: number
  setQuestionNumber: (questionNumber: number) => void
  setStop: (stop: boolean) => void
}

const Trivia: FC<TriviaProps> = ({
  data,
  questionNumber,
  setQuestionNumber,
  setStop,
}) => {
  const [question, setQuestion] = useState<IQuestion | null>(null)
  const [selectedAnswer, setSelectedAnswer] = useState<IAnswer | null>(null)
  const [className, setClassName] = useState<string>('answer')

  const [letsPlay] = useSound(play)
  const [correctAnswer] = useSound(correct)
  const [wrongAnswer] = useSound(wrong)

  // useEffect(() => {
  //   letsPlay()
  // }, [letsPlay])

  useEffect(() => {
    setQuestion(data[questionNumber - 1])
  }, [data, questionNumber])

  const delay = (duration: number, callback: () => void) => {
    setTimeout(() => {
      callback()
    }, duration)
  }

  const handleClick = (answer: IAnswer) => {
    setSelectedAnswer(answer)
    setClassName('answer active')
    delay(3000, () =>
      setClassName(answer.correct ? 'answer correct' : 'answer wrong')
    )
    delay(5000, () => {
      if (answer.correct) {
        correctAnswer()
        delay(1500, () => {
          setQuestionNumber(questionNumber + 1)
          setSelectedAnswer(null)
        })
      } else {
        wrongAnswer()
        delay(1000, () => {
          setStop(true)
        })
      }
    })
  }

  return (
    <div className='trivia'>
      <div className='question'>{question?.question}</div>
      <div className='answers'>
        {question?.answers.map(answer => (
          <div
            className={selectedAnswer === answer ? className : 'answer'}
            key={answer.text}
            onClick={() => handleClick(answer)}
          >
            {answer?.text}
          </div>
        ))}
      </div>
    </div>
  )
}

export default Trivia
