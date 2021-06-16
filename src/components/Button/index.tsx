import React from 'react'
import { RectButtonProps } from 'react-native-gesture-handler'

import { Container, ButtonText } from './styles'

interface Props extends RectButtonProps {
  title: string
  color?: string
}

export function Button({ title, color, ...rest }: Props) {
  return (
    <Container color={color} {...rest}>
      <ButtonText>{title}</ButtonText>
    </Container>
  )
}
