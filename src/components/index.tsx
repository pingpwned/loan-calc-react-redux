import styled from 'styled-components'
import Slider from '@mui/material/Slider'
import TextField from '@mui/material/TextField'
import InputAdornment from '@mui/material/InputAdornment'

import { Slider as CalcSlider } from './Calc/Slider'

export const MySlider = CalcSlider

export const Main = styled.main`
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`
export const Wrapper = styled.div`
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
export const StyledSlider = styled(Slider)`
  max-width: 350px;
`
export const InputGroup = styled.div``
export const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`
export const Title = styled.div``
export const StyledTextField = styled(TextField)`
  max-width: 100px;
`
export const StyledInputAdornment = styled(InputAdornment)`
  justify-content: flex-end;
  position: absolute;
  width: 100%;
  right: 15px;
`
export const Table = styled.table`
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
