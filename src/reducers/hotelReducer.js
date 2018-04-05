import _ from 'lodash'
import {
  ADD_HOTEL_TO_STORE,
  REMOVE_HOTEL_FROM_STORE,
  ADD_HOTEL_ROOM_TO_STORE,
  BOOKED_ROOM,
} from '../constants/ActionTypes'

const initState = {
  hotels: {
    '111111111': {
      hotelId: '111111111',
      name: 'Hotel A',
      rooms: {
        '111111111111111111': {
          roomId: '111111111111111111',
          type: 'Standard room',
          minPerson: 1,
          maxPerson: 2,
          numRoom: 4,
          price: 600,
        },
        '222222222222222222': {
          roomId: '222222222222222222',
          type: 'Deluxe room',
          minPerson: 3,
          maxPerson: 4,
          numRoom: 4,
          price: 1100,
        },
        '333333333333333333': {
          roomId: '333333333333333333',
          type: 'Superior room',
          minPerson: 5,
          maxPerson: 6,
          numRoom: 2,
          price: 1500,
        },
      },
      facilities: {
        'Free breakfast': true,
        'Free wifi': true,
        'Pool': false,
        'Car rest': false,
      },
    },
    '222222222': {
      hotelId: '222222222',
      name: 'Hotel B',
      rooms: {
        '111111111111111111': {
          roomId: '111111111111111111',
          type: 'Standard room',
          minPerson: 1,
          maxPerson: 2,
          numRoom: 5,
          price: 800,
        },
        '222222222222222222': {
          roomId: '222222222222222222',
          type: 'Double bed room',
          minPerson: 1,
          maxPerson: 2,
          numRoom: 5,
          price: 1000,
        },
        '333333333333333333': {
          roomId: '333333333333333333',
          type: 'Deluxe room',
          minPerson: 3,
          maxPerson: 4,
          numRoom: 3,
          price: 1400,
        },
        '444444444444444444': {
          roomId: '444444444444444444',
          type: 'Deluxe special room',
          minPerson: 3,
          maxPerson: 4,
          numRoom: 3,
          price: 1600,
        },
      },
      facilities: {
        'Free breakfast': true,
        'Free wifi': true,
        'Pool': true,
        'Car rest': true,
      },
    },
    '333333333': {
      hotelId: '333333333',
      name: 'Hotel C',
      rooms: {
        '111111111111111111': {
          roomId: '111111111111111111',
          type: 'Deluxe room',
          minPerson: 1,
          maxPerson: 2,
          numRoom: 4,
          price: 700,
        },
        '222222222222222222': {
          roomId: '222222222222222222',
          type: 'Superior room',
          minPerson: 3,
          maxPerson: 4,
          numRoom: 4,
          price: 1200,
        },
        '333333333333333333': {
          roomId: '333333333333333333',
          type: 'Family room ',
          minPerson: 5,
          maxPerson: 6,
          numRoom: 2,
          price: 1800,
        },
      },
      facilities: {
        'Free breakfast': true,
        'Free wifi': false,
        'Pool': true,
        'Car rest': true,
      },
    },
    '444444444': {
      hotelId: '444444444',
      name: 'Hotel D',
      rooms: {
        '111111111111111111': {
          roomId: '111111111111111111',
          type: 'Deluxe room',
          minPerson: 1,
          maxPerson: 2,
          numRoom: 5,
          price: 400,
        },
        '222222222222222222': {
          roomId: '222222222222222222',
          type: 'Superior room',
          minPerson: 3,
          maxPerson: 4,
          numRoom: 5,
          price: 800,
        },
      },
      facilities: {
        'Free breakfast': false,
        'Free wifi': true,
        'Pool': false,
        'Car rest': false,
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
                minPerson: parseInt(action.minPerson, 10),
                maxPerson: parseInt(action.maxPerson, 10),
                numRoom: parseInt(action.numRoom, 10),
                price: parseInt(action.roomPrice, 10),
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
    case BOOKED_ROOM: {
      return {
        ...state,
        hotels: {
          ...state.hotels,
          [action.hotelId]: {
            ...state.hotels[action.hotelId],
            rooms: {
              ...state.hotels[action.hotelId].rooms,
              [action.roomId]: {
                ...state.hotels[action.hotelId].rooms[action.roomId],
                numRoom: state.hotels[action.hotelId].rooms[action.roomId].numRoom - parseInt(action.numSelectedRooms, 10),
              }
            }
          }
        },
      }
    }
    default:
      return state
  }
}

export default hotelReducer