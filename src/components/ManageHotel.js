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
  ListGroup,
} from 'react-bootstrap'
import { HotelCard, RoomCard } from '../commons'
import { addHotelToStore, removeHotel } from '../actions/hotelAction'

class ManageHotel extends Component {
  constructor(props, context) {
    super(props, context)

    this.handleChange = this.handleChange.bind(this)

    this.state = {
      hotelName: '',
      isHotelNameErr: null,
      facilities: {
        ['Free breakfast']: false,
        ['Free wifi']: false,
        ['Pool']: false,
        ['Car rest']: false,
      },
      pageType: 'add',
    }
  }

  handleChange(e, key) {
    this.setState({ [key]: e.target.value })
  }

  handleChangeCheckbox(e, key) {
    const facility = { ...this.state.facilities, [key]: e.target.checked }
    this.setState({ facilities: facility })
  }

  handleEditHotel = (item) => {
    this.setState({
      hotelName: item.name,
      facilities: item.facilities,
      pageType: 'edit',
      hotelId: item.hotelId,
    })
    window.scroll({ top: 0, left: 0, behavior: 'smooth' })
  }

  handleCancelEditHotel = () => {
    this.setState({
      hotelName: '',
      facilities: {
        ['Free breakfast']: false,
        ['Free wifi']: false,
        ['Pool']: false,
        ['Car rest']: false,
      },
      pageType: 'add',
    })
  }

  handleManageRoom = (hotelId) => {
    this.props.history.push({
      pathname: '/manage-room',
      state: { hotelId: hotelId }
    })
  }

  handleRemoveHotel = (hotelId) => {
    this.props.removeHotelProps(hotelId)
    this.handleCancelEditHotel()
  }

  addHotel = (hotelId, name, facilities) => {
    const { isHotelNameErr, pageType } = this.state
    const { addHotelProp, history } = this.props

    if (!name) {
      this.setState({ isHotelNameErr: 'error' })
    } else {
      if (pageType === 'add') {
        addHotelProp(hotelId, name, facilities)
        history.push({
          pathname: '/manage-room',
          state: { hotelId: hotelId }
        })
        this.setState({ isHotelNameErr: null })
      }
      else {
        addHotelProp(hotelId, name, facilities)
        this.handleCancelEditHotel()
      }
    }
  }

  render() {
    const {
      isHotelNameErr,
      hotelName,
      facilities,
      pageType,
      hotelId:
      hotelIdState
    } = this.state
    const { history, hotels } = this.props
    const facilityArr = ['Free breakfast', 'Free wifi', 'Pool', 'Car rest']
    const pageTypeWord = pageType === 'add' ? 'Add' : 'Edit'
    let hotelId = ''
    if (pageType === 'add') {
      hotelId = (new Date().getTime()).toString()
    } else {
      hotelId = hotelIdState
    }

    return (
      <div style={{ padding: '0px 50px 0 50px' }} align='left'>
        <div align='center'>
          <h1>Manage Hotel</h1>
        </div>
        <FormGroup controlId={'hotelNameInput'}>
          <ControlLabel>{'Hotel name'}</ControlLabel>
          <FormControl
            value={hotelName}
            placeholder={'Hotel name'}
            onChange={(e) => this.handleChange(e, 'hotelName')}
          />
          {isHotelNameErr && (
            <ControlLabel style={{ color: 'red' }}>{'Hotel name is require.'}</ControlLabel>
          )}
        </FormGroup>
        <div>
          <FormGroup>
            <div>
              <ControlLabel>{'Facility'}</ControlLabel>
            </div>
            {facilityArr.map((item, index) => <Checkbox inline key={index} checked={facilities[item]} onChange={(e) => this.handleChangeCheckbox(e, item)}>{item}</Checkbox>)}
          </FormGroup>
        </div>
        <div align='center'>
          <Button
            bsStyle="success"
            onClick={
              () => this.addHotel(hotelId, hotelName, facilities)
            }
          >{`${pageTypeWord} Hotel`}</Button>
          {
            pageType === 'edit' && (
              <span style={{ marginLeft: '20px' }}>
                <Button
                  bsStyle="danger"
                  onClick={() => { this.handleCancelEditHotel() }}
                >
                  {`Cancel`}
                </Button>
              </span>
            )
          }
        </div>
        <div style={{ margin: '30px 0 30px 0' }}>
          <ListGroup>
            {!!hotels && hotels.map((item) => (
              <HotelCard
                key={item.hotelId}
                hotelId={item.hotelId}
                name={item.name}
                facilities={item.facilities}
                handleEditHotel={() => this.handleEditHotel(item)}
                handleManageRoom={() => this.handleManageRoom(item.hotelId)}
                handleRemoveHotel={() => this.handleRemoveHotel(item.hotelId)}
              />
            ))}
          </ListGroup>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  const { hotels } = state.hotel
  const hotelsArr = Object.values(hotels)
  return {
    hotels: hotelsArr,
  }
}

export const mapDispatchToProps = dispatch => ({
  addHotelProp: (hotelId, name, facilities) => dispatch(addHotelToStore(hotelId, name, facilities)),
  removeHotelProps: (hotelId) => dispatch(removeHotel(hotelId)),
})

export default connect(mapStateToProps, mapDispatchToProps)(ManageHotel)
