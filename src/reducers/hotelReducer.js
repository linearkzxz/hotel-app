// import _ from 'lodash'
import {
  ADD_HOTEL_TO_STORE,
} from '../constants/ActionTypes'
// import { isEmpty } from '../utils/validation'

const initState = {
  hotels: {
    hotel1: {
      name: 'A',
      room: {
        desc: 'asdasdsd',
        numRoom: 5,
      },
      facility: [],
    },
  },
}

const hotelReducer = (state = initState, action) => {
  switch (action.type) {
    case ADD_HOTEL_TO_STORE: {
      return state
    }
    default:
      return state
  }
}

export default hotelReducer