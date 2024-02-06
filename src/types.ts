export interface IMoneyPyramid {
  id: number
  amount: string
}

export interface IAnswer {
  text: string
  correct: boolean
}

export interface IQuestion {
  id: number
  question: string
  answers: IAnswer[]
}
