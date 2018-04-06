import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Alert } from 'react-bootstrap'
import { RoomCard } from '../commons'
import { bookedRoom } from '../actions/hotelAction'
import { addCommaFromInteger, getParams } from '../utils/utilFunction'

export class ReserveRoom extends Component {
  static propTypes = {
    bookedRoomProps: PropTypes.func,
    match: PropTypes.object,
    hotels: PropTypes.object,
    history: PropTypes.object,
    location: PropTypes.object,
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
    const { bookedRoomProps } = this.props
    if (numSelectedRooms) {
      bookedRoomProps(hotelId, roomId, numSelectedRooms)
      this.setState({ showAlertSuccess: 'success', selectedRooms: {}, selectedRoomsId: '' })
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
    const { match, hotels, history, location } = this.props
    const hotelId = match.params.hotelId
    const {
      min: searchMin = -999999999999999,
      max: searchMax = 999999999999999,
    } = getParams(location.search)

    if (!hotels[hotelId]) {
      history.replace({
        pathname: '/not-found',
      })
      return true
    } else {
      const { name = '', rooms: roomsObj = {} } = hotels[hotelId]
      const rooms = Object.values(roomsObj)
      const filteredRooms = rooms.filter(room => (
        (room.price >= parseInt(searchMin, 10)) && (room.price <= parseInt(searchMax, 10))
      ))
      const payBaht = selectedRoomsId ? selectedRooms[selectedRoomsId] * roomsObj[selectedRoomsId].price : 0

      return (
        <div className='container'>
          <div align='center'>
            <h1>Reserve Room</h1>
          </div>
          <h1>{name}</h1>
          <h2>{`Pay: ${addCommaFromInteger(payBaht)} Baht`}</h2>
          {this.showAlert(showAlertSuccess)}
          <div style={{ margin: '30px 0 30px 0' }}>
            {!!filteredRooms && filteredRooms.map((item) => (
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
