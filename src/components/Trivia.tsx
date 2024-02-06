import { FC, useEffect, useState } from 'react'
import styled from 'styled-components'
import useSound from 'use-sound'
import correct from '../assets/correct.mp3'
import play from '../assets/play.mp3'
import wrong from '../assets/wrong.mp3'
import { IAnswer, IQuestion } from '../types'

const StyledTrivia = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
`

const StyledQuestion = styled.div`
  width: 80%;
  background: linear-gradient(#100242, #000);
  border-radius: 10px;
  border: 2px solid #fff;
  text-align: center;
  padding: 20px;
  font-size: 20px;
`

const StyledAnswers = styled.ul`
  width: 100%;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 15px;
`

const StyledAnswer = styled.ul`
  width: 40%;
  padding: 10px;
  text-align: center;
  background: linear-gradient(#0e0124, #22074d);
  border: 1px solid #fff;
  border-radius: 15px;
  font-size: 20px;
  font-weight: 300;
  cursor: pointer;
  &:hover,
  &.active {
    background: mediumblue;
  }
  &.correct {
    animation: correct 3s ease forwards;
  }
  &.wrong {
    animation: wrong 3s ease forwards;
  }
`

interface TriviaProps {
  questions: IQuestion[]
  questionNumber: number
  setQuestionNumber: (questionNumber: number) => void
  setStop: (stop: boolean) => void
}

const Trivia: FC<TriviaProps> = ({
  questions,
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

  useEffect(() => {
    letsPlay()
  }, [letsPlay])

  useEffect(() => {
    setQuestion(questions[questionNumber - 1])
  }, [questions, questionNumber])

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
    <StyledTrivia>
      <StyledQuestion>{question?.question}</StyledQuestion>
      <StyledAnswers>
        {question?.answers.map(answer => (
          <StyledAnswer
            className={selectedAnswer === answer ? className : 'answer'}
            key={answer.text}
            onClick={() => handleClick(answer)}
          >
            {answer?.text}
          </StyledAnswer>
        ))}
      </StyledAnswers>
    </StyledTrivia>
  )
}

export default Trivia
