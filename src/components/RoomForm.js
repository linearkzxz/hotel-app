import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
  Form,
  FormGroup,
  FormControl,
  ControlLabel,
} from 'react-bootstrap'
import './style.css'

class RoomForm extends Component {
  static propTypes = {
    roomType: PropTypes.string,
    minPerson: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]),
    maxPerson: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]),
    numRoom: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]),
    roomPrice: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]),
    handleChange: PropTypes.func,
    isRoomTypeErr: PropTypes.string,
    isMinPersonErr: PropTypes.string,
    isMaxPersonErr: PropTypes.string,
    isNumRoomErr: PropTypes.string,
    isPriceErr: PropTypes.string,
  }

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
      isMinPersonErr,
      isMaxPersonErr,
      isNumRoomErr,
      isPriceErr,
    } = this.props
    return (
      <div align='left'>
        <FormGroup controlId={'roomTypeInput'}>
          <ControlLabel>{'Room type'}</ControlLabel>
          <FormControl
            value={roomType}
            placeholder={'Room type'}
            onChange={(e) => this.handleChange(e, 'roomType')}
          />
          {!!isRoomTypeErr && (
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
                type={'number'}
                value={minPerson}
                placeholder={'Minimum of person'}
                onChange={(e) => this.handleChange(e, 'minPerson')}
              />
              {!!isMinPersonErr && (
                <ControlLabel style={{ color: 'red', display: 'block' }}>{'Minimum person is require.'}</ControlLabel>
              )}
            </FormGroup>
            <span style={{ margin: '0 20px 0 20px' }}>-</span>
            <FormGroup controlId={'maxPersonInput'}>
              <span style={{ marginRight: '10px' }}>
                <ControlLabel>{' maximum person'}</ControlLabel>
              </span>
              <FormControl
                type={'number'}
                value={maxPerson}
                placeholder={'Maximum of person'}
                onChange={(e) => this.handleChange(e, 'maxPerson')}
              />
              {!!isMaxPersonErr && (
                <ControlLabel style={{ color: 'red', display: 'block' }}>{'Maximum person is require.'}</ControlLabel>
              )}
            </FormGroup>
          </Form>
        </div>
        <div className='field-div'>
          <FormGroup controlId={'numRoomInput'}>
            <ControlLabel>{'Number of room'}</ControlLabel>
            <FormControl
              type={'number'}
              value={numRoom}
              placeholder={'Number of room'}
              onChange={(e) => this.handleChange(e, 'numRoom')}
            />
            {!!isNumRoomErr && (
              <ControlLabel style={{ color: 'red' }}>{'Number of room is require.'}</ControlLabel>
            )}
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
            {!!isPriceErr && (
              <ControlLabel style={{ color: 'red' }}>{'Room price is require.'}</ControlLabel>
            )}
          </FormGroup>
        </div>
      </div>
    )
  }
}

export default (RoomForm)
