import { combineReducers } from 'redux'
import hotelReducer from './hotelReducer'
import cartReducer from './cartReducer'

export default combineReducers({
  hotel: hotelReducer,
  cart: cartReducer,
})
