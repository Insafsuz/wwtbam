export interface IAnswer {
  text: string
  correct: boolean
}

export interface IQuestion {
  id: number
  question: string
  answers: IAnswer[]
}

export interface IEarning {
  id: number
  amount: string
}
