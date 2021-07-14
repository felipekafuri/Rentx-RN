import React, { useState } from 'react'
import {
  Alert,
  Keyboard,
  KeyboardAvoidingView,
  TouchableWithoutFeedback
} from 'react-native'
import * as yup from 'yup'

import { useNavigation } from '@react-navigation/native'

import { BackButton } from '../../../components/BackButton'
import { Bullet } from '../../../components/Bullet'
import { Button } from '../../../components/Button'
import { Input } from '../../../components/Input'
import {
  Container,
  Form,
  FormTitle,
  Header,
  Steps,
  Subtitle,
  Title
} from './styles'

export function SignUpFirstStep() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [driverLicense, setDriverLicense] = useState('')

  const { goBack, navigate } = useNavigation()

  async function handleNextStep() {
    try {
      const schema = yup.object().shape({
        name: yup.string().required('Nome é obrigatório'),
        email: yup
          .string()
          .required('E-mail é obrigatório')
          .email('E-mail válido'),
        driver_license: yup.string().required('CNH é obrigatório')
      })
      const data = {
        name,
        email,
        driver_license: driverLicense
      }

      await schema.validate(data)

      navigate('SignUpSecondStep', { user: data })
    } catch (error) {
      if (error instanceof yup.ValidationError) {
        return Alert.alert('Opa!', error.message)
      }
    }
  }

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
            <Input
              iconName="user"
              placeholder="Nome"
              onChangeText={setName}
              value={name}
            />
            <Input
              iconName="mail"
              placeholder="E-mail"
              onChangeText={setEmail}
              value={email}
              autoCapitalize="none"
            />
            <Input
              iconName="credit-card"
              placeholder="CNH"
              onChangeText={setDriverLicense}
              value={driverLicense}
              keyboardType="numeric"
            />
            <Button title="Próximo" onPress={handleNextStep} />
          </Form>
        </Container>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  )
}
