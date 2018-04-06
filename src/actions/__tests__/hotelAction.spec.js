import mockStore from '../../mockStore'
import {
  addHotelToStore,
  removeHotel,
  addHotelRoom,
  removeRoom,
  bookedRoom,
} from '../hotelAction'
import {
  ADD_HOTEL_TO_STORE,
  REMOVE_HOTEL_FROM_STORE,
  ADD_HOTEL_ROOM_TO_STORE,
  REMOVE_ROOM_FROM_HOTEL,
  BOOKED_ROOM,
} from '../../constants/ActionTypes'

const store = mockStore()

describe('Hotel Action', () => {
  beforeEach(() => {
    store.clearActions()
  })

  const hotelId = '11111111'
  const name = 'Hotel A'
  const facilities = {
    'Free breakfast': false,
    'Free wifi': true,
    'Pool': true,
    'Car rest': false,
  }
  const roomId = '121212121212121212'
  const roomType = 'Star room'
  const minPerson = 1
  const maxPerson = 2
  const numRoom = 20
  const roomPrice = 500

  it('should create an action to addHotelToStore', () => {
    store.dispatch(addHotelToStore(hotelId, name, facilities))
    expect(store.getActions()).toEqual([
      {
        type: ADD_HOTEL_TO_STORE,
        hotelId,
        name,
        facilities,
      }])
  })

  it('should create an action to removeHotel', () => {
    store.dispatch(removeHotel(hotelId))
    expect(store.getActions()).toEqual([
      {
        type: REMOVE_HOTEL_FROM_STORE,
        hotelId,
      }])
  })

  it('should create an action to addHotelRoom', () => {
    store.dispatch(addHotelRoom(hotelId, roomId, roomType, minPerson, maxPerson, numRoom, roomPrice))
    expect(store.getActions()).toEqual([
      {
        type: ADD_HOTEL_ROOM_TO_STORE,
        hotelId,
        roomId,
        roomType,
        minPerson,
        maxPerson,
        numRoom,
        roomPrice,
      }])
  })

  it('should create an action to removeRoom', () => {
    store.dispatch(removeRoom(hotelId, roomId))
    expect(store.getActions()).toEqual([
      {
        type: REMOVE_ROOM_FROM_HOTEL,
        hotelId,
        roomId,
      }])
  })

  it('should create an action to bookedRoom', () => {
    store.dispatch(bookedRoom(hotelId, roomId, 2))
    expect(store.getActions()).toEqual([
      {
        type: BOOKED_ROOM,
        hotelId,
        roomId,
        numSelectedRooms: 2,
      }])
  })
})
