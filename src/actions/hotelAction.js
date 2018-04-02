import {
  ADD_HOTEL_TO_STORE,
  ADD_HOTEL_ROOM,
} from '../constants/ActionTypes'

export const addHotelToStore = (name) => ({
  type: ADD_HOTEL_TO_STORE,
  name,
})

export const addHotelRoom = (hotelId, roomType, minPerson, maxPerson, numRoom, roomPrice) => {
  console.log('addHotelRoom', hotelId, roomType, minPerson, maxPerson, numRoom, roomPrice)
  return {
    type: ADD_HOTEL_ROOM,
    hotelId,
    roomType,
    minPerson,
    maxPerson,
    numRoom,
    roomPrice,
  }
}
