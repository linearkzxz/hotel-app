import React from 'react'
import {
  Button,
} from 'react-bootstrap'
import {
  Grid,
  Row,
  Col,
} from 'react-bootstrap'
import PropTypes from 'prop-types'
import './style.css'

const RoomCard = ({ type, minPerson, maxPerson, numRoom, price }) => {

  return (
    <div className='room-card-div'>
      <Grid>
        <Row className="show-grid">
          <Col xs={12} md={6}>
            <p style={{}}>{`${type}`}</p>
          </Col>
          <Col xs={8} md={4}>
            <Row className="show-grid">
              <Col xs={12}>
                <p>{`${minPerson} - ${maxPerson} Person`}</p>
              </Col>
              <Col xs={12}>
                <p>{`Number of room: ${numRoom}`}</p>
              </Col>
              <Col xs={12}>
                <p>{`${price} Bath / Day`}</p>
              </Col>
            </Row>
          </Col>
          <Col xs={4} md={2} style={{ textAlign: 'center' }}>
            <Row className="show-grid">
              <Col xs={12}>
                <Button>Edit</Button>
              </Col>
            </Row>
          </Col>
        </Row>
      </Grid>
    </div>
  )
}

RoomCard.propTypes = {
  id: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  label: PropTypes.string,
  help: PropTypes.string,
  placeholder: PropTypes.string,
  optionArray: PropTypes.array
}

RoomCard.defaltProps = {
  label: '',
  help: '',
  placeholder: '',
  optionArray: [],
}

export default RoomCard
