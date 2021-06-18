import React from 'react'
import { useTheme } from 'styled-components'
import { BackButton } from '../../components/BackButton'

import ArrowSvg from '../../assets/arrow.svg'

import {
  Container,
  Header,
  Title,
  RentalPeriod,
  DateInfo,
  DateValue,
  DateTitle,
  Content,
  Footer
} from './styles'
import { StatusBar } from 'react-native'
import { Button } from '../../components/Button'
import { Calendar } from '../../components/Calendar'
import { useNavigation } from '@react-navigation/native'

export function Scheduling() {
  const theme = useTheme()
  const { goBack, navigate } = useNavigation()

  function handleConfirmDate() {
    navigate('ScheduleDetails')
  }

  return (
    <Container>
      <StatusBar
        barStyle="light-content"
        translucent
        backgroundColor="transparent"
      />
      <Header>
        <BackButton color={theme.colors.shape} onPress={goBack} />
        <Title>
          Escolha uma{'\n'}
          data de início e{'\n'}
          fim do aluguel
        </Title>

        <RentalPeriod>
          <DateInfo>
            <DateTitle>DE</DateTitle>
            <DateValue selected={true}>18 Julho 2021</DateValue>
          </DateInfo>

          <ArrowSvg />

          <DateInfo>
            <DateTitle>ATÉ</DateTitle>
            <DateValue selected={false}>18 Julho 2021</DateValue>
          </DateInfo>
        </RentalPeriod>
      </Header>

      <Content>
        <Calendar />
      </Content>

      <Footer>
        <Button title="Confirmar" onPress={handleConfirmDate}></Button>
      </Footer>
    </Container>
  )
}
