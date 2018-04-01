import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  Button,
  FormGroup,
  FormControl,
  ControlLabel,
  HelpBlock,
} from 'react-bootstrap'
import { FieldGroup } from '../commons'
import { addHotelToStore } from '../actions/hotelAction'

class AddHotel extends Component {
  constructor(props, context) {
    super(props, context);

    this.handleChange = this.handleChange.bind(this);

    this.state = {
      hotelName: '',
      roomType: '',
      numRoom: 0,
    };
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

  addHotel = (name, roomType, numRoom) => {
    const { addHotelProp } = this.props
    addHotelProp(name, roomType, numRoom)
  }

  render() {
    const { hotels } = this.props
    const numRoomArr = Array(20).fill(0).map((v, i) => ({
      value: i + 1,
      text: i + 1,
    }))

    console.log('hotels', hotels)

    return (
      <div>
        <p>
          Manage Hotel
        </p>
        <FormGroup controlId={'hotelNameInput'}>
          <ControlLabel>{'Hotel name'}</ControlLabel>
          <FormControl
            value={this.state.hotelName}
            placeholder={'Hotel name'}
            onChange={(e) => this.handleChange(e, 'hotelName')}
          />
        </FormGroup>
        <FormGroup controlId={'roomTypeInput'}>
          <ControlLabel>{'Room type'}</ControlLabel>
          <FormControl
            value={this.state.roomType}
            placeholder={'Room type'}
            onChange={(e) => this.handleChange(e, 'roomType')}
          />
        </FormGroup>
        <FormGroup controlId={'numRoomInput'}>
          <ControlLabel>{'Room type'}</ControlLabel>
          <FormControl
            componentClass={'select'}
            placeholder={'Room type'}
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
        {/* <FieldGroup
          id="hotelNameInput"
          type="text"
          onRef={() => this.hotelNameInput}
          label="Hotel name"
          placeholder="Enter text"
        /> */}
        {/* <FieldGroup
          id="roomTypeInput"
          type="select"
          placeholder="select"
         optionArray={numRoomArr}
        /> */}
        <Button
          bsStyle="primary"
          onClick={
            () => this.addHotel(this.state.hotelName, this.state.roomType, this.state.numRoom)
          }
        >Primary</Button>
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
  addHotelProp: (name, roomType, numRoom) => dispatch(addHotelToStore(name, roomType, numRoom)),
  // changeTempProduct: (product, quantity) => dispatch(addTempProductToCart(product, quantity)),
  // setProductToTempProduct: () => dispatch(setProductToTempProductInCart()),
  // setTempProductToProduct: () => dispatch(setTempProductToProductInCart()),
  // emptyCart: () => dispatch(emptyCartAction()),
})

export default connect(mapStateToProps, mapDispatchToProps)(AddHotel)
