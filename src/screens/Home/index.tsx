import React, { useEffect, useState } from 'react'
import { BackHandler, StatusBar, StyleSheet } from 'react-native'
import { PanGestureHandler, RectButton } from 'react-native-gesture-handler'
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  useAnimatedGestureHandler,
  withSpring
} from 'react-native-reanimated'
import { RFValue } from 'react-native-responsive-fontsize'
import { useTheme } from 'styled-components'

import { Ionicons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'

import Logo from '../../assets/logo.svg'
import { CarCard } from '../../components/CarCard'
import { Car } from '../../dtos/CarDTO'
import { api } from '../../services/api'
import { CarData, Container, Header, HeaderContent, TotalCars } from './styles'
import { AnimatedLoading } from '../../components/AnimatedLoading'

const AnimatedRectButton = Animated.createAnimatedComponent(RectButton)

export function Home() {
  const { navigate } = useNavigation()
  const [cars, setCars] = useState<Car[]>([])
  const [loading, setLoading] = useState(true)

  const theme = useTheme()

  const positionY = useSharedValue(0)
  const positionX = useSharedValue(0)

  const mayCarsButtonStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: positionX.value },
        { translateY: positionY.value }
      ]
    }
  })

  const onGestureEvent = useAnimatedGestureHandler({
    onStart(_, ctx: any) {
      ctx.positionX = positionX.value
      ctx.positionY = positionY.value
    },
    onActive(e, ctx: any) {
      positionX.value = e.translationX + ctx.positionX
      positionY.value = e.translationY + ctx.positionY
    },
    onEnd() {
      positionX.value = withSpring(0)
      positionY.value = withSpring(0)
    }
  })

  function handleCarDetail(car: Car) {
    navigate('CarDetails', { car })
  }

  function handleMyCars() {
    navigate('MyCars')
  }

  useEffect(() => {
    let isMounted = true

    async function fetchData() {
      try {
        const response = await api.get('/cars')
        if (isMounted) {
          setCars(response.data)
        }
      } catch (error) {
        console.log(error)
      } finally {
        if (isMounted) {
          setLoading(false)
        }
      }
    }

    fetchData()

    return () => {
      isMounted = false
    }
  }, [])

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

          <TotalCars>Total de {cars.length} carros</TotalCars>
        </HeaderContent>
      </Header>
      {loading ? (
        <AnimatedLoading />
      ) : (
        <CarData
          data={cars}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <CarCard data={item} onPress={() => handleCarDetail(item)} />
          )}
        />
      )}

      <PanGestureHandler onGestureEvent={onGestureEvent}>
        <Animated.View
          style={[
            mayCarsButtonStyle,
            {
              position: 'absolute',
              bottom: 13,
              right: 22
            }
          ]}
        >
          <AnimatedRectButton
            onPress={handleMyCars}
            style={[styles.button, { backgroundColor: theme.colors.main }]}
          >
            <Ionicons
              name="ios-car-sport"
              size={32}
              color={theme.colors.shape}
            />
          </AnimatedRectButton>
        </Animated.View>
      </PanGestureHandler>
    </Container>
  )
}

const styles = StyleSheet.create({
  button: {
    width: 60,
    height: 60,
    borderRadius: 30,

    justifyContent: 'center',
    alignItems: 'center',

    position: 'absolute',
    bottom: 13,
    right: 22
  }
})
