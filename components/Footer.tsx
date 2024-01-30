import React from 'react'
import { StyleSheet } from 'react-native'
import styled from 'styled-components/native'

const FooterContainer = styled.View`
  padding-bottom: 64;
  background-color: white;
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

export const Footer: React.FC = () => <FooterContainer style={styles.shadow} />
