import React from 'react'

import { useNavigation } from '@react-navigation/native'

import { BackButton } from '../../../components/BackButton'
import { Bullet } from '../../../components/Bullet'
import {
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard
} from 'react-native'
import {
  Container,
  Form,
  FormTitle,
  Header,
  Steps,
  Subtitle,
  Title
} from './styles'
import { Button } from '../../../components/Button'
import { PasswordInput } from '../../../components/PasswordInput'
import { useTheme } from 'styled-components'

export function SignUpSecondStep() {
  const { goBack, navigate } = useNavigation()
  const theme = useTheme()

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
            <PasswordInput iconName="lock" placeholder="Senha" />
            <PasswordInput iconName="lock" placeholder="Repetir senha" />
            <Button
              title="Cadastrar"
              onPress={() => navigate('SignUpSecondStep')}
              color={theme.colors.success}
            />
          </Form>
        </Container>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  )
}
