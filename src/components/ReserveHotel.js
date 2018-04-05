import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  Grid,
  Row,
  Col,
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

class ReserveHotel extends Component {
  constructor(props, context) {
    super(props, context)

    // this.handleChange = this.handleChange.bind(this)

    this.state = {
      hotelName: '',
      facilities: {
        ['Free breakfast']: false,
        ['Free wifi']: false,
        ['Pool']: false,
        ['Car rest']: false,
      },
    }
  }

  handleReserveHotel = (hotelId) => {
    this.props.history.push({
      pathname: '/reserve-room/' + hotelId,
    })
  }

  render() {
    const { hotelName, facilities } = this.state
    const { history, hotels } = this.props
    const facilityArr = ['Free breakfast', 'Free wifi', 'Pool', 'Car rest']
    return (
      <div className='container'>
        <div align='center'>
          <h1>Reserve Hotel</h1>
        </div>
        <div className='search-div'>
          <div className='search-sub-div'>
            <FormGroup controlId={'hotelNameInput'}>
              <ControlLabel>{'Hotel name'}</ControlLabel>
              <FormControl
                value={''}
                placeholder={'Hotel name'}
                onChange={(e) => this.handleChange(e, 'hotelName')}
              />
            </FormGroup>
            <FormGroup controlId={'rangePriceInput'}>
              <ControlLabel>{'Range price'}</ControlLabel>
              <Grid>
                <Row className="show-grid">
                  <Col xs={5} md={3} style={{ paddingLeft: '0px' }}>
                    <FormControl
                      value={''}
                      placeholder={'Min price'}
                      onChange={(e) => this.handleChange(e, 'hotelName')}
                    />
                  </Col>
                  <Col xs={5} md={3}>
                    <FormControl
                      value={''}
                      placeholder={'Max price'}
                      onChange={(e) => this.handleChange(e, 'hotelName')}
                    />
                  </Col>
                </Row>
              </Grid>
            </FormGroup>
            <FormGroup>
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
                onClick={() => {

                }}
              >
                {`Search`}
              </Button>
            </div>
          </div>
        </div>
        <div style={{ margin: '30px 0 30px 0' }}>
          <ListGroup>
            {!!hotels && hotels.map((item) => (
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

export const mapDispatchToProps = dispatch => ({
  // addHotelProp: (hotelId, name, facilities) => dispatch(addHotelToStore(hotelId, name, facilities)),
  // removeHotelProps: (hotelId) => dispatch(removeHotel(hotelId)),
})

export default connect(mapStateToProps, mapDispatchToProps)(ReserveHotel)
