import {
  ADD_HOTEL_TO_STORE,
  REMOVE_HOTEL_FROM_STORE,
  ADD_HOTEL_ROOM_TO_STORE,
  REMOVE_ROOM_FROM_HOTEL,
  BOOKED_ROOM,
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

export const removeRoom = (hotelId, roomId) => ({
  type: REMOVE_ROOM_FROM_HOTEL,
  hotelId,
  roomId,
})

export const bookedRoom = (hotelId, roomId, numSelectedRooms) => ({
  type: BOOKED_ROOM,
  hotelId,
  roomId,
  numSelectedRooms,
})