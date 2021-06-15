import React from 'react'
import { StatusBar } from 'react-native'
import { RFValue } from 'react-native-responsive-fontsize'

import Logo from '../../assets/logo.svg'
import { CarCard } from '../../components/CarCard'
import { Container, Header, TotalCars, HeaderContent, CarData } from './styles'

export function Home() {
  const data = {
    brand: 'audi',
    name: 'RS 5 Coupé',
    rent: {
      period: 'ao dia',
      price: 120
    },
    thumbnail:
      'https://images.dealer.com/ddc/vehicles/2020/Audi/S5/Hatchback/perspective/front-left/2020_24.png'
  }

  return (
    <Container>
      <StatusBar
        barStyle="light-content"
        translucent
        backgroundColor="transparent"
      />
      <Header>
        <HeaderContent>
          <Logo width={RFValue(108)} height={RFValue(12)} />

          <TotalCars>Total de 12 carros</TotalCars>
        </HeaderContent>
      </Header>

      <CarData
        data={[1, 2, 3]}
        keyExtractor={item => String(item)}
        renderItem={({ item }) => <CarCard data={data} />}
      />
    </Container>
  )
}
