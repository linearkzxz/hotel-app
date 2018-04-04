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
      numRoom: 1,
      roomPrice: 0,
      pageType: 'add',
      roomId: '',
      isRoomTypeErr: null,
    }
  }

  checkValidation = () => {
    if (!this.state.roomType) {
      this.setState({ isRoomTypeErr: 'error' })
      return false
    }
    this.setState({ isRoomTypeErr: null })
    return true
  }

  handleChange(e, key) {
    this.setState({ [key]: e.target.value });
  }

  handleEditRoom = (item) => {
    this.setState({
      roomType: item.type,
      minPerson: item.minPerson,
      maxPerson: item.maxPerson,
      numRoom: item.numRoom,
      roomPrice: item.price,
      pageType: 'edit',
      roomId: item.roomId,
    })
    window.scroll({ top: 0, left: 0, behavior: 'smooth' });
  }

  handleCancelEditRoom = () => {
    this.setState({ roomType: '', minPerson: 1, maxPerson: 1, numRoom: 0, roomPrice: 0, pageType: 'add' })
  }

  submitForm = (hotelId, roomId) => {
    const {
      roomType,
      minPerson,
      maxPerson,
      numRoom,
      roomPrice,
      pageType,
      roomId: roomIdState,
    } = this.state
    const { addHotelRoomProp } = this.props
    if (this.checkValidation()) {
      addHotelRoomProp(hotelId, roomId, roomType, minPerson, maxPerson, numRoom, roomPrice)
      if (pageType === 'add') {
        this.setState({ roomType: '', minPerson: 1, maxPerson: 1, numRoom: 0, roomPrice: 0 })
      } else {
        this.handleCancelEditRoom()
      }
    }
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
      isRoomTypeErr,
    } = this.state
    const { hotels, location, addHotelRoomProp, history } = this.props
    const { hotelId = '' } = location.state || {}
    const pageTypeWord = pageType === 'add' ? 'Add' : 'Edit'
    if (!hotels[hotelId]) {
      history.push({
        pathname: '/manage-hotel',
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
          <h1>{`${pageTypeWord} ${name}'s room`}</h1>
          <div style={{ padding: '20px 50px 0 50px' }} align='center'>
            <RoomForm
              handleChange={this.handleChange}
              handleChangeCheckbox={this.handleChangeCheckbox}
              roomType={roomType}
              minPerson={minPerson}
              maxPerson={maxPerson}
              numRoom={numRoom}
              roomPrice={roomPrice}
              isRoomTypeErr={isRoomTypeErr}
            />
          </div>
          <div align='center'>
            <Button
              bsStyle="success"
              onClick={() => { this.submitForm(hotelId, roomId) }}
            >
              {`${pageTypeWord} room`}
            </Button>
            {
              pageType === 'edit' ? (
                <span style={{ marginLeft: '20px' }}>
                  <Button
                    bsStyle="danger"
                    onClick={() => { this.handleCancelEditRoom() }}
                  >
                    {`Cancel`}
                  </Button>
                </span>
              ) : (
                  <span style={{ marginLeft: '20px' }}>
                    <Button
                      bsStyle="info"
                      onClick={() => {
                        history.push({
                          pathname: '/manage-hotel',
                          state: { hotelId: hotelId }
                        })
                      }}
                    >
                      {`Back`}
                    </Button>
                  </span>
                )
            }
          </div>
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
