import React from 'react'
import { StyleSheet } from 'react-native'
import styled from 'styled-components/native'
import { BaseText } from '../../../styles'

interface IProps {
  product: IProduct
  onPress(): void
}

const TouchableWrapper = styled.TouchableOpacity<{ customStyle?: string }>`
  background: white;
  box-shadow: 1px 1.5px 2px rgba(47, 46, 65, 0.2);
  border-radius: 7px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16;
  padding-vertical: 16;
  padding-horizontal: 16;
  ${props => props.customStyle};
`

const styles = StyleSheet.create({
  shadow: {
    shadowColor: '#E0E4EF',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 1,
    shadowRadius: 3,
    elevation: 6,
  },
})

export const ProductList: React.FC<IProps> = ({ product, onPress }) => (
  <TouchableWrapper
    style={styles.shadow}
    onPress={onPress}
  >
    <BaseText>{product.title}</BaseText>
  </TouchableWrapper>
)
