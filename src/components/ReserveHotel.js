import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  Button,
  Form,
  FormGroup,
  FormControl,
  ControlLabel,
  HelpBlock,
  Checkbox,
  ListGroup,
} from 'react-bootstrap'
import { HotelCard, RoomCard } from '../commons'
import { addHotelToStore, removeHotel } from '../actions/hotelAction'

class ReserveHotel extends Component {

  handleReserveHotel = (hotelId) => {
    this.props.history.push({
      pathname: '/reserve-room',
      state: { hotelId: hotelId }
    })
  }

  render() {
    const { history, hotels } = this.props

    return (
      <div style={{ padding: '0px 50px 0 50px' }}>
        <div align='center'>
          <h1>Reserve Hotel</h1>
        </div>
        <div style={{ margin: '30px 0 30px 0' }}>
          <ListGroup>
            {!!hotels && hotels.map((item) => (
              <HotelCard
                key={item.hotelId}
                hotelId={item.hotelId}
                name={item.name}
                facilities={item.facilities}
                handleReserveHotel={() => this.handleReserveHotel(item.hotelId)}
                isView
              />
            ))}
          </ListGroup>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  const { hotels } = state.hotel
  const hotelsArr = Object.values(hotels)
  return {
    hotels: hotelsArr,
  }
}

export const mapDispatchToProps = dispatch => ({
  // addHotelProp: (hotelId, name, facilities) => dispatch(addHotelToStore(hotelId, name, facilities)),
  // removeHotelProps: (hotelId) => dispatch(removeHotel(hotelId)),
})

export default connect(mapStateToProps, mapDispatchToProps)(ReserveHotel)
