import React, { useState, useEffect } from 'react'
import { StatusBar, FlatList } from 'react-native'
import { useTheme } from 'styled-components'
import { useNavigation } from '@react-navigation/core'
import { AntDesign } from '@expo/vector-icons'
import { parseISO, format } from 'date-fns'

import { BackButton } from '../../components/BackButton'
import { AnimatedLoading } from '../../components/AnimatedLoading'

import { Car } from '../../components/Car'
import { Car as CarDTO } from '../../dtos/CarDTO'
import { Car as ModelCar } from '../../databases/models/Car'
import { api } from '../../services/api'

import {
  Container,
  Header,
  Title,
  SubTitle,
  Content,
  Appointments,
  AppointmentsTitle,
  AppointmentsQuantity,
  CarWrapper,
  CarFooter,
  CarFooterTitle,
  CarFooterPeriod,
  CarFooterDate
} from './styles'
import { useIsFocused } from '@react-navigation/native'

interface CarProps {
  id: string
  user_id: string
  car: CarDTO
  startDate: string
  endDate: string
}

interface DataProps {
  id: string
  car: ModelCar
  start_date: string
  end_date: string
}

export function MyCars() {
  const [cars, setCars] = useState<DataProps[]>([])
  const [loading, setLoading] = useState(true)

  const navigation = useNavigation()
  const theme = useTheme()

  const isFocused = useIsFocused()

  function handleBack() {
    navigation.goBack()
  }

  useEffect(() => {
    async function fetchCars() {
      try {
        const response = await api.get('/rentals')
        const dataFormatted = response.data.map((data: DataProps) => {
          return {
            car: data.car,
            start_date: format(parseISO(data.start_date), 'dd/MM/yyyy'),
            end_date: format(parseISO(data.end_date), 'dd/MM/yyyy')
          }
        })
        setCars(dataFormatted)
      } catch (error) {
        console.log(error)
      } finally {
        setLoading(false)
      }
    }

    fetchCars()
  }, [isFocused])

  return (
    <Container>
      <Header>
        <StatusBar
          barStyle="light-content"
          translucent
          backgroundColor="transparent"
        />

        <Title>
          Escolha uma {'\n'}
          data de início e {'\n'}
          fim do aluguel
        </Title>

        <SubTitle>Conforto, segurança e praticidade.</SubTitle>
      </Header>
      {loading ? (
        <AnimatedLoading />
      ) : (
        <Content>
          <Appointments>
            <AppointmentsTitle>Agendamentos feitos</AppointmentsTitle>
            <AppointmentsQuantity>{cars.length}</AppointmentsQuantity>
          </Appointments>

          <FlatList
            data={cars}
            keyExtractor={item => String(item.id)}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => (
              <CarWrapper>
                <Car data={item.car} />
                <CarFooter>
                  <CarFooterTitle>Período</CarFooterTitle>
                  <CarFooterPeriod>
                    <CarFooterDate>{item.start_date}</CarFooterDate>
                    <AntDesign
                      name="arrowright"
                      size={20}
                      color={theme.colors.title}
                      style={{ marginHorizontal: 10 }}
                    />
                    <CarFooterDate>{item.end_date}</CarFooterDate>
                  </CarFooterPeriod>
                </CarFooter>
              </CarWrapper>
            )}
          />
        </Content>
      )}
    </Container>
  )
}
