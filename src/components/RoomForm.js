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
} from 'react-bootstrap'
import { FieldGroup } from '../commons'
import { addHotelRoom } from '../actions/hotelAction'
import './style.css'

class RoomForm extends Component {
  handleChange(e, key) {
    this.props.handleChange(e, key)
  }

  render() {
    const {
      hotels,
      roomType,
      minPerson,
      maxPerson,
      numRoom,
      roomPrice,
      isRoomTypeErr,
    } = this.props
    const numRoomArr = Array(20).fill(0).map((v, i) => ({
      value: i + 1,
      text: i + 1,
    }))
    return (
      <div align='left'>
        <FormGroup controlId={'roomTypeInput'}>
          <ControlLabel>{'Room type'}</ControlLabel>
          <FormControl
            value={roomType}
            placeholder={'Room type'}
            onChange={(e) => this.handleChange(e, 'roomType')}
          />
          {isRoomTypeErr && (
            <span style={{ color: 'red' }}>
              <ControlLabel>{'Room type is require.'}</ControlLabel>
            </span>
          )}
        </FormGroup>
        <div className='field-div'>
          <Form inline>
            <FormGroup controlId={'minPersonInput'}>
              <span style={{ marginRight: '10px' }}>
                <ControlLabel>{'minimum person'}</ControlLabel>
              </span>
              <FormControl
                componentClass={'select'}
                value={minPerson}
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
                value={maxPerson}
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
        </div>
        <div className='field-div'>
          <FormGroup controlId={'numRoomInput'}>
            <ControlLabel>{'Number of room'}</ControlLabel>
            <FormControl
              componentClass={'select'}
              value={numRoom}
              onChange={(e) => this.handleChange(e, 'numRoom')}
            >
              {
                !!numRoomArr && (
                  numRoomArr.map((item, index) => <option key={index} value={item.value}>{item.text}</option>)
                )
              }
            </FormControl>
          </FormGroup>
        </div>
        <div>
          <FormGroup>
            <Checkbox inline>dfdfdfdfdfdfdfdfdfdfdfdfdfdfdf1</Checkbox>
            <Checkbox inline>dfdfdfdfdfdfdfdfdfdfdf2</Checkbox>
            <Checkbox inline>dfdfdfdfdfdfdfdfdfdfdf2</Checkbox>
            <Checkbox inline>dfdfdfdfdfdfdfdfdfdfdf2</Checkbox>
            <Checkbox inline>dfdfdfdfdfdfdfdfdfdfdf2</Checkbox>
            <Checkbox inline>dfdfdfdfdfdfdfdfdfdfdf2</Checkbox>
            <Checkbox inline>dfdfdfdfdfdfdfdfdfdfdf3</Checkbox>
          </FormGroup>
        </div>
        <div className='field-div'>
          <FormGroup controlId={'roomPriceInput'}>
            <ControlLabel>{'Room price (Bath / day)'}</ControlLabel>
            <FormControl
              type={'number'}
              value={roomPrice}
              placeholder={'Room price'}
              onChange={(e) => this.handleChange(e, 'roomPrice')}
            />
          </FormGroup>
        </div>
      </div>
    )
  }
}

export default (RoomForm)
