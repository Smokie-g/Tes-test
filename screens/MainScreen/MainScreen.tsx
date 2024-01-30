import React, { useState, useEffect } from 'react'
import { RefreshControl, FlatList } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import { Portal } from 'react-native-paper'
import { Footer, Loader } from '../../components'
import { useRefetch } from '../../hooks'
import {
  RootState,
  setNextSkip,
  setProductList,
  resetProductList,
} from '../../services'
import { Container } from '../../styles'
import { ProductList, ModalInfo } from './components'

const LIMIT = 20

export const MainScreen: React.FC = () => {
  const [skip, setSkip] = useState<number>(0)
  const [additionalInfo, setAdditionalInfo] = useState<IProduct | null>(null)
  const [isLoading, setLoading] = useState<boolean>(false)
  const [isRefreshing, setRefreshing] = useState<boolean>(false)
  const [isVisible, setVisible] = useState<boolean>(false)

  const RefetchHook = { useRefetch }

  const dispatch = useDispatch()

  const products = useSelector((state: RootState) => state.products)

  const fetchData = async () => {
    try {
      const res = await fetch(
        `https://dummyjson.com/products?limit=${LIMIT}&skip=${skip}`,
      )
      const jsonRes = (await res.json()) as IItem<IProduct>

      if (jsonRes.products) {
        dispatch(setNextSkip())
        dispatch(setProductList(jsonRes.products))
      }
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
      setRefreshing(false)
    }
  }

  const onRefresh = () => {
    setRefreshing(true)
    setSkip(0)
    dispatch(resetProductList())
    void fetchData()
  }

  const onEndReached = () => {
    if (products.skip) {
      setSkip(prev => prev + 1)
      void fetchData()
    }
  }

  const handleCardPress = (character: IProduct) => {
    setAdditionalInfo(character)
    setVisible(true)
  }

  RefetchHook.useRefetch(() => {
    setLoading(true) // just to see that it works
    void fetchData()
  }, 30000)

  useEffect(() => {
    setLoading(true)
    void fetchData()
  }, [])

  return (
    <>
      <Container>
        {isLoading ? (
          <Loader />
        ) : (
          <FlatList
            contentContainerStyle={{ paddingBottom: 32 }}
            data={products.products}
            initialNumToRender={10}
            extraData={products.products}
            keyExtractor={(_, index) => index.toString()}
            renderItem={el => (
              <ProductList
                product={el.item}
                onPress={() => handleCardPress(el.item)}
              />
            )}
            refreshControl={
              <RefreshControl
                refreshing={isRefreshing}
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
        <ModalInfo
          additionalInfo={additionalInfo}
          isVisible={isVisible}
          setVisible={setVisible}
        />
      </Portal>
    </>
  )
}
