import React from 'react'

import { createStackNavigator } from '@react-navigation/stack'
import { Home } from '../screens/Home'
import { CarDetails } from '../screens/CarDetails'
import { Scheduling } from '../screens/Scheduling'
import { ScheduleDetails } from '../screens/ScheduleDetails'
import { ScheduleComplete } from '../screens/ScheduleComplete'
import { MyCars } from '../screens/MyCars'

const { Navigator, Screen } = createStackNavigator()

export function StackRoutes() {
  return (
    <Navigator headerMode="none">
      <Screen component={Home} name="Home" />
      <Screen component={CarDetails} name="CarDetails" />
      <Screen component={Scheduling} name="Scheduling" />
      <Screen component={ScheduleDetails} name="ScheduleDetails" />
      <Screen component={ScheduleComplete} name="ScheduleComplete" />
      <Screen component={MyCars} name="MyCars" />
    </Navigator>
  )
}
