import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  Button,
  Form,
  FormGroup,
  FormControl,
  ControlLabel,
  HelpBlock,
} from 'react-bootstrap'
import { RoomCard } from '../commons'
import { addHotelToStore } from '../actions/hotelAction'

class AddHotel extends Component {
  constructor(props, context) {
    super(props, context);

    this.handleChange = this.handleChange.bind(this);

    this.state = {
      hotelName: '',
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

  addHotel = (name) => {
    const { addHotelProp, history } = this.props
    addHotelProp(name)
    history.push({
      pathname: '/add-room',
      state: { hotelId: name }
    })
  }

  render() {
    const { hotels } = this.props
    const numRoomArr = Array(20).fill(0).map((v, i) => ({
      value: i + 1,
      text: i + 1,
    }))

    console.log('hotels', hotels)

    return (
      <div style={{ padding: '0px 50px 0 50px' }} align='left'>
        <div align='center'>
          <p>Manage Hotel</p>
        </div>
        <FormGroup controlId={'hotelNameInput'}>
          <ControlLabel>{'Hotel name'}</ControlLabel>
          <FormControl
            value={this.state.hotelName}
            placeholder={'Hotel name'}
            onChange={(e) => this.handleChange(e, 'hotelName')}
          />
        </FormGroup>
        <div align='center'>
          <Button
            bsStyle="primary"
            onClick={
              () => this.addHotel(this.state.hotelName)
            }
          >Add Hotel</Button>
        </div>
        <RoomCard
          type={'Standard roomStandard roomStandard roomStandard roomStandard roomStandard roomStandard roomStandard roomStandard roomStandard roomStandard roomStandard roomStandard room'}
          minPerson={'1'}
          maxPerson={'2'}
          numRoom={'4'}
          price={'1,000'}
        />
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
  addHotelProp: (name) => dispatch(addHotelToStore(name)),
})

export default connect(mapStateToProps, mapDispatchToProps)(AddHotel)
