import React from 'react'
import { BackButton } from '../../components/BackButton'
import { ImageSlider } from '../../components/ImageSlider'

import { Container, Header, CarImages } from './styles'

export function CarDetails() {
  return (
    <Container>
      <Header>
        <BackButton />
      </Header>

      <CarImages>
        <ImageSlider
          imagesUrls={[
            'https://images.dealer.com/ddc/vehicles/2020/Audi/S5/Hatchback/perspective/front-left/2020_24.png'
          ]}
        />
      </CarImages>
    </Container>
  )
}
