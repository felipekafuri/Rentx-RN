import AppLoading from 'expo-app-loading'
import React from 'react'
import { ThemeProvider } from 'styled-components'

import {
  Archivo_400Regular,
  Archivo_500Medium,
  Archivo_600SemiBold
} from '@expo-google-fonts/archivo'
import {
  Inter_400Regular,
  Inter_500Medium,
  useFonts
} from '@expo-google-fonts/inter'

import { CarDetails } from './src/screens/CarDetails'
import { Home } from './src/screens/Home'
import { Scheduling } from './src/screens/Scheduling'
import theme from './src/styles/theme'

export default function App() {
  const [fontsLoaded] = useFonts({
    Archivo_400Regular,
    Archivo_500Medium,
    Archivo_600SemiBold,
    Inter_400Regular,
    Inter_500Medium
  })

  if (!fontsLoaded) {
    return <AppLoading />
  }

  return (
    <ThemeProvider theme={theme}>
      <Scheduling />
    </ThemeProvider>
  )
}
