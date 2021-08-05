import { format } from 'date-fns'
import React, { useEffect, useState } from 'react'
import { Alert } from 'react-native'
import { useTheme } from 'styled-components/native'

import { Feather } from '@expo/vector-icons'
import { useNavigation, useRoute } from '@react-navigation/native'

import { Accessory } from '../../components/Accessory'
import { BackButton } from '../../components/BackButton'
import { Button } from '../../components/Button'
import { ImageSlider } from '../../components/ImageSlider'
import { api } from '../../services/api'
import { getAccessoryIcon } from '../../utils/getAccessoryIcon'
import { getPlatformDate } from '../../utils/getPlatformDate'
import { useNetInfo } from '@react-native-community/netinfo'
import { Car as CarDTO } from '../../dtos/CarDTO'
import {
  AccessoriesContainer,
  Brand,
  CalendarIcon,
  CarImages,
  Container,
  Content,
  DateInfo,
  DateTitle,
  DateValue,
  Description,
  Details,
  Footer,
  Header,
  Name,
  Period,
  Price,
  Rent,
  RentalPeriod,
  RentalPrice,
  RentalPriceDetail,
  RentalPriceLabel,
  RentalPriceQuota,
  RentalPriceTotal
} from './styles'

interface Params {
  car: CarDTO
  dates: string[]
}
interface RentalPeriod {
  start: string
  end: string
}

export function ScheduleDetails() {
  const [rentalPeriod, setRentalPeriod] = useState<RentalPeriod>(
    {} as RentalPeriod
  )
  const [carUpdate, setCarUpdate] = useState<CarDTO>({} as CarDTO)
  const [loading, setLoading] = useState(false)

  const netInfo = useNetInfo()

  const theme = useTheme()
  const { goBack, navigate } = useNavigation()

  const route = useRoute()
  const { car, dates } = route.params as Params

  const rentalTotal = Number(dates.length * car.price)

  async function handleConfirmRental() {
    setLoading(true)
    await api
      .post(`/rentals`, {
        car_id: car.id,
        user_id: 1,
        start_date: new Date(dates[0]),
        end_date: new Date(dates[dates.length - 1]),
        total: rentalTotal
      })
      .then(() => {
        navigate('Confirmation', {
          title: 'Carro alugado!',
          message: `Agora você só precisa ir\naté a concessionária da RENTX\n pegar o seu automóvel.`,
          nextScreenName: 'Home'
        })
        setLoading(false)
      })
      .catch(() => {
        Alert.alert('Não foi possível confirmar o agendamento')
        setLoading(false)
      })
  }

  useEffect(() => {
    setRentalPeriod({
      start: format(getPlatformDate(new Date(dates[0])), 'dd/MM/yyy'),
      end: format(
        getPlatformDate(new Date(dates[dates.length - 1])),
        'dd/MM/yyy'
      )
    })
  }, [dates])

  useEffect(() => {
    async function fetchOnlineData() {
      const response = await api.get(`cars/${car.id}`)
      setCarUpdate(response.data)
    }

    if (netInfo.isConnected === true) {
      fetchOnlineData()
    }
  }, [car.id, netInfo.isConnected])

  return (
    <Container>
      <Header>
        <BackButton onPress={goBack} />
      </Header>

      <CarImages>
        <ImageSlider
          imagesUrls={
            carUpdate.photos
              ? carUpdate.photos
              : [{ id: car.thumbnail, photo: car.thumbnail }]
          }
        />
      </CarImages>

      <Content>
        <Details>
          <Description>
            <Brand>{car.brand}</Brand>
            <Name>{car.name}</Name>
          </Description>

          <Rent>
            <Period>{car.period}</Period>
            <Price>R$ {car.price}</Price>
          </Rent>
        </Details>

        {carUpdate.accessories && (
          <AccessoriesContainer>
            {carUpdate.accessories.map(accessory => (
              <Accessory
                key={accessory.type}
                name={accessory.name}
                icon={getAccessoryIcon(accessory.type)}
              />
            ))}
          </AccessoriesContainer>
        )}

        <RentalPeriod>
          <CalendarIcon>
            <Feather name="calendar" size={24} color={theme.colors.shape} />
          </CalendarIcon>

          <DateInfo>
            <DateTitle>DE</DateTitle>
            <DateValue>{rentalPeriod.start}</DateValue>
          </DateInfo>

          <Feather name="chevron-right" size={15} color={theme.colors.text} />

          <DateInfo>
            <DateTitle>ATÉ</DateTitle>
            <DateValue>{rentalPeriod.end}</DateValue>
          </DateInfo>
        </RentalPeriod>
        <RentalPrice>
          <RentalPriceLabel>TOTAL</RentalPriceLabel>
          <RentalPriceDetail>
            <RentalPriceQuota>{`R$ ${car.price} x${dates.length} diárias`}</RentalPriceQuota>
            <RentalPriceTotal>R$ {rentalTotal}</RentalPriceTotal>
          </RentalPriceDetail>
        </RentalPrice>
      </Content>

      <Footer>
        <Button
          title="Alugar Agora"
          onPress={handleConfirmRental}
          color={theme.colors.success}
          loading={loading}
          enabled={!loading}
        />
      </Footer>
    </Container>
  )
}
