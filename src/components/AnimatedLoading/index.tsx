import React from 'react'

import LottieView from 'lottie-react-native'

import loadingCar from '../../assets/load_animation.json'

import { Container } from './styles'

export function AnimatedLoading() {
  return (
    <Container>
      <LottieView source={loadingCar} autoPlay resizeMode="contain" loop />
    </Container>
  )
}
