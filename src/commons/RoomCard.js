import React from 'react'
import {
  Button,
} from 'react-bootstrap'
import {
  Grid,
  Row,
  Col,
  FormGroup,
  ControlLabel,
  FormControl,
} from 'react-bootstrap'
import PropTypes from 'prop-types'
import './style.css'

const RoomCard = ({
  type,
  minPerson,
  maxPerson,
  numRoom,
  price,
  handleEdit,
  handleBook,
  handleSelectRooms,
  isView,
}) => {
  const room = numRoom + 1
  const roomArr = Array(room).fill(0).map((v, i) => ({
    value: i,
    text: i,
  }))
  return (
    <div className='room-card-div'>
      <Grid>
        <Row className="show-grid">
          <Col xs={6} md={5}>
            <p>{`${type}`}</p>
          </Col>
          <Col xs={6} md={3}>
            <Row className="show-grid">
              <Col xs={12}>
                <p>{`${minPerson} - ${maxPerson} Person`}</p>
              </Col>
              {!isView &&
                <Col xs={12}>
                  <p>{`Number of room: ${numRoom}`}</p>
                </Col>
              }
              <Col xs={12}>
                <p>{`${price} Bath / Day`}</p>
              </Col>
            </Row>
          </Col>
          {isView ?
            (
              <div>
                <Col xs={2} md={1}>
                  <Row className="show-grid">
                    <FormGroup controlId={'numRoomInput'}>
                      <ControlLabel>{'Rooms'}</ControlLabel>
                      <FormControl
                        componentClass={'select'}
                        value={room}
                        onChange={(e) => this.handleChange(e, 'numRoom')}
                      >
                        {
                          !!roomArr && (
                            roomArr.map((item, index) => <option key={index} value={item.value}>{item.text}</option>)
                          )
                        }
                      </FormControl>
                    </FormGroup>
                  </Row>
                </Col>
                <Col xs={2} md={1} xsOffset={1} mdOffset={1}>
                  <Row className="show-grid" style={{ marginTop: '23px' }}>
                    <Button bsStyle="success" onClick={() => handleBook()}>Book now</Button>
                  </Row>
                </Col>
              </div>
            ) : (
              <Col xs={4} md={2} mdOffset={2}>
                <Row className="show-grid">
                  <Col xs={12}>
                    <Button bsStyle="primary" onClick={() => handleEdit()}>Edit</Button>
                  </Col>
                  <Col xs={12} style={{ marginTop: '15px' }}>
                    <Button bsStyle="danger" onClick={() => handleEdit()}>Delete</Button>
                  </Col>
                </Row>
              </Col>
            )
          }
        </Row >
      </Grid >
    </div >
  )
}

RoomCard.propTypes = {
  type: PropTypes.string.isRequired,
  minPerson: PropTypes.number.isRequired,
  maxPerson: PropTypes.number.isRequired,
  numRoom: PropTypes.number.isRequired,
  price: PropTypes.number.isRequired,
  handleEdit: PropTypes.func,
  handleBook: PropTypes.func,
  handleSelectRooms: PropTypes.func,
  isView: PropTypes.bool,
}

RoomCard.defaltProps = {
  handleEdit: () => { },
  handleBook: () => { },
  handleSelectRooms: () => { },
  isView: false,
}

export default RoomCard
