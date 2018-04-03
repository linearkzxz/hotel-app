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

class ReserveRoom extends Component {
  static propTypes = {
    location: PropTypes.object.isRequired,
  }

  constructor(props, context) {
    super(props, context);

    this.state = {
      numRoom: 0,
    }
  }

  render() {
    const { hotels, location, addHotelRoomProp, history } = this.props
    const { hotelId = '' } = location.state || {}
    console.log('hotels[hotelId]')
    if (!hotels[hotelId]) {
      history.push({
        pathname: '/reserve-hotel',
      })
      return true
    } else {
      const { name = '', rooms: r = {} } = hotels[hotelId]
      const rooms = Object.values(r)
      return (
        <div className='container'>
          <div align='center'>
            <h1>Reserve Room</h1>
          </div>
          <h2>Pay: </h2>
          <div style={{ margin: '30px 0 30px 0' }}>
            {!!rooms && rooms.map((item) => (
              <RoomCard
                key={item.roomId}
                type={item.type}
                minPerson={item.minPerson}
                maxPerson={item.maxPerson}
                numRoom={item.numRoom}
                price={item.price}
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
