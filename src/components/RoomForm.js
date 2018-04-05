import React, { Component } from 'react'
import {
  Form,
  FormGroup,
  FormControl,
  ControlLabel,
} from 'react-bootstrap'
import './style.css'

class RoomForm extends Component {
  handleChange(e, key) {
    this.props.handleChange(e, key)
  }

  render() {
    const {
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
            <ControlLabel style={{ color: 'red' }}>{'Room type is require.'}</ControlLabel>
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
        <div className='field-div'>
          <FormGroup controlId={'roomPriceInput'}>
            <ControlLabel>{'Room price (Baht / day)'}</ControlLabel>
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
