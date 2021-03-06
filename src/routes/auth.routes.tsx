import React from 'react'

import { createStackNavigator } from '@react-navigation/stack'
import { Confirmation } from '../screens/Confirmation'
import { Splash } from '../screens/Splash'
import { SignIn } from '../screens/SignIn'
import { SignUpFirstStep } from '../screens/SignUp/SignUpFirstStep'
import { SignUpSecondStep } from '../screens/SignUp/SignUpSecondStep'

const { Navigator, Screen } = createStackNavigator()

export function AuthRoutes() {
  return (
    <Navigator headerMode="none" initialRouteName="Splash">
      <Screen component={Splash} name="Splash" />
      <Screen component={SignIn} name="SignIn" />
      <Screen component={SignUpFirstStep} name="SignUpFirstStep" />
      <Screen component={SignUpSecondStep} name="SignUpSecondStep" />
      <Screen component={Confirmation} name="Confirmation" />
    </Navigator>
  )
}
