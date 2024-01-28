import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

const initialState = {
  products: [] as IProduct[],
  limit: 10,
  skip: 0,
  total: 100,
}

export const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    setProductList: (state, action: PayloadAction<IProduct[]>) => {
      const mergedArr = state.products.concat(action.payload)

      return {
        ...state,
        products: mergedArr.filter(
          (item, index) => mergedArr.indexOf(item) === index,
        ),
      }
    },
    setNextSkip: state => {
      state.skip += 1
    },
    resetProductList: () => {
      return initialState
    },
  },
})

export const { setProductList, setNextSkip, resetProductList } =
  productSlice.actions

export default productSlice.reducer
