import React, { useState, useEffect, useRef } from 'react'
import {
  StyleSheet,
  RefreshControl,
  Modal,
  TouchableWithoutFeedback,
  FlatList,
  View,
} from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import styled from 'styled-components/native'
import { Portal } from 'react-native-paper'
import { useRefetch } from '../../hooks'
import {
  RootState,
  setNextSkip,
  setProductList,
  resetProductList,
} from '../../services'

const LIMIT = 20

const Container = styled.View`
  flex: 1;
  justify-content: center;
`
const Footer = styled.View`
  padding-bottom: 64;
`
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
const Loader = styled.ActivityIndicator<{ bottom?: number; top?: number }>`
  position: absolute;
  left: 0;
  right: 0;
  align-items: center;
  justify-content: center;
`
const ModalOverlay = styled.View`
  flex: 1;
  justify-content: center;
  background: rgba(24, 35, 61, 0.7);
  padding-horizontal: 40;
`
const Card = styled.View`
  background: white;
  padding-vertical: 8;
  padding-horizontal: 8;
  border-radius: 6px;
`
const Row = styled.View`
  flex-direction: row;
  align-items: center;
  align-content: center;
`
const BaseText = styled.Text`
  font-size: 16;
  font-weight: 500;
`
const TitleText = styled(BaseText)`
  font-weight: 700;
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

const RefetchHook = { useRefetch }

export const MainScreen: React.FC = () => {
  const [skip, setSkip] = useState<number>(0)
  const [additionalInfo, setAdditionalInfo] = useState<IProduct | null>(null)
  const [isLoading, setLoading] = useState<boolean>(false)
  const [isVisible, setVisible] = useState<boolean>(false)

  const products = useSelector((state: RootState) => state.products)
  const dispatch = useDispatch()

  const fetchData = async () => {
    setLoading(true)

    try {
      const response = await fetch(
        `https://dummyjson.com/products?limit=${LIMIT}&skip=${skip}`,
      )
      const jsonRes = (await response.json()) as IItem<IProduct>

      if (jsonRes.products) {
        dispatch(setNextSkip())
        dispatch(setProductList(jsonRes.products))
      }

    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  const onRefresh = () => {
    setSkip(0)
    dispatch(resetProductList())
    void fetchData()
  }

  const onEndReached = async () => {
    if (products.skip) {
      setSkip(prev => prev + 1)
      
      const response = await fetch(
        `https://dummyjson.com/products?limit=${LIMIT}&skip=${skip}`,
      )
      const jsonRes = (await response.json()) as IItem<IProduct>

      if (jsonRes.products) {
        dispatch(setNextSkip())
        dispatch(setProductList(jsonRes.products))
      }
    }
  }

  const handleCardPress = (character: IProduct) => {
    setAdditionalInfo(character)
    setVisible(true)
  }

  RefetchHook.useRefetch(() => void fetchData(), 30000)

  useEffect(() => {
    void fetchData()
  }, [])

  return (
    <>
      <Container>
        {isLoading ? (
          <Loader animating={true} color='#b0c5eb' size='large' />
        ) : (
          <FlatList
            contentContainerStyle={{ paddingBottom: 32 }}
            data={products.products}
            initialNumToRender={10}
            extraData={products.products}
            keyExtractor={(_, index) => index.toString()}
            renderItem={el => (
              <TouchableWrapper
                style={styles.shadow}
                onPress={() => handleCardPress(el.item)}
              >
                <BaseText>{el.item.title}</BaseText>
              </TouchableWrapper>
            )}
            refreshControl={
              <RefreshControl
                refreshing={isLoading}
                tintColor='#b0c5eb'
                onRefresh={onRefresh}
              />
            }
            showsVerticalScrollIndicator={false}
            onEndReached={onEndReached}
            onEndReachedThreshold={0.5}
          />
        )}
      </Container>

      <Footer />

      <Portal>
        <Modal transparent={true} visible={isVisible}>
          <TouchableWithoutFeedback onPress={() => setVisible(false)}>
            <ModalOverlay>
              <Card>
                <Row>
                  <TitleText>Brand Name: </TitleText>
                  <BaseText>{additionalInfo?.brand}</BaseText>
                </Row>
                <Row>
                  <TitleText>Price: </TitleText>
                  <BaseText>{`${additionalInfo?.price} $`}</BaseText>
                </Row>
                <Row>
                  <TitleText>Rating: </TitleText>
                  <BaseText>{additionalInfo?.rating}</BaseText>
                </Row>
              </Card>
            </ModalOverlay>
          </TouchableWithoutFeedback>
        </Modal>
      </Portal>
    </>
  )
}
