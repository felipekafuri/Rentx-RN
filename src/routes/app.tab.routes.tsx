import React from 'react'

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Home } from '../screens/Home'
import { MyCars } from '../screens/MyCars'

import { AppStackRoutes } from './app.stack.routes'

const { Navigator, Screen } = createBottomTabNavigator()

export function AppTabRoutes() {
  return (
    <Navigator>
      <Screen component={AppStackRoutes} name="Home" />
      <Screen component={Home} name="Profile" />
      <Screen component={MyCars} name="MyCars" />
    </Navigator>
  )
}
