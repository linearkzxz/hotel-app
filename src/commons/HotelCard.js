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

const HotelCard = ({ hotelId, name, handleEdit }) => {
  return (
    <div className='room-card-div'>
      <Grid>
        <Row className="show-grid">
          <Col xs={12} md={8}>
            <p style={{}}>{`${name}`}</p>
          </Col>
          <Col xs={12} md={2}>
            <Button onClick={() => handleEdit()}>Manage room</Button>
          </Col>
        </Row>
      </Grid>
    </div>
  )
}

HotelCard.propTypes = {

}

HotelCard.defaltProps = {

}

export default HotelCard
