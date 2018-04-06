import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import {
  Grid,
  Row,
  Col,
  Button,
  FormGroup,
  FormControl,
  ControlLabel,
  Checkbox,
  ListGroup,
} from 'react-bootstrap'
import { HotelCard } from '../commons'
import { isEmpty } from '../utils/utilFunction'

export class ReserveHotel extends Component {
  static propTypes = {
    hotels: PropTypes.array,
    history: PropTypes.object,
  }

  constructor(props, context) {
    super(props, context)

    this.handleChange = this.handleChange.bind(this)
    this.handleChangeCheckbox = this.handleChangeCheckbox.bind(this)

    this.state = {
      hotelName: '',
      minPrice: 0,
      maxPrice: 1000000,
      facilities: {
        'Free breakfast': false,
        'Free wifi': false,
        'Pool': false,
        'Car rest': false,
      },
      filteredHotels: props.hotels,
    }

    this.searchString = ''
  }

  handleChange(e, key) {
    this.setState({ [key]: e.target.value })
  }

  handleChangeCheckbox(e, key) {
    const facility = { ...this.state.facilities, [key]: e.target.checked }
    this.setState({ facilities: facility })
  }

  handleReserveHotel = (hotelId) => {
    const searchStringParams = this.searchString ? '?' + this.searchString : ''
    this.props.history.push({
      pathname: '/reserve-room/' + hotelId,
      search: searchStringParams,
    })
  }

  filterHotel = () => {
    const { hotelName, minPrice, maxPrice, facilities } = this.state
    const { hotels } = this.props
    this.searchString = ''
    let newFilteredHotels = hotels

    if (minPrice && maxPrice) {
      this.searchString = 'min=' + parseInt(minPrice, 10) + '&max=' + parseInt(maxPrice, 10)
      newFilteredHotels = newFilteredHotels.filter((hotel) => (
        !isEmpty(Object.values(hotel.rooms).filter((room) => (
          (room.price >= parseInt(minPrice, 10)) && (room.price <= parseInt(maxPrice, 10))
        )))
      ))
    } else if (maxPrice) {
      this.searchString = 'max=' + parseInt(maxPrice, 10)
      newFilteredHotels = newFilteredHotels.filter((hotel) => (
        !isEmpty(Object.values(hotel.rooms).filter((room) => room.price <= parseInt(maxPrice, 10)))
      ))
    }
    if (hotelName) {
      newFilteredHotels = newFilteredHotels.filter((hotel) => hotel.name.includes(hotelName))
    }
    if (facilities['Free breakfast']) {
      newFilteredHotels = newFilteredHotels.filter((hotel) => hotel.facilities['Free breakfast'])
    }
    if (facilities['Free wifi']) {
      newFilteredHotels = newFilteredHotels.filter((hotel) => hotel.facilities['Free wifi'])
    }
    if (facilities['Pool']) {
      newFilteredHotels = newFilteredHotels.filter((hotel) => hotel.facilities['Pool'])
    }
    if (facilities['Car rest']) {
      newFilteredHotels = newFilteredHotels.filter((hotel) => hotel.facilities['Car rest'])
    }
    this.setState({ filteredHotels: newFilteredHotels })
  }

  render() {
    const { filteredHotels, hotelName, minPrice, maxPrice, facilities } = this.state
    const facilityArr = ['Free breakfast', 'Free wifi', 'Pool', 'Car rest']
    return (
      <div className='container'>
        <div align='center'>
          <h1>Reserve Hotel</h1>
        </div>
        <div className='search-div'>
          <div className='search-sub-div'>
            <FormGroup controlId={'hotelNameSearchInput'}>
              <ControlLabel>{'Hotel name'}</ControlLabel>
              <FormControl
                value={hotelName}
                placeholder={'Hotel name'}
                onChange={(e) => this.handleChange(e, 'hotelName')}
              />
            </FormGroup>
            <FormGroup controlId={'rangePriceSearchInput'}>
              <ControlLabel>{'Range price'}</ControlLabel>
              <Grid>
                <Row className="show-grid">
                  <Col xs={5} md={3} style={{ paddingLeft: '0px' }}>
                    <FormControl
                      type={'number'}
                      value={minPrice}
                      placeholder={'Min price'}
                      onChange={(e) => this.handleChange(e, 'minPrice')}
                    />
                  </Col>
                  <Col xs={5} md={3}>
                    <FormControl
                      type={'number'}
                      value={maxPrice}
                      placeholder={'Max price'}
                      onChange={(e) => this.handleChange(e, 'maxPrice')}
                    />
                  </Col>
                </Row>
              </Grid>
            </FormGroup>
            <FormGroup controlId={'racilitySearchInput'}>
              <div>
                <ControlLabel>{'Facility'}</ControlLabel>
              </div>
              {facilityArr.map((item, index) => (
                <Checkbox
                  inline
                  key={index}
                  checked={facilities[item]}
                  onChange={(e) => this.handleChangeCheckbox(e, item)}
                >
                  {item}
                </Checkbox>
              ))}
            </FormGroup>
            <div style={{ marginLeft: '20px' }} align='center'>
              <Button
                bsStyle="primary"
                onClick={() => this.filterHotel()}
              >
                {`Search`}
              </Button>
            </div>
          </div>
        </div>
        <div style={{ margin: '30px 0 30px 0' }}>
          <ListGroup>
            {!!filteredHotels && filteredHotels.map((item) => (
              <HotelCard
                key={item.hotelId}
                hotelId={item.hotelId}
                name={item.name}
                facilities={item.facilities}
                handleReserveHotel={() => this.handleReserveHotel(item.hotelId)}
                isView
              />
            ))}
          </ListGroup>
        </div>
      </div >
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

export default connect(mapStateToProps)(ReserveHotel)
