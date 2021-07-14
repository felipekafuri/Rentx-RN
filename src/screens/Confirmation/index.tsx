import React from 'react'
import LogoSvg from '../../assets/logo_background_gray.svg'
import DoneSvg from '../../assets/done.svg'

import { Container, Content, Title, Message, Footer } from './styles'
import { StatusBar, useWindowDimensions } from 'react-native'
import { ConfirmButton } from '../../components/ConfirmButton'
import { useNavigation, useRoute } from '@react-navigation/native'

interface Params {
  title: string
  message: string
  nextScreenName: string
}

export function Confirmation() {
  const { width } = useWindowDimensions()
  const { navigate } = useNavigation()

  const { params } = useRoute()
  const { title, message, nextScreenName } = params as Params

  function handleNavigateBack() {
    navigate(nextScreenName)
  }

  return (
    <Container>
      <StatusBar
        barStyle="light-content"
        translucent
        backgroundColor="transparent"
      />
      <LogoSvg width={width} />

      <Content>
        <DoneSvg width={80} height={80} />

        <Title>{title}</Title>
        <Message>{message}</Message>
      </Content>

      <Footer>
        <ConfirmButton title="OK!" onPress={handleNavigateBack} />
      </Footer>
    </Container>
  )
}
