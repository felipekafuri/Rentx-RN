import React from 'react'
import { ActivityIndicator } from 'react-native'
import { RectButtonProps } from 'react-native-gesture-handler'
import { useTheme } from 'styled-components'

import { Container, ButtonText } from './styles'

interface Props extends RectButtonProps {
  title: string
  color?: string
  loading?: boolean
  light?: boolean
}

export function Button({
  title,
  color,
  enabled = true,
  loading = false,
  light = false,
  ...rest
}: Props) {
  const theme = useTheme()

  return (
    <Container
      color={color}
      enabled={enabled}
      style={{ opacity: enabled === false || loading === true ? 0.5 : 1 }}
      {...rest}
    >
      {loading ? (
        <ActivityIndicator color={theme.colors.shape} />
      ) : (
        <ButtonText light={light}>{title}</ButtonText>
      )}
    </Container>
  )
}
