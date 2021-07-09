import React, { useState, useRef } from 'react'
import { FlatList, ViewToken } from 'react-native'
import { Bullet } from '../Bullet'

import { Container, ImageIndexes, CarImageWrapper, CarImage } from './styles'

interface Props {
  imagesUrls: string[]
}

interface ChangeImageProps {
  viewableItems: ViewToken[]
  changed: ViewToken[]
}

export function ImageSlider({ imagesUrls }: Props): JSX.Element {
  const [imageIndex, setImageIndex] = useState(0)

  const indexChange = useRef((info: ChangeImageProps) => {
    setImageIndex(info.viewableItems[0].index!)
  })

  return (
    <Container>
      <ImageIndexes>
        {imagesUrls.map((_, index) => (
          <Bullet active={imageIndex === index} key={String(index)} />
        ))}
      </ImageIndexes>

      <FlatList
        data={imagesUrls}
        keyExtractor={key => key}
        renderItem={({ item }) => (
          <CarImageWrapper>
            <CarImage source={{ uri: item }} resizeMode="contain" />
          </CarImageWrapper>
        )}
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        onViewableItemsChanged={indexChange.current}
      />
    </Container>
  )
}
