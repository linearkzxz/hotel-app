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

class ManageRoom extends Component {
  static propTypes = {
    location: PropTypes.object.isRequired,
  }

  constructor(props, context) {
    super(props, context);

    this.handleChange = this.handleChange.bind(this);

    this.state = {
      roomType: '',
      minPerson: 1,
      maxPerson: 1,
      numRoom: 0,
      roomPrice: 0,
      pageType: 'add',
      roomId: '',
    }

  }

  getValidationState() {
    const length = this.state.value.length;
    if (length > 10) return 'success';
    else if (length > 5) return 'warning';
    else if (length > 0) return 'error';
    return null;
  }

  handleChange(e, key) {
    this.setState({ [key]: e.target.value });
  }

  handleEditRoom = (item) => {
    console.log('item', item)
    this.setState({
      roomType: item.type,
      minPerson: item.minPerson,
      maxPerson: item.maxPerson,
      numRoom: item.numRoom,
      roomPrice: item.price,
      pageType: 'edit',
      roomId: item.roomId,
    })
  }

  renderRoom = (rooms) => {
    return (
      rooms.map(item => (
        <div>
          <p>{item.type}</p>
        </div>
      ))
    )
  }

  render() {
    const {
      roomType,
      minPerson,
      maxPerson,
      numRoom,
      roomPrice,
      pageType,
      roomId: roomIdState,
    } = this.state
    const { hotels, location, addHotelRoomProp, history } = this.props
    const { hotelId = '' } = location.state || {}

    if (!hotels[hotelId]) {
      history.push({
        pathname: '/add-hotel',
      })
      return true
    } else {
      const { name = '', rooms: r = {} } = hotels[hotelId]
      const rooms = Object.values(r)
      let roomId = ''
      if (pageType === 'add') {
        roomId = hotelId.toString() + (new Date().getTime()).toString()
      } else {
        roomId = roomIdState
      }
      return (
        <div className='container'>
          <h1>{`Add ${name}'s room`}</h1>
          <div style={{ padding: '20px 50px 0 50px' }} align='center'>
            <RoomForm
              handleChange={this.handleChange}
              roomType={roomType}
              minPerson={minPerson}
              maxPerson={maxPerson}
              numRoom={numRoom}
              roomPrice={roomPrice}
            />
          </div>
          <div align='center'>
            {pageType === 'add' ? (
              <Button
                bsStyle="primary"
                onClick={
                  () => {
                    addHotelRoomProp(hotelId, roomId, roomType, minPerson, maxPerson, numRoom, roomPrice)
                    this.setState({ roomType: '', minPerson: 1, maxPerson: 1, numRoom: 0, roomPrice: 0 })
                  }
                }
              >
                Add room
              </Button>
            ) : (
                <Button
                  bsStyle="primary"
                  onClick={
                    () => {
                      addHotelRoomProp(hotelId, roomId, roomType, minPerson, maxPerson, numRoom, roomPrice)
                      this.setState({ roomType: '', minPerson: 1, maxPerson: 1, numRoom: 0, roomPrice: 0, pageType: 'add' })
                    }
                  }
                >
                  Edit room
              </Button>
              )
            }

          </div>
          <div style={{ margin: '30px 0 30px 0' }}>
            {/* {this.renderRoom(rooms)} */}
            {!!rooms && rooms.map((item) => (
              <RoomCard
                key={item.roomId}
                type={item.type}
                minPerson={item.minPerson}
                maxPerson={item.maxPerson}
                numRoom={item.numRoom}
                price={item.price}
                handleEdit={() => this.handleEditRoom(item)}
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
  addHotelRoomProp: (hotelId, roomId, roomType, minPerson, maxPerson, numRoom, roomPrice) => (
    dispatch(addHotelRoom(hotelId, roomId, roomType, minPerson, maxPerson, numRoom, roomPrice))
  )
})

export default connect(mapStateToProps, mapDispatchToProps)(ManageRoom)
