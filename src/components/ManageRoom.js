import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Button, Modal } from 'react-bootstrap'
import { RoomCard } from '../commons'
import { addHotelRoom, removeRoom } from '../actions/hotelAction'
import RoomForm from './RoomForm'
import { addCommaFromInteger, isEmpty } from '../utils/utilFunction'

export class ManageRoom extends Component {
  static propTypes = {
    addHotelRoomProp: PropTypes.func,
    match: PropTypes.object,
    hotels: PropTypes.object,
    history: PropTypes.object,
  }

  constructor(props) {
    super(props)
    this.state = {
      roomType: '',
      minPerson: '',
      maxPerson: '',
      numRoom: '',
      roomPrice: '',
      pageType: 'add',
      roomId: '',
      isRoomTypeErr: null,
      isMinPersonErr: null,
      isMaxPersonErr: null,
      isNumRoomErr: null,
      isPriceErr: null,
      showConfirmModal: false,
      removeRoomId: '',
    }
  }

  checkValidation = () => {
    let validateError = {}
    if (!this.state.roomType) {
      validateError = { ...validateError, isRoomTypeErr: 'error' }
    }
    if (!this.state.minPerson) {
      validateError = { ...validateError, isMinPersonErr: 'error' }
    }
    if (!this.state.maxPerson) {
      validateError = { ...validateError, isMaxPersonErr: 'error' }
    }
    if (!this.state.numRoom) {
      validateError = { ...validateError, isNumRoomErr: 'error' }
    }
    if (!this.state.roomPrice) {
      validateError = { ...validateError, isPriceErr: 'error' }
    }
    if (!isEmpty(validateError)) {
      this.setState({ isRoomTypeErr: null, isMinPersonErr: null, isMaxPersonErr: null, isNumRoomErr: null, isPriceErr: null, ...validateError })
      return false
    }
    this.setState({ isRoomTypeErr: null, isMinPersonErr: null, isMaxPersonErr: null, isNumRoomErr: null, isPriceErr: null })
    return true
  }

  handleChange = (e, key) => {
    this.setState({ [key]: e.target.value });
  }

  handleCancelEditRoom = () => {
    this.setState({ roomType: '', minPerson: '', maxPerson: '', numRoom: '', roomPrice: '', pageType: 'add' })
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
      showConfirmModal: false,
    })
    setTimeout(() => {
      window.scroll({ top: 0, left: 0, behavior: 'smooth' })
    }, 10);
  }

  handleRemoveRoom = (hotelId, roomId) => {
    this.props.removeRoomProps(hotelId, roomId)
    this.handleCancelEditRoom()
    this.setState({ showConfirmModal: false })
  }

  submitForm = (hotelId, roomId) => {
    const {
      roomType,
      minPerson,
      maxPerson,
      numRoom,
      roomPrice,
      pageType,
    } = this.state
    const { addHotelRoomProp } = this.props
    if (this.checkValidation()) {
      addHotelRoomProp(hotelId, roomId, roomType, minPerson, maxPerson, numRoom, roomPrice)
      if (pageType === 'add') {
        this.setState({ roomType: '', minPerson: '', maxPerson: '', numRoom: '', roomPrice: '' })
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
      isMinPersonErr,
      isMaxPersonErr,
      isNumRoomErr,
      isPriceErr,
      removeRoomId,
    } = this.state
    const { match, hotels, history } = this.props
    const hotelId = match.params.hotelId
    const pageTypeWord = pageType === 'add' ? 'Add' : 'Edit'
    if (!hotels[hotelId]) {
      history.replace({
        pathname: '/not-found',
      })
      return true
    } else {
      const { name = '', rooms: r = {} } = hotels[hotelId]
      const rooms = Object.values(r)
      const roomId = pageType === 'add' ? hotelId.toString() + (new Date().getTime()).toString() : roomIdState
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
              isMinPersonErr={isMinPersonErr}
              isMaxPersonErr={isMaxPersonErr}
              isNumRoomErr={isNumRoomErr}
              isPriceErr={isPriceErr}
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
                minPerson={addCommaFromInteger(item.minPerson)}
                maxPerson={addCommaFromInteger(item.maxPerson)}
                numRoom={addCommaFromInteger(item.numRoom)}
                price={addCommaFromInteger(item.price)}
                handleEdit={() => this.handleEditRoom(item)}
                handleRemove={() => this.setState({ showConfirmModal: true, removeRoomId: item.roomId })}
              />
            ))}
          </div>
          <Modal
            show={this.state.showConfirmModal}
            onHide={this.handleHide}
            container={this}
            aria-labelledby="contained-modal-title"
          >
            <Modal.Header closeButton>
              <Modal.Title id="contained-modal-title">
                Confirm delete?
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              Are you sure you want to delete this item?
            </Modal.Body>
            <Modal.Footer>
              <Button bsStyle="success" onClick={() => this.handleRemoveRoom(hotelId, removeRoomId)}>Confirm</Button>
              <Button bsStyle="danger" onClick={() => this.setState({ showConfirmModal: false })}>Close</Button>
            </Modal.Footer>
          </Modal>
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
  ),
  removeRoomProps: (hotelId, roomId) => dispatch(removeRoom(hotelId, roomId))
})

export default connect(mapStateToProps, mapDispatchToProps)(ManageRoom)
