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
  roomId,
  type,
  minPerson,
  maxPerson,
  numRoom,
  price,
  handleEdit,
  handleRemove,
  handleBook,
  handleSelectRooms,
  selectedRooms,
  isView,
}) => {
  const room = numRoom + 1
  const roomArr = Array(room).fill(0).map((v, i) => ({
    value: i,
    text: i,
  }))
  const numSelectedRooms = selectedRooms && selectedRooms[roomId] ? selectedRooms[roomId] : 0
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
                <p>{`${price} Baht / Day`}</p>
              </Col>
            </Row>
          </Col>
          {isView ?
            (
              <div>
                <Col xs={2} md={1}>
                  <Row className="show-grid">
                    <FormGroup controlId={'roomsInput'}>
                      <ControlLabel>{'Rooms'}</ControlLabel>
                      <FormControl
                        componentClass={'select'}
                        value={numSelectedRooms}
                        onChange={(e) => handleSelectRooms(e)}
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
                    <Button bsStyle="success" onClick={() => handleBook(numSelectedRooms)}>Book now</Button>
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
                    <Button bsStyle="danger" onClick={() => handleRemove()}>Delete</Button>
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
  roomId: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  minPerson: PropTypes.number.isRequired,
  maxPerson: PropTypes.number.isRequired,
  numRoom: PropTypes.number.isRequired,
  price: PropTypes.string.isRequired,
  handleEdit: PropTypes.func,
  handleRemove: PropTypes.func,
  handleBook: PropTypes.func,
  handleSelectRooms: PropTypes.func,
  selectedRooms: PropTypes.object,
  isView: PropTypes.bool,
}

RoomCard.defaltProps = {
  handleEdit: () => { },
  handleRemove: () => { },
  handleBook: () => { },
  handleSelectRooms: () => { },
  selectedRooms: {},
  isView: false,
}

export default RoomCard
