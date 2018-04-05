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
  Alert,
} from 'react-bootstrap'
import { RoomCard } from '../commons'
import { bookedRoom } from '../actions/hotelAction'
import RoomForm from './RoomForm'
import { addCommaFromInteger } from '../utils/utilFunction'

class ReserveRoom extends Component {
  static propTypes = {
  }

  constructor(props, context) {
    super(props, context);

    this.handleSelectRooms = this.handleSelectRooms.bind(this);

    this.state = {
      selectedRooms: {},
      selectedRoomsId: '',
      showAlertSuccess: null,
    }
  }

  handleSelectRooms(e, roomId) {
    this.setState({
      selectedRooms: { [roomId]: e.target.value },
      selectedRoomsId: roomId
    });
  }

  bookedRoomFunc = (hotelId, roomId, numSelectedRooms) => {
    const { bookedRoomProps, history } = this.props
    if (numSelectedRooms) {
      bookedRoomProps(hotelId, roomId, numSelectedRooms)
      this.setState({ showAlertSuccess: 'success', selectedRooms: 0, selectedRoomsId: '' })
    } else {
      this.setState({ showAlertSuccess: 'danger' })
    }
    setTimeout(() => {
      this.setState({ showAlertSuccess: null })
    }, 3000)
  }

  showAlert = (showAlertSuccess) => {
    if (showAlertSuccess === 'success') {
      return (
        <Alert bsStyle={showAlertSuccess}>
          <strong>Booked success.</strong>
        </Alert>
      )
    } else if (showAlertSuccess === 'danger') {
      return (
        <Alert bsStyle={showAlertSuccess}>
          <strong>Please select rooms.</strong>
        </Alert>
      )
    }
  }

  render() {
    const { selectedRooms, selectedRoomsId, showAlertSuccess } = this.state
    const { match, hotels, history } = this.props
    const hotelId = match.params.hotelId
    if (!hotels[hotelId]) {
      history.push({
        pathname: '/not-found',
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
          {this.showAlert(showAlertSuccess)}
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
                handleBook={(numSelectedRooms) => this.bookedRoomFunc(hotelId, item.roomId, numSelectedRooms)}
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
  bookedRoomProps: (hotelId, roomId, numSelectedRooms) => (
    dispatch(bookedRoom(hotelId, roomId, numSelectedRooms))
  )
})

export default connect(mapStateToProps, mapDispatchToProps)(ReserveRoom)
