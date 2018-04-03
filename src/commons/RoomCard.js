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

const RoomCard = ({ type, minPerson, maxPerson, numRoom, price, handleEdit }) => {
  return (
    <div className='room-card-div'>
      <Grid>
        <Row className="show-grid">
          <Col xs={12} md={6}>
            <p>{`${type}`}</p>
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
          <Col xs={4} md={2}>
            <Row className="show-grid">
              <Col xs={12}>
                <Button bsStyle="primary" onClick={() => handleEdit()}>Edit</Button>
              </Col>
              <Col xs={12} style={{ marginTop: '15px' }}>
                <Button bsStyle="danger" onClick={() => handleEdit()}>Delete</Button>
              </Col>
            </Row>
          </Col>
        </Row>
      </Grid>
    </div>
  )
}

RoomCard.propTypes = {

}

RoomCard.defaltProps = {

}

export default RoomCard
