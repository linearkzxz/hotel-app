import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import {
  Button,
  FormGroup,
  FormControl,
  ControlLabel,
  Checkbox,
  ListGroup,
  Modal,
} from 'react-bootstrap'
import { HotelCard } from '../commons'
import { addHotelToStore, removeHotel } from '../actions/hotelAction'

export class ManageHotel extends Component {
  static propTypes = {
    hotels: PropTypes.array,
    addHotelProp: PropTypes.func,
    removeHotelProps: PropTypes.func,
  }

  constructor(props) {
    super(props)
    this.state = {
      hotelName: '',
      isHotelNameErr: null,
      facilities: {
        'Free breakfast': false,
        'Free wifi': false,
        'Pool': false,
        'Car rest': false,
      },
      pageType: 'add',
      showConfirmModal: false,
      removehotelId: '',
    }
  }

  handleChange = (e, key) => {
    this.setState({ [key]: e.target.value })
  }

  handleChangeCheckbox = (e, key) => {
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
    setTimeout(() => {
      window.scroll({ top: 0, left: 0, behavior: 'smooth' })
    }, 10);
  }

  handleCancelEditHotel = () => {
    this.setState({
      hotelName: '',
      facilities: {
        'Free breakfast': false,
        'Free wifi': false,
        'Pool': false,
        'Car rest': false,
      },
      pageType: 'add',
    })
  }

  handleManageRoom = (hotelId) => {
    this.props.history.push({
      pathname: '/manage-room/' + hotelId,
    })
  }

  handleRemoveHotel = (hotelId) => {
    this.props.removeHotelProps(hotelId)
    this.handleCancelEditHotel()
    this.setState({ showConfirmModal: false })
  }

  addHotel = (hotelId, name, facilities) => {
    const { pageType } = this.state
    const { addHotelProp, history } = this.props

    if (!name) {
      this.setState({ isHotelNameErr: 'error' })
    } else {
      if (pageType === 'add') {
        addHotelProp(hotelId, name, facilities)
        history.push({
          pathname: '/manage-room/' + hotelId,
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
      hotelIdState,
      removehotelId,
    } = this.state
    const { hotels } = this.props
    const facilityArr = ['Free breakfast', 'Free wifi', 'Pool', 'Car rest']
    const pageTypeWord = pageType === 'add' ? 'Add' : 'Edit'
    let hotelId = pageType === 'add' ? (new Date().getTime()).toString() : hotelIdState
    return (
      <div className='container'>
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
        <FormGroup>
          <div>
            <ControlLabel>{'Facility'}</ControlLabel>
          </div>
          {facilityArr.map((item, index) => <Checkbox inline key={index} checked={facilities[item]} onChange={(e) => this.handleChangeCheckbox(e, item)}>{item}</Checkbox>)}
        </FormGroup>
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
                handleRemoveHotel={() => this.setState({ showConfirmModal: true, removehotelId: item.hotelId })}
              />
            ))}
          </ListGroup>
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
            <Button bsStyle="success" onClick={() => this.handleRemoveHotel(removehotelId)}>Confirm</Button>
            <Button bsStyle="danger" onClick={() => this.setState({ showConfirmModal: false })}>Close</Button>
          </Modal.Footer>
        </Modal>
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
