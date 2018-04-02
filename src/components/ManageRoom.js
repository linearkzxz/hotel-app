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
    location: PropTypes.string.isRequired,
  }

  constructor(props, context) {
    super(props, context);
    const { location, history } = props
    if (!location || !location.state || !location.state.hotelId) {
      history.push({
        pathname: '/add-hotel',
      })
    }

    this.handleChange = this.handleChange.bind(this);

    this.state = {
      roomType: '',
      minPerson: 1,
      maxPerson: 1,
      numRoom: 0,
      roomPrice: 0,
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
    const { hotels, location, addHotelRoomProp } = this.props
    const { hotelId } = location.state
    const { rooms } = hotels[location.state.hotelId]
    console.log('render rooms', rooms)
    return (
      <div className='container'>
        <h1>{`Add ${hotelId}'s room`}</h1>
        <div style={{ padding: '20px 50px 0 50px' }} align='center'>
          <RoomForm
            handleChange={this.handleChange}
            roomType={this.state.roomType}
            minPerson={this.state.minPerson}
            maxPerson={this.state.maxPerson}
            numRoom={this.state.numRoom}
            roomPrice={this.state.roomPrice}
          />
        </div>
        {/* <FormGroup controlId={'roomTypeInput'}>
          <ControlLabel>{'Room type'}</ControlLabel>
          <FormControl
            value={this.state.roomType}
            placeholder={'Room type'}
            onChange={(e) => this.handleChange(e, 'roomType')}
          />
        </FormGroup>
        <Form inline>
          <FormGroup controlId={'minPersonInput'}>
            <span style={{ marginRight: '10px' }}>
              <ControlLabel>{'minimum person'}</ControlLabel>
            </span>
            <FormControl
              componentClass={'select'}
              value={this.state.minPerson}
              onChange={(e) => this.handleChange(e, 'minPerson')}
            >
              {
                !!numRoomArr && (
                  numRoomArr.map((item, index) => <option key={index} value={item.value}>{item.text}</option>)
                )
              }
            </FormControl>
          </FormGroup>
          <span style={{ margin: '0 20px 0 20px' }}>-</span>
          <FormGroup controlId={'maxPersonInput'}>
            <span style={{ marginRight: '10px' }}>
              <ControlLabel>{' maximum person'}</ControlLabel>
            </span>
            <FormControl
              componentClass={'select'}
              value={this.state.maxPerson}
              onChange={(e) => this.handleChange(e, 'maxPerson')}
            >
              {
                !!numRoomArr && (
                  numRoomArr.map((item, index) => <option key={index} value={item.value}>{item.text}</option>)
                )
              }
            </FormControl>
          </FormGroup>
        </Form>
        <FormGroup controlId={'numRoomInput'}>
          <ControlLabel>{'Room type'}</ControlLabel>
          <FormControl
            componentClass={'select'}
            value={this.state.numRoom}
            onChange={(e) => this.handleChange(e, 'numRoom')}
          >
            {
              !!numRoomArr && (
                numRoomArr.map((item, index) => <option key={index} value={item.value}>{item.text}</option>)
              )
            }
          </FormControl>
        </FormGroup>
        <FormGroup controlId={'roomPriceInput'}>
          <ControlLabel>{'Room price'}</ControlLabel>
          <FormControl
            type={'number'}
            value={this.state.roomPrice}
            placeholder={'Room price'}
            onChange={(e) => this.handleChange(e, 'roomPrice')}
          />
        </FormGroup> */}
        <div align='center'>
          <Button
            bsStyle="primary"
            onClick={
              () => {
                addHotelRoomProp(hotelId, this.state.roomType, this.state.minPerson, this.state.maxPerson, this.state.numRoom, this.state.roomPrice)
                this.setState({ roomType: '', minPerson: 1, maxPerson: 1, numRoom: 0, roomPrice: 0 })
              }
            }
          >
            Add room
          </Button>
        </div>
        <div style={{ marginTop: '30px' }}>
          {/* {this.renderRoom(rooms)} */}
          {!!rooms && rooms.map((item) => (
            <RoomCard
              type={item.type}
              minPerson={item.minPerson}
              maxPerson={item.maxPerson}
              numRoom={item.numRoom}
              price={item.price}
            />
          ))}
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  const { hotels } = state.hotel

  return {
    hotels,
  }
}

export const mapDispatchToProps = dispatch => ({
  addHotelRoomProp: (hotelId, roomType, minPerson, maxPerson, numRoom, roomPrice) => dispatch(addHotelRoom(hotelId, roomType, minPerson, maxPerson, numRoom, roomPrice)),
})

export default connect(mapStateToProps, mapDispatchToProps)(ManageRoom)
