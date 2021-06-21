import React, { useEffect, useState } from 'react'
import { StatusBar } from 'react-native'
import { RFValue } from 'react-native-responsive-fontsize'

import { useNavigation } from '@react-navigation/native'

import Logo from '../../assets/logo.svg'
import { CarCard } from '../../components/CarCard'
import { Car } from '../../dtos/CarDTO'
import { api } from '../../services/api'
import { CarData, Container, Header, HeaderContent, TotalCars } from './styles'
import { Load } from '../../components/Load'

export function Home() {
  const { navigate } = useNavigation()
  const [cars, setCars] = useState<Car[]>([])
  const [loading, setLoading] = useState(true)

  function handleCarDetail(car_id: string) {
    navigate('CarDetails', { car_id })
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
            <CarCard data={item} onPress={() => handleCarDetail(item.id)} />
          )}
        />
      )}
    </Container>
  )
}
