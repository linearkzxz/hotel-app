import {
  ADD_HOTEL_TO_STORE,
  REMOVE_HOTEL_FROM_STORE,
  ADD_HOTEL_ROOM_TO_STORE,
} from '../constants/ActionTypes'

export const addHotelToStore = (hotelId, name, facilities) => ({
  type: ADD_HOTEL_TO_STORE,
  hotelId,
  name,
  facilities,
})

export const removeHotel = (hotelId) => ({
  type: REMOVE_HOTEL_FROM_STORE,
  hotelId,
})

export const addHotelRoom = (hotelId, roomId, roomType, minPerson, maxPerson, numRoom, roomPrice) => {
  return {
    type: ADD_HOTEL_ROOM_TO_STORE,
    hotelId,
    roomId,
    roomType,
    minPerson,
    maxPerson,
    numRoom,
    roomPrice,
  }
}
