import React, { useEffect, useState } from 'react'
import {
  StatusBar,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Alert
} from 'react-native'
import { useTheme } from 'styled-components'
import { Button } from '../../components/Button'
import { Input } from '../../components/Input'
import { PasswordInput } from '../../components/PasswordInput'

import * as yup from 'yup'

import { Container, Header, Subtitle, Title, Footer, Form } from './styles'
import { useNavigation } from '@react-navigation/native'
import { useAuth } from '../../hooks/auth'

import { database } from '../../databases'

export function SignIn() {
  const theme = useTheme()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const { signIn } = useAuth()

  const { navigate } = useNavigation()

  async function handleSignIn() {
    try {
      const schema = yup.object().shape({
        email: yup
          .string()
          .required('E-mail obrigatório.')
          .email('Digite um e-mail válido.'),
        password: yup.string().required('A senha é obrigatória')
      })

      await schema.validate({ email, password })

      await signIn({ email, password })
    } catch (err) {
      if (err instanceof yup.ValidationError) {
        Alert.alert('Opa', err.message)
      } else {
        Alert.alert(
          'Erro na autenticação',
          'Ocorreu um erro ao fazer login, verifique as credenciais'
        )
      }
    }
  }

  return (
    <KeyboardAvoidingView behavior="position" enabled>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Container>
          <StatusBar
            barStyle="dark-content"
            translucent
            backgroundColor="transparent"
          />
          <Header>
            <Title>Estamos{'\n'}quase lá.</Title>
            <Subtitle>
              Faça seu login para começar{'\n'}uma experiência incrível.
            </Subtitle>
          </Header>

          <Form>
            <Input
              iconName="mail"
              placeholder="E-mail"
              placeholderTextColor={theme.colors.text}
              keyboardType="email-address"
              autoCorrect={false}
              autoCapitalize="none"
              onChangeText={setEmail}
              value={email}
            />
            <PasswordInput
              iconName="lock"
              placeholder="Senha"
              placeholderTextColor={theme.colors.text}
              onChangeText={setPassword}
              value={password}
            />
          </Form>
          <Footer>
            <Button
              title="Login"
              onPress={handleSignIn}
              enabled
              loading={false}
            />
            <Button
              title="Criar conta gratuita"
              onPress={() => navigate('SignUpFirstStep')}
              enabled
              loading={false}
              color={theme.colors.background_secondary}
              light
            />
          </Footer>
        </Container>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  )
}
