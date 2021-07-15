import React from 'react'

import HomeSvg from '../assets/home.svg'
import CarSvg from '../assets/car.svg'
import PeopleSvg from '../assets/people.svg'

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Home } from '../screens/Home'
import { MyCars } from '../screens/MyCars'

import { AppStackRoutes } from './app.stack.routes'
import { useTheme } from 'styled-components'
import { Platform } from 'react-native'

const { Navigator, Screen } = createBottomTabNavigator()

export function AppTabRoutes() {
  const theme = useTheme()

  return (
    <Navigator
      tabBarOptions={{
        activeTintColor: theme.colors.main,
        inactiveTintColor: theme.colors.text_detail,
        showLabel: false,
        style: {
          paddingVertical: Platform.OS === 'ios' ? 20 : 0,
          height: 78,
          backgroundColor: theme.colors.background_primary
        }
      }}
    >
      <Screen
        component={AppStackRoutes}
        name="Home"
        options={{
          tabBarIcon: ({ color }) => (
            <HomeSvg color={color} width={24} height={24} fill={color} />
          )
        }}
      />
      <Screen
        component={Home}
        name="Profile"
        options={{
          tabBarIcon: ({ color }) => (
            <PeopleSvg color={color} width={24} height={24} fill={color} />
          )
        }}
      />
      <Screen
        component={MyCars}
        name="MyCars"
        options={{
          tabBarIcon: ({ color }) => (
            <CarSvg color={color} width={24} height={24} fill={color} />
          )
        }}
      />
    </Navigator>
  )
}
