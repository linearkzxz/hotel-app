// import _ from 'lodash'
// import {
//   LOGOUT,
//   EMPTY_CART,
//   ADD_PRODUCT_TO_CART,
//   REMOVE_PRODUCT_IN_CART,
//   ADD_TEMP_PRODUCT_IN_CART,
//   SET_PRODUCT_TO_TEMP_PRODUCT_IN_CART,
//   SET_TEMP_PRODUCT_TO_PRODUCT_IN_CART,
// } from '../constants/ActionTypes'
// import { isEmpty } from '../utils/validation'

const initState = {
  products: {},
  tempProducts: {},
}

const cartReducer = (state = initState, action) => {
  switch (action.type) {
    // case ADD_PRODUCT_TO_CART: {
    //   const { product: newProduct, quantity } = action
    //   const products = (() => {
    //     if (quantity) {
    //       return {
    //         ...state.products,
    //         [newProduct.productID]: {
    //           ...newProduct,
    //           quantity,
    //         },
    //       }
    //     }
    //     return _.omit(state.products, [newProduct.productID])
    //   })()
    //   return {
    //     ...state,
    //     products,
    //   }
    // }
    default:
      return state
  }
}

export default cartReducer