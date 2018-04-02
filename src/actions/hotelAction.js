import {
  ADD_HOTEL_TO_STORE,
  ADD_HOTEL_ROOM,
} from '../constants/ActionTypes'

export const addHotelToStore = (hotelId, name) => ({
  type: ADD_HOTEL_TO_STORE,
  hotelId,
  name,
})

export const addHotelRoom = (hotelId, roomId, roomType, minPerson, maxPerson, numRoom, roomPrice) => {
  return {
    type: ADD_HOTEL_ROOM,
    hotelId,
    roomId,
    roomType,
    minPerson,
    maxPerson,
    numRoom,
    roomPrice,
  }
}
