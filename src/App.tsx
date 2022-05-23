import React, { ChangeEvent } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setAmount, setTerm, store } from './store/store'
import { useCalcDataQuery } from './services/calc'

import styled from 'styled-components'
import Slider from '@mui/material/Slider'
import TextField from '@mui/material/TextField'
import InputAdornment from '@mui/material/InputAdornment'
import Button from '@mui/material/Button'

const Main = styled.main`
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`
const Wrapper = styled.div`
  background-color: #7575ff; // pantone 2022 color of the year
  min-height: 50vh;
  margin-top: 30px;
  border-radius: 30px;
  padding: 40px;
  color: white;
  font-size: 18px;
  max-width: 375px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-content: center;
  justify-content: space-between;
`
const StyledSlider = styled(Slider)`
  max-width: 350px;
`
const InputGroup = styled.div``
const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`
const Title = styled.div``
const StyledTextField = styled(TextField)`
  max-width: 100px;
`
const StyledInputAdornment = styled(InputAdornment)`
  justify-content: flex-end;
  position: absolute;
  width: 100%;
  right: 15px;
`
const Table = styled.table`
  text-align: left;
  width: 100%;
  margin-top: 50px;
  position: relative;
  &:before {
    content: '';
    width: 80%;
    height: 2px;
    background-color: white;
    position: absolute;
    top: -23px;
    width: 80%;
    left: 50%;
    transform: translateX(-50%);
  }
`

function App() {
  const { amount, term } = useSelector(
    (state: typeof store) => store.getState().calcStore,
  )
  const dispatch = useDispatch()

  const { data } = useCalcDataQuery([amount, term])

  const handleChange = (e: Event | ChangeEvent) => {
    const el:
      | HTMLInputElement
      | HTMLTextAreaElement = e.target as HTMLInputElement
    el.name.indexOf('amount') > -1
      ? dispatch(setAmount(parseInt(el.value, 10)))
      : dispatch(setTerm(parseInt(el.value, 10)))
  }

  return (
    <Main>
      <Wrapper>
        <span>
          <InputGroup>
            <Header>
              <Title>Total amount</Title>
              <StyledTextField
                name="amountInput"
                inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                InputProps={{
                  startAdornment: (
                    <StyledInputAdornment position="end">
                      $
                    </StyledInputAdornment>
                  ),
                }}
                value={amount}
                onChange={(e) => handleChange(e)}
              />
            </Header>
            <StyledSlider
              name="amountSlider"
              aria-label="Volume"
              value={amount}
              step={100}
              marks
              min={300}
              max={8000}
              onChange={(e) => handleChange(e)}
              sx={{
                color: 'white',
              }}
            />
          </InputGroup>

          <InputGroup>
            <Header>
              <Title>Term</Title>
              <StyledTextField
                name="termInput"
                inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                InputProps={{
                  startAdornment: (
                    <StyledInputAdornment position="end">
                      days
                    </StyledInputAdornment>
                  ),
                }}
                value={term}
                onChange={(e) => handleChange(e)}
              />
            </Header>
            <StyledSlider
              name="termSlider"
              aria-label="Volume"
              value={term}
              step={1}
              marks
              min={7}
              max={30}
              onChange={(e) => handleChange(e)}
              sx={{
                color: 'white',
              }}
            />
          </InputGroup>

          {
            <Table>
              <tbody>
                <tr>
                  <td>Monthly payment:</td>
                  <td>
                    {
                      /*Math.round(data?.monthlyPayment as number)*/ data?.monthlyPayment
                    }
                  </td>
                </tr>
                <tr>
                  <td>Term</td>
                  <td>{data?.term}</td>
                </tr>
                <tr>
                  <td>Cost of Credit:</td>
                  <td>{data?.totalCostOfCredit}</td>
                </tr>
                <tr>
                  <td>Principal:</td>
                  <td>{data?.totalPrincipal}</td>
                </tr>
                <tr>
                  <td>Total Repayable Amount:</td>
                  <td>{data?.totalRepayableAmount}</td>
                </tr>
              </tbody>
            </Table>
          }
        </span>
        <Button color="secondary" variant="contained">
          Call to Action
        </Button>
      </Wrapper>
    </Main>
  )
}

export default App
