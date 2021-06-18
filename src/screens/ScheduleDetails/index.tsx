import React from 'react'
import { useTheme } from 'styled-components/native'

import { Feather } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'

import AccelerateSvg from '../../assets/acceleration.svg'
import ExchangeSvg from '../../assets/exchange.svg'
import ForceSvg from '../../assets/force.svg'
import GasolineSvg from '../../assets/gasoline.svg'
import PeopleSvg from '../../assets/people.svg'
import SpeedSvg from '../../assets/speed.svg'
import { Accessory } from '../../components/Accessory'
import { BackButton } from '../../components/BackButton'
import { Button } from '../../components/Button'
import { ImageSlider } from '../../components/ImageSlider'
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

export function ScheduleDetails() {
  const theme = useTheme()
  const { goBack, navigate } = useNavigation()

  function handleConfirmRental() {
    navigate('ScheduleComplete')
  }

  return (
    <Container>
      <Header>
        <BackButton onPress={goBack} />
      </Header>

      <CarImages>
        <ImageSlider
          imagesUrls={[
            'https://images.dealer.com/ddc/vehicles/2020/Audi/S5/Hatchback/perspective/front-left/2020_24.png'
          ]}
        />
      </CarImages>

      <Content>
        <Details>
          <Description>
            <Brand>Audi</Brand>
            <Name>RS 5 coupé</Name>
          </Description>

          <Rent>
            <Period>Ao dia</Period>
            <Price>R$ 500</Price>
          </Rent>
        </Details>
        <AccessoriesContainer>
          <Accessory name="380Km/h" icon={SpeedSvg} />
          <Accessory name="3.2s" icon={AccelerateSvg} />
          <Accessory name="220hp" icon={ForceSvg} />
          <Accessory name="Gasolina" icon={GasolineSvg} />
          <Accessory name="Auto" icon={ExchangeSvg} />
          <Accessory name="5 pessoas" icon={PeopleSvg} />
        </AccessoriesContainer>

        <RentalPeriod>
          <CalendarIcon>
            <Feather name="calendar" size={24} color={theme.colors.shape} />
          </CalendarIcon>

          <DateInfo>
            <DateTitle>DE</DateTitle>
            <DateValue>18/06/2021</DateValue>
          </DateInfo>

          <Feather name="chevron-right" size={15} color={theme.colors.text} />

          <DateInfo>
            <DateTitle>ATÉ</DateTitle>
            <DateValue>18/06/2021</DateValue>
          </DateInfo>
        </RentalPeriod>
        <RentalPrice>
          <RentalPriceLabel>TOTAL</RentalPriceLabel>
          <RentalPriceDetail>
            <RentalPriceQuota>R$ 580 x3 diárias</RentalPriceQuota>
            <RentalPriceTotal>R$ 2.900</RentalPriceTotal>
          </RentalPriceDetail>
        </RentalPrice>
      </Content>

      <Footer>
        <Button
          title="Alugar Agora"
          onPress={handleConfirmRental}
          color={theme.colors.success}
        />
      </Footer>
    </Container>
  )
}
