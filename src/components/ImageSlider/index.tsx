import React, { useState, useRef } from 'react'
import { FlatList, ViewToken } from 'react-native'
import { Bullet } from '../Bullet'

import { Container, ImageIndexes, CarImageWrapper, CarImage } from './styles'

interface Props {
  imagesUrls: {
    id: string
    photo: string
  }[]
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
        {imagesUrls.map((item, index) => (
          <Bullet active={imageIndex === index} key={String(index)} />
        ))}
      </ImageIndexes>

      <FlatList
        data={imagesUrls}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <CarImageWrapper>
            <CarImage source={{ uri: item.photo }} resizeMode="contain" />
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
