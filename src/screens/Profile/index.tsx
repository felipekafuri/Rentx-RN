import { useNavigation } from '@react-navigation/native'
import React, { useState } from 'react'
import { useTheme } from 'styled-components'
import { BackButton } from '../../components/BackButton'
import { Feather } from '@expo/vector-icons'

import {
  Container,
  Content,
  Header,
  HeaderTitle,
  HeaderTop,
  LogoutButton,
  Options,
  OptionTitle,
  Photo,
  PhotoButton,
  PhotoContainer,
  Option
} from './styles'

export function Profile() {
  const [option, setOption] = useState<'dataEdit' | 'passwordEdit'>('dataEdit')

  const { goBack } = useNavigation()
  const theme = useTheme()

  function handleSelectOption(option: 'dataEdit' | 'passwordEdit') {
    setOption(option)
  }

  function handleSignOut() {}

  return (
    <Container>
      <Header>
        <HeaderTop>
          <BackButton color={theme.colors.shape} onPress={goBack} />
          <HeaderTitle>Editar Perfil</HeaderTitle>
          <LogoutButton onPress={handleSignOut}>
            <Feather name="power" size={24} color={theme.colors.shape} />
          </LogoutButton>
        </HeaderTop>

        <PhotoContainer>
          <Photo source={{ uri: 'https://github.com/felipekafuri.png' }} />
          <PhotoButton onPress={() => {}}>
            <Feather name="camera" size={24} color={theme.colors.shape} />
          </PhotoButton>
        </PhotoContainer>
      </Header>

      <Content>
        <Options>
          <Option
            active={option === 'dataEdit'}
            onPress={() => handleSelectOption('dataEdit')}
          >
            <OptionTitle active={option === 'dataEdit'}>Dados</OptionTitle>
          </Option>

          <Option
            active={option === 'passwordEdit'}
            onPress={() => handleSelectOption('passwordEdit')}
          >
            <OptionTitle active={option === 'passwordEdit'}>
              Trocar senha
            </OptionTitle>
          </Option>
        </Options>
      </Content>
    </Container>
  )
}
