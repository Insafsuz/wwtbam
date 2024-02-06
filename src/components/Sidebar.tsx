import { FC } from 'react'
import styled from 'styled-components'
import { IEarning } from '../types'

const Pyramid = styled.aside`
  flex: 0 1 25%;
  display: flex;
  align-items: center;
  justify-content: center;
`
const MoneyList = styled.ul`
  padding: 40px;
  width: 100%;
`
const MoneyListItem = styled.li`
  padding: 6px;
  border-radius: 5px;
  display: flex;
  align-items: center;
  &.active {
    background-color: teal;
  }
`
const MoneyListNumber = styled.span`
  font-size: 20px;
  width: 30%;
`

const MoneyListAmount = styled.span`
  font-size: 22px;
  font-weight: 00;
`

interface ISidebar {
  earnings: IEarning[]
  questionNumber: number
}

const Sidebar: FC<ISidebar> = ({ earnings, questionNumber }) => {
  return (
    <Pyramid>
      <MoneyList>
        {earnings.map(m => (
          <MoneyListItem
            className={
              questionNumber === m.id ? 'moneyListItem active' : 'moneyListItem'
            }
            key={m.id}
          >
            <MoneyListNumber>{m.id}</MoneyListNumber>
            <MoneyListAmount>{m.amount}</MoneyListAmount>
          </MoneyListItem>
        ))}
      </MoneyList>
    </Pyramid>
  )
}

export default Sidebar
