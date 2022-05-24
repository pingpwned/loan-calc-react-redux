import React, { useState } from 'react'
import Button from '@mui/material/Button'
import { useSelector, useDispatch } from 'react-redux'
import { setAmount, setTerm, store } from '../../store/store'
import { useCalcDataQuery } from '../../services/useCalc'

import {
  Main,
  Wrapper,
  InputGroup,
  Header,
  Title,
  StyledTextField,
  StyledInputAdornment,
  Table,
} from '../'

import { MySlider as Slider } from '../'
import { useApi } from '../../services/useApi'

export const Calc = () => {
  const [sliderAmount, setSliderAmount] = useState(400)
  const [sliderTerm, setSliderTerm] = useState(15)
  const { amount, term } = useSelector(
    (state: typeof store) => store.getState().calcStore,
  )
  const dispatch = useDispatch()
  const { intervals, loading } = useApi()
  const { data } = useCalcDataQuery([amount, term])

  const handleAmountInput = () => {
    dispatch(setAmount(sliderAmount))
  }
  const handleTermInput = () => {
    dispatch(setTerm(sliderTerm))
  }

  return (
    <Main>
      <Wrapper>
        {!loading ? (
          <>
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
                    value={sliderAmount}
                    onChange={handleAmountInput}
                  />
                </Header>
                <Slider
                  name="amountSlider"
                  value={sliderAmount}
                  step={intervals?.amountInterval?.step || 1}
                  min={intervals?.amountInterval?.min || 0}
                  max={intervals?.amountInterval?.max || 10}
                  handleChange={(e: Event) =>
                    setSliderAmount(
                      parseInt((e.target as HTMLInputElement).value, 10),
                    )
                  }
                  handleMouse={handleAmountInput}
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
                    value={sliderTerm}
                    onChange={(e: any) => dispatch(setAmount(sliderAmount))}
                  />
                </Header>
                <Slider
                  name="termSlider"
                  value={sliderTerm}
                  step={intervals?.termInterval?.step || 1}
                  min={intervals?.termInterval?.min || 0}
                  max={intervals?.termInterval?.max || 10}
                  handleChange={(e: Event) =>
                    setSliderTerm(
                      parseInt((e.target as HTMLInputElement).value, 10),
                    )
                  }
                  handleMouse={handleTermInput}
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
                      <td>{data?.totalCost}</td>
                    </tr>
                    <tr>
                      <td>Principal:</td>
                      <td>{data?.total}</td>
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
          </>
        ) : (
          <h1>Loading</h1>
        )}
      </Wrapper>
    </Main>
  )
}
