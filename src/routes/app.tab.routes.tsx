import React from 'react'
import { Platform } from 'react-native'
import { useTheme } from 'styled-components'

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import CarSvg from '../assets/car.svg'
import HomeSvg from '../assets/home.svg'
import PeopleSvg from '../assets/people.svg'
import { Home } from '../screens/Home'
import { MyCars } from '../screens/MyCars'
import { Profile } from '../screens/Profile'
import { AppStackRoutes } from './app.stack.routes'

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
        component={MyCars}
        name="MyCars"
        options={{
          tabBarIcon: ({ color }) => (
            <CarSvg color={color} width={24} height={24} fill={color} />
          )
        }}
      />
      <Screen
        component={Profile}
        name="Profile"
        options={{
          tabBarIcon: ({ color }) => (
            <PeopleSvg color={color} width={24} height={24} fill={color} />
          )
        }}
      />
    </Navigator>
  )
}
