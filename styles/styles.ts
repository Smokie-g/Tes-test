import styled from 'styled-components/native'

export const Container = styled.View<{ color?: string }>`
  flex: 1;
  background-color: ${({ color }) => (color ? color : 'transparent')};
`
export const BaseText = styled.Text`
  font-size: 16;
  font-weight: 500;
`
