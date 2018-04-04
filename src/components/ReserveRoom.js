import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import {
  Button,
  Form,
  FormGroup,
  FormControl,
  ControlLabel,
  HelpBlock,
} from 'react-bootstrap'
import { RoomCard } from '../commons'
import { addHotelRoom } from '../actions/hotelAction'
import RoomForm from './RoomForm'
import { addCommaFromInteger } from '../utils/utilFunction'

class ReserveRoom extends Component {
  static propTypes = {
    location: PropTypes.object.isRequired,
  }

  constructor(props, context) {
    super(props, context);

    this.handleSelectRooms = this.handleSelectRooms.bind(this);

    this.state = {
      selectedRooms: {},
      selectedRoomsId: '',
    }
  }

  handleSelectRooms(e, roomId) {
    this.setState({
      selectedRooms: { [roomId]: e.target.value },
      selectedRoomsId: roomId
    });
  }

  render() {
    const { selectedRooms, selectedRoomsId } = this.state
    const { hotels, location, addHotelRoomProp, history } = this.props
    const { hotelId = '' } = location.state || {}
    if (!hotels[hotelId]) {
      history.push({
        pathname: '/reserve-hotel',
      })
      return true
    } else {
      const { name = '', rooms: roomsObj = {} } = hotels[hotelId]
      const rooms = Object.values(roomsObj)
      let payBaht = 0
      if (selectedRoomsId) {
        payBaht = selectedRooms[selectedRoomsId] * roomsObj[selectedRoomsId].price
      }
      return (
        <div className='container'>
          <div align='center'>
            <h1>Reserve Room</h1>
          </div>
          <h1>{hotels[hotelId].name}</h1>
          <h2>{`Pay: ${addCommaFromInteger(payBaht)} Baht`}</h2>
          <div style={{ margin: '30px 0 30px 0' }}>
            {!!rooms && rooms.map((item) => (
              <RoomCard
                key={item.roomId}
                roomId={item.roomId}
                type={item.type}
                minPerson={item.minPerson}
                maxPerson={item.maxPerson}
                numRoom={item.numRoom}
                price={addCommaFromInteger(item.price)}
                handleSelectRooms={(e) => this.handleSelectRooms(e, item.roomId)}
                selectedRooms={selectedRooms}
                isView
              />
            ))}
          </div>
        </div>
      )
    }
  }
}

const mapStateToProps = (state) => {
  const { hotels } = state.hotel

  return {
    hotels,
  }
}

export const mapDispatchToProps = dispatch => ({
  // addHotelRoomProp: (hotelId, roomId, roomType, minPerson, maxPerson, numRoom, roomPrice) => (
  //   dispatch(addHotelRoom(hotelId, roomId, roomType, minPerson, maxPerson, numRoom, roomPrice))
  // )
})

export default connect(mapStateToProps, mapDispatchToProps)(ReserveRoom)
