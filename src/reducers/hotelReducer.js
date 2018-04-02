// import _ from 'lodash'
import {
  ADD_HOTEL_TO_STORE,
  ADD_HOTEL_ROOM,
} from '../constants/ActionTypes'
// import { isEmpty } from '../utils/validation'

const initState = {
  hotels: {
    ['123456789']: {
      hotelId: '123456789',
      name: 'Hotel A',
      rooms: {
        ['123456789123456789']: {
          roomId: '123456789123456789',
          type: 'Standard room',
          minPerson: 1,
          maxPerson: 2,
          numRoom: 5,
          price: 300,
        },
      },
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
          [action.hotelId]: {
            hotelId: action.hotelId,
            name: action.name,
            rooms: {},
          }
        }
      }
    }
    case ADD_HOTEL_ROOM: {
      return {
        ...state,
        hotels: {
          ...state.hotels,
          [action.hotelId]: {
            ...state.hotels[action.hotelId],
            rooms: {
              ...state.hotels[action.hotelId].rooms,
              [action.roomId]: {
                roomId: action.roomId,
                type: action.roomType,
                minPerson: parseInt(action.minPerson),
                maxPerson: parseInt(action.maxPerson),
                numRoom: parseInt(action.numRoom),
                price: parseInt(action.roomPrice),
              }
            }
          }
        }
      }
    }
    default:
      return state
  }
}

export default hotelReducer