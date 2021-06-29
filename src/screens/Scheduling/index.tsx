import { format } from 'date-fns'
import React, { useState } from 'react'
import { Alert, StatusBar } from 'react-native'
import { useTheme } from 'styled-components'

import { useNavigation, useRoute } from '@react-navigation/native'

import ArrowSvg from '../../assets/arrow.svg'
import { BackButton } from '../../components/BackButton'
import { Button } from '../../components/Button'
import {
  Calendar,
  DayProps,
  generateInterval,
  MarkedDateProps
} from '../../components/Calendar'
import { Car } from '../../dtos/CarDTO'
import { getPlatformDate } from '../../utils/getPlatformDate'
import {
  Container,
  Content,
  DateInfo,
  DateTitle,
  DateValue,
  Footer,
  Header,
  RentalPeriod,
  Title
} from './styles'

interface RentalPeriod {
  startFormatted: string
  endFormatted: string
}

interface Params {
  car: Car
}

export function Scheduling() {
  const [lastSelectedDate, setLastSelectedDate] = useState<DayProps>(
    {} as DayProps
  )
  const [markedDate, setMarkedDate] = useState<MarkedDateProps>(
    {} as MarkedDateProps
  )

  const [rentalPeriod, setRentalPeriod] = useState<RentalPeriod>()

  const theme = useTheme()
  const { goBack, navigate } = useNavigation()

  const route = useRoute()
  const { car } = route.params as Params

  function handleConfirmDate() {
    if (!rentalPeriod?.startFormatted || !rentalPeriod?.endFormatted) {
      Alert.alert('Selecione o intervalo para alugar.')
    } else {
      navigate('ScheduleDetails', {
        car,
        dates: Object.keys(markedDate)
      })
    }
  }

  function handleChangeDate(date: DayProps) {
    let start = !lastSelectedDate.timestamp ? date : lastSelectedDate
    let end = date

    if (start.timestamp > end.timestamp) {
      start = end
      end = start
    }

    setLastSelectedDate(end)
    const interval = generateInterval(start, end)
    setMarkedDate(interval)

    const firstDate = Object.keys(interval)[0]
    const endDate = Object.keys(interval)[Object.keys(interval).length - 1]

    setRentalPeriod({
      startFormatted: format(
        getPlatformDate(new Date(firstDate)),
        'dd/MM/yyyy'
      ),
      endFormatted: format(getPlatformDate(new Date(endDate)), 'dd/MM/yyyy')
    })
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
            <DateValue selected={!!rentalPeriod?.startFormatted}>
              {rentalPeriod?.startFormatted}
            </DateValue>
          </DateInfo>

          <ArrowSvg />

          <DateInfo>
            <DateTitle>ATÉ</DateTitle>
            <DateValue selected={!!rentalPeriod?.endFormatted}>
              {rentalPeriod?.endFormatted}
            </DateValue>
          </DateInfo>
        </RentalPeriod>
      </Header>

      <Content>
        <Calendar markedDates={markedDate} onDayPress={handleChangeDate} />
      </Content>

      <Footer>
        <Button
          title="Confirmar"
          onPress={handleConfirmDate}
          enabled={!!rentalPeriod?.startFormatted}
        />
      </Footer>
    </Container>
  )
}
