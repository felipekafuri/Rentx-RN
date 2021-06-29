import React, { useEffect, useState } from 'react'
import { FlatList } from 'react-native'
import { useTheme } from 'styled-components'

import { AntDesign } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'

import { BackButton } from '../../components/BackButton'
import { CarCard } from '../../components/CarCard'
import { Car } from '../../dtos/CarDTO'
import { api } from '../../services/api'
import {
  Appointments,
  AppointmentsQuantity,
  AppointmentsTitle,
  Container,
  Content,
  Header,
  Subtitle,
  Title,
  CarWrapper,
  CarFooter,
  CarFooterTitle,
  CarFooterPeriod,
  CarFooterDate
} from './styles'

interface CarProps {
  car: Car
  user_id: string
  id: string
  startDate: string
  endDate: string
}

export function MyCars() {
  const [cars, setCars] = useState<CarProps[]>([])
  const [loading, setLoading] = useState(false)

  const { goBack } = useNavigation()

  const theme = useTheme()

  async function loadCars() {
    try {
      setLoading(true)
      const response = await api.get('/schedules_byuser?user_id=1')
      setCars(response.data)
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadCars()
  }, [])

  return (
    <Container>
      <Header>
        <BackButton color={theme.colors.shape} onPress={goBack} />
        <Title>
          Escolha uma{'\n'}
          data de início e{'\n'}
          fim do aluguel
        </Title>
        <Subtitle>Conforto, segurança e praticidade</Subtitle>
      </Header>

      <Content>
        <Appointments>
          <AppointmentsTitle>Agendamentos fetios</AppointmentsTitle>

          <AppointmentsQuantity>{cars.length}</AppointmentsQuantity>
        </Appointments>

        <FlatList
          data={cars}
          keyExtractor={item => item.car.id}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <CarWrapper>
              <CarCard data={item.car} />
              <CarFooter>
                <CarFooterTitle>PERÍODO</CarFooterTitle>

                <CarFooterPeriod>
                  <CarFooterDate>{item.startDate}</CarFooterDate>
                  <AntDesign
                    size={20}
                    name="arrowright"
                    color={theme.colors.title}
                    style={{
                      marginHorizontal: 10
                    }}
                  />
                  <CarFooterDate>{item.endDate}</CarFooterDate>
                </CarFooterPeriod>
              </CarFooter>
            </CarWrapper>
          )}
        />
      </Content>
    </Container>
  )
}
