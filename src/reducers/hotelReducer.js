import _ from 'lodash'
import {
  ADD_HOTEL_TO_STORE,
  REMOVE_HOTEL_FROM_STORE,
  ADD_HOTEL_ROOM_TO_STORE,
} from '../constants/ActionTypes'
// import { isEmpty } from '../utils/validation'

const initState = {
  hotels: {
    ['111111111']: {
      hotelId: '111111111',
      name: 'Hotel A',
      rooms: {
        ['111111111111111111']: {
          roomId: '111111111111111111',
          type: 'Standard room',
          minPerson: 1,
          maxPerson: 2,
          numRoom: 4,
          price: 600,
        },
        ['222222222222222222']: {
          roomId: '222222222222222222',
          type: 'Standard room',
          minPerson: 3,
          maxPerson: 4,
          numRoom: 7,
          price: 1100,
        },
        ['333333333333333333']: {
          roomId: '333333333333333333',
          type: 'Deluxe room',
          minPerson: 5,
          maxPerson: 6,
          numRoom: 2,
          price: 1500,
        },
      },
      facilities: {
        ['Free breakfast']: true,
        ['Free wifi']: true,
        ['Pool']: false,
        ['Car rest']: false,
      },
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
            ...state.hotels[action.hotelId],
            hotelId: action.hotelId,
            name: action.name,
            facilities: action.facilities,
          }
        }
      }
    }
    case ADD_HOTEL_ROOM_TO_STORE: {
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
            },
          }
        }
      }
    }
    case REMOVE_HOTEL_FROM_STORE: {
      const hotelsAfterRemove = _.omit(state.hotels, [action.hotelId])
      return {
        ...state,
        hotels: hotelsAfterRemove,
      }
    }
    default:
      return state
  }
}

export default hotelReducer