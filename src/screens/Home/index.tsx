import React, { useEffect, useState } from 'react'
import { StatusBar } from 'react-native'
import { RFValue } from 'react-native-responsive-fontsize'

import { Ionicons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'

import Logo from '../../assets/logo.svg'
import { CarCard } from '../../components/CarCard'
import { Load } from '../../components/Load'
import { Car } from '../../dtos/CarDTO'
import { api } from '../../services/api'
import {
  CarData,
  Container,
  Header,
  HeaderContent,
  MyCarsButton,
  TotalCars
} from './styles'
import { useTheme } from 'styled-components'

export function Home() {
  const { navigate } = useNavigation()
  const [cars, setCars] = useState<Car[]>([])
  const [loading, setLoading] = useState(true)

  const theme = useTheme()

  function handleCarDetail(car: Car) {
    navigate('CarDetails', { car })
  }

  function handleMyCars() {
    navigate('MyCars')
  }

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await api.get('/cars')
        setCars(response.data)
      } catch (error) {
        console.log(error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
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

          <TotalCars>Total de 12 carros</TotalCars>
        </HeaderContent>
      </Header>
      {loading ? (
        <Load />
      ) : (
        <CarData
          data={cars}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <CarCard data={item} onPress={() => handleCarDetail(item)} />
          )}
        />
      )}

      <MyCarsButton onPress={handleMyCars}>
        <Ionicons name="ios-car-sport" size={32} color={theme.colors.shape} />
      </MyCarsButton>
    </Container>
  )
}
