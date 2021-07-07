import React, { useState } from 'react'
import { TextInputProps } from 'react-native'
import { useTheme } from 'styled-components'

import { Feather } from '@expo/vector-icons'

import { Container, IconContainer, InputText } from './styles'

interface Props extends TextInputProps {
  iconName: React.ComponentProps<typeof Feather>['name']
  value?: string
}

export function Input({ iconName, value, ...rest }: Props) {
  const theme = useTheme()

  const [isFocused, setIsFocused] = useState(false)
  const [isFilled, setIsFilled] = useState(false)

  function handleInputFocused() {
    setIsFocused(true)
  }

  function handleInputBlur() {
    setIsFocused(false)
    setIsFilled(!!value)
  }

  return (
    <Container isFocused={isFocused}>
      <IconContainer>
        <Feather
          size={24}
          name={iconName}
          color={
            isFocused || isFilled ? theme.colors.main : theme.colors.text_detail
          }
        />
      </IconContainer>
      <InputText
        {...rest}
        onFocus={handleInputFocused}
        onBlur={handleInputBlur}
      />
    </Container>
  )
}
