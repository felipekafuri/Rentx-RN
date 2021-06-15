import React from 'react'

import {
  Container,
  ImageIndexes,
  ImageIndex,
  CarImageWrapper,
  CarImage
} from './styles'

interface Props {
  imagesUrls: string[]
}

export function ImageSlider({ imagesUrls }: Props) {
  return (
    <Container>
      <ImageIndexes>
        <ImageIndex active={true} />
        <ImageIndex active={false} />
        <ImageIndex active={false} />
        <ImageIndex active={false} />
      </ImageIndexes>

      <CarImageWrapper>
        <CarImage source={{ uri: imagesUrls[0] }} resizeMode="contain" />
      </CarImageWrapper>
    </Container>
  )
}
