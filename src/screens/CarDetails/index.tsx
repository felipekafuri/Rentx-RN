import React from 'react'

import { Accessory } from '../../components/Accessory'
import { BackButton } from '../../components/BackButton'
import { ImageSlider } from '../../components/ImageSlider'

import SpeedSvg from '../../assets/speed.svg'
import AccelerateSvg from '../../assets/acceleration.svg'
import ForceSvg from '../../assets/force.svg'
import GasolineSvg from '../../assets/gasoline.svg'
import ExchangeSvg from '../../assets/exchange.svg'
import PeopleSvg from '../../assets/people.svg'

import {
  About,
  AccessoriesContainer,
  Brand,
  CarImages,
  Container,
  Content,
  Description,
  Details,
  Header,
  Name,
  Period,
  Price,
  Rent,
  Footer
} from './styles'
import { Button } from '../../components/Button'
import { useTheme } from 'styled-components/native'
import { useNavigation } from '@react-navigation/native'

export function CarDetails() {
  const theme = useTheme()
  const { goBack, navigate } = useNavigation()

  function handleSchedule() {
    navigate('Scheduling')
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
        <About>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nulla sint
          excepturi sapiente a laboriosam laborum, nesciunt distinctio eaque
          enim temporibus amet fuga labore qui officia doloribus. Voluptatibus
          placeat explicabo illum.
        </About>
      </Content>

      <Footer>
        <Button title="Escolher período do aluguel" onPress={handleSchedule} />
      </Footer>
    </Container>
  )
}
