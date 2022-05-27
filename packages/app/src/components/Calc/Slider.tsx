import React, { ChangeEvent } from 'react'
import { StyledSlider } from '../'

type SliderProps = {
  name: string
  value: number
  handleChangeCommitted: (e: Event | React.DragEvent | ChangeEvent) => void
  handleChange: (e: Event) => void
  step: number
  min: number
  max: number
}

export const Slider = (props: SliderProps) => (
  <StyledSlider
    name={props.name}
    value={props.value}
    step={props.step}
    marks
    min={props.min}
    max={props.max}
    onChange={(e: any) => props.handleChange(e)}
    onChangeCommitted={(e: any) => props.handleChangeCommitted(e)}
    sx={{
      color: 'white',
    }}
  />
)
