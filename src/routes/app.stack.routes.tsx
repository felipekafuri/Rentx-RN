import React from 'react'

import { createStackNavigator } from '@react-navigation/stack'
import { CarDetails } from '../screens/CarDetails'
import { Scheduling } from '../screens/Scheduling'
import { ScheduleDetails } from '../screens/ScheduleDetails'
import { Confirmation } from '../screens/Confirmation'
import { Home } from '../screens/Home'
import { MyCars } from '../screens/MyCars'

const { Navigator, Screen } = createStackNavigator()

export function AppStackRoutes() {
  return (
    <Navigator headerMode="none" initialRouteName="Home">
      <Screen component={Home} name="Home" />
      <Screen component={CarDetails} name="CarDetails" />
      <Screen component={Scheduling} name="Scheduling" />
      <Screen component={ScheduleDetails} name="ScheduleDetails" />
      <Screen component={Confirmation} name="Confirmation" />
      <Screen component={MyCars} name="MyCars" />
    </Navigator>
  )
}
