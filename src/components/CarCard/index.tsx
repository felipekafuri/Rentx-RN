import React from 'react'

import {
  Container,
  Detail,
  Brand,
  Name,
  About,
  Rent,
  Period,
  Price,
  Type,
  CarImage
} from './styles'

import GasolineSvg from '../../assets/gasoline.svg'
import { RectButtonProps } from 'react-native-gesture-handler'
import { Car } from '../../dtos/CarDTO'

interface Props extends RectButtonProps {
  data: Car
}

export function CarCard({ data, ...rest }: Props) {
  return (
    <Container {...rest}>
      <Detail>
        <Brand>{data.brand}</Brand>

        <Name>{data.name}</Name>

        <About>
          <Rent>
            <Period>{data.period}</Period>
            <Price>{`R$ ${data.price}`}</Price>
          </Rent>

          <Type>
            <GasolineSvg />
          </Type>
        </About>
      </Detail>

      <CarImage
        source={{
          uri: data.thumbnail
        }}
        resizeMode="contain"
      />
    </Container>
  )
}
