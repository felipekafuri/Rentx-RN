import { TextInput } from 'react-native'
import { RFValue } from 'react-native-responsive-fontsize'
import styled, { css } from 'styled-components/native'

interface ContainerProps {
  isFocused: boolean
}

export const Container = styled.View<ContainerProps>`
  flex-direction: row;
  margin-bottom: 8px;

  ${({ isFocused, theme }) =>
    isFocused &&
    css`
      border-bottom-width: 2px;
      border-bottom-color: ${theme.colors.main};
    `}
`
export const IconContainer = styled.View`
  width: 55px;
  height: 55px;

  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.background_secondary};

  border-left-width: 1px;
  border-color: ${({ theme }) => theme.colors.background_primary};

  margin-right: 2px;
`

export const InputText = styled(TextInput)`
  flex: 1;

  background-color: ${({ theme }) => theme.colors.background_secondary};
  color: ${({ theme }) => theme.colors.text};
  font-family: ${({ theme }) => theme.fonts.primary_400};
  font-size: ${RFValue(15)}px;

  padding: 0 23px;
`
