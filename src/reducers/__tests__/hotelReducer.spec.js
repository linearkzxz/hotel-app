import reducer, { initState } from '../hotelReducer'
import {
  ADD_HOTEL_TO_STORE,
  REMOVE_HOTEL_FROM_STORE,
  ADD_HOTEL_ROOM_TO_STORE,
  REMOVE_ROOM_FROM_HOTEL,
  BOOKED_ROOM,
} from '../../constants/ActionTypes'

const hotelId = '111111111'
const name = 'Hotel A'
const facilities = {
  'Free breakfast': true,
  'Free wifi': true,
  'Pool': false,
  'Car rest': false,
}
const roomId = '111111111111111111'
const roomType = 'Standard room'
const minPerson = 1
const maxPerson = 2
const numRoom = 4
const roomPrice = 600

const initialState = {
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
      },
      facilities: {
        'Free breakfast': true,
        'Free wifi': true,
        'Pool': false,
        'Car rest': false,
      },
    },
  }
}

describe('hotel reducer', () => {
  it('should return initial state', () => {
    const state = reducer(undefined, {})
    expect(state).toEqual(initState)
  })

  it('should return correct data type: ADD_HOTEL_TO_STORE', () => {
    const state = reducer(initialState, {
      type: ADD_HOTEL_TO_STORE,
      hotelId: '12312954835496',
      name: 'Hotel Test',
      facilities: {
        'Free breakfast': true,
        'Free wifi': false,
        'Pool': false,
        'Car rest': true,
      },
    })
    const stateExpect = {
      "hotels": { "111111111": { "facilities": { "Car rest": false, "Free breakfast": true, "Free wifi": true, "Pool": false }, "hotelId": "111111111", "name": "Hotel A", "rooms": { "111111111111111111": { "maxPerson": 2, "minPerson": 1, "numRoom": 4, "price": 600, "roomId": "111111111111111111", "type": "Standard room" } } }, "12312954835496": { "facilities": { "Car rest": true, "Free breakfast": true, "Free wifi": false, "Pool": false }, "hotelId": "12312954835496", "name": "Hotel Test" } }
    }
    expect(state).toEqual(stateExpect)
  })

  it('should return correct data type: ADD_HOTEL_ROOM_TO_STORE', () => {
    const state = reducer(initialState, {
      type: ADD_HOTEL_ROOM_TO_STORE,
      hotelId: '111111111',
      roomId: '111111111111111111',
      roomType: 'test room',
      minPerson: 1,
      maxPerson: 5,
      numRoom: 10,
      roomPrice: 500,
    })
    const stateExpect = {
      "hotels": { "111111111": { "facilities": { "Car rest": false, "Free breakfast": true, "Free wifi": true, "Pool": false }, "hotelId": "111111111", "name": "Hotel A", "rooms": { "111111111111111111": { "maxPerson": 5, "minPerson": 1, "numRoom": 10, "price": 500, "roomId": "111111111111111111", "type": "test room" } } } }
    }
    expect(state).toEqual(stateExpect)
  })

  it('should return correct data type: REMOVE_HOTEL_FROM_STORE', () => {
    const state = reducer(initialState, {
      type: REMOVE_HOTEL_FROM_STORE,
      hotelId: '111111111',
    })
    const stateExpect = {
      "hotels": {}
    }
    expect(state).toEqual(stateExpect)
  })

  it('should return correct data type: REMOVE_ROOM_FROM_HOTEL', () => {
    const state = reducer(initialState, {
      type: REMOVE_ROOM_FROM_HOTEL,
      hotelId: '111111111',
      roomId: '111111111111111111'
    })
    const stateExpect = {
      "hotels": { "111111111": { "facilities": { "Car rest": false, "Free breakfast": true, "Free wifi": true, "Pool": false }, "hotelId": "111111111", "name": "Hotel A", "rooms": {} } }
    }
    expect(state).toEqual(stateExpect)
  })

  it('should return correct data type: BOOKED_ROOM', () => {
    const state = reducer(initialState, {
      type: BOOKED_ROOM,
      hotelId: '111111111',
      roomId: '111111111111111111',
      numSelectedRooms: 2,
    })
    const stateExpect = {
      "hotels": { "111111111": { "facilities": { "Car rest": false, "Free breakfast": true, "Free wifi": true, "Pool": false }, "hotelId": "111111111", "name": "Hotel A", "rooms": { "111111111111111111": { "maxPerson": 2, "minPerson": 1, "numRoom": 2, "price": 600, "roomId": "111111111111111111", "type": "Standard room" } } } }
    }
    expect(state).toEqual(stateExpect)
  })
})
