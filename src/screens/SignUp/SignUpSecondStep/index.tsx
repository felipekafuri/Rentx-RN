import React, { useState } from 'react'
import {
  Alert,
  Keyboard,
  KeyboardAvoidingView,
  TouchableWithoutFeedback
} from 'react-native'
import { useTheme } from 'styled-components'

import { useNavigation, useRoute } from '@react-navigation/native'

import { BackButton } from '../../../components/BackButton'
import { Bullet } from '../../../components/Bullet'
import { Button } from '../../../components/Button'
import { PasswordInput } from '../../../components/PasswordInput'
import {
  Container,
  Form,
  FormTitle,
  Header,
  Steps,
  Subtitle,
  Title
} from './styles'
import { api } from '../../../services/api'

interface Params {
  user: {
    name: string
    email: string
    driver_license: string
  }
}

export function SignUpSecondStep() {
  const { goBack, navigate } = useNavigation()
  const theme = useTheme()

  const [password, setPassword] = useState('')
  const [passwordConfirmation, setPasswordConfirmation] = useState('')

  const { params } = useRoute()
  const { user } = params as Params

  async function handleRegister() {
    try {
      if (!password || !passwordConfirmation) {
        return Alert.alert('Opa!!', 'Informe a senha e sua confirmação.')
      }
      if (password !== passwordConfirmation) {
        return Alert.alert('Opa!!', 'Senhas não são iguais.')
      }

      const data = {
        ...user,
        password,
        passwordConfirmation
      }

      await api.post('/users', data)

      navigate('Confirmation', {
        title: 'Conta Criada!',
        message: `Agora é só fazer login\ne aproveitar.`,
        nextScreenName: 'SignIn'
      })
    } catch (error) {
      Alert.alert('Não foi possível cadastrar.')
    }
  }

  return (
    <KeyboardAvoidingView behavior="position" enabled>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Container>
          <Header>
            <BackButton onPress={goBack} />
            <Steps>
              <Bullet active={false} />
              <Bullet active />
            </Steps>
          </Header>

          <Title>Crie sua{'\n'}conta</Title>
          <Subtitle>Faça seu cadastro de {'\n'}de forma rápida</Subtitle>

          <Form>
            <FormTitle>02. Senhas</FormTitle>
            <PasswordInput
              iconName="lock"
              placeholder="Senha"
              onChangeText={setPassword}
              value={password}
            />
            <PasswordInput
              iconName="lock"
              placeholder="Repetir senha"
              onChangeText={setPasswordConfirmation}
              value={passwordConfirmation}
            />
            <Button
              title="Cadastrar"
              onPress={handleRegister}
              color={theme.colors.success}
            />
          </Form>
        </Container>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  )
}
