// import _ from 'lodash'
import {
  ADD_HOTEL_TO_STORE,
  ADD_HOTEL_ROOM,
} from '../constants/ActionTypes'
// import { isEmpty } from '../utils/validation'

const initState = {
  hotels: {
    hotel1: {
      name: 'A',
      rooms: [{
        type: 'asdasdsd',
        minPerson: 1,
        maxPerson: 2,
        numRoom: 5,
        price: 300,
      }],
      facility: [],
    },
  },
}

const hotelReducer = (state = initState, action) => {
  switch (action.type) {
    case ADD_HOTEL_TO_STORE: {
      return {
        ...state,
        hotels: {
          ...state.hotels,
          [action.name]: {
            name: action.name,
            rooms: [],
          }
        }
      }
    }
    case ADD_HOTEL_ROOM: {
      console.log('ADD_HOTEL_ROOM', state.hotels, action)
      return {
        ...state,
        hotels: {
          ...state.hotels,
          [action.hotelId]: {
            name: state.hotels[action.hotelId].name,
            rooms: [
              ...state.hotels[action.hotelId].rooms,
              {
                type: action.roomType,
                minPerson: parseInt(action.minPerson),
                maxPerson: parseInt(action.maxPerson),
                numRoom: parseInt(action.numRoom),
                price: parseInt(action.roomPrice),
              }
            ]
          }
        }
      }
    }
    default:
      return state
  }
}

export default hotelReducer