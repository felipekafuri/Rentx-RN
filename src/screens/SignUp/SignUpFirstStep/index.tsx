import React from 'react'

import { useNavigation } from '@react-navigation/native'

import { BackButton } from '../../../components/BackButton'
import { Bullet } from '../../../components/Bullet'
import { Input } from '../../../components/Input'
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

export function SignUpFirstStep() {
  const { goBack, navigate } = useNavigation()

  return (
    <KeyboardAvoidingView behavior="position" enabled>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Container>
          <Header>
            <BackButton onPress={goBack} />
            <Steps>
              <Bullet active />
              <Bullet active={false} />
            </Steps>
          </Header>

          <Title>Crie sua{'\n'}conta</Title>
          <Subtitle>Faça seu cadastro de {'\n'}de forma rápida</Subtitle>

          <Form>
            <FormTitle>01. Dados</FormTitle>
            <Input iconName="user" placeholder="Nome" />
            <Input iconName="mail" placeholder="E-mail" />
            <Input iconName="credit-card" placeholder="CNH" />
            <Button
              title="Próximo"
              onPress={() => navigate('SignUpSecondStep')}
            />
          </Form>
        </Container>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  )
}
