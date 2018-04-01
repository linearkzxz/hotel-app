import {
  ADD_HOTEL_TO_STORE,
} from '../constants/ActionTypes'

export const addHotelToStore = (name, roomType, numRoom) => ({
  type: ADD_HOTEL_TO_STORE,
  name,
  roomType,
  numRoom,
})
