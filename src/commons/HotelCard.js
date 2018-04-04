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

const HotelCard = ({
  hotelId,
  name,
  facilities,
  handleEditHotel,
  handleManageRoom,
  handleRemoveHotel,
  handleReserveHotel,
  isView
}) => {
  var facilitiesKeys = Object.keys(facilities);
  var facilitiesAviliable = facilitiesKeys.filter((key) => facilities[key])
  return (
    <div className='room-card-div'>
      <Grid>
        <Row className="show-grid">
          <Col xs={12} md={8}>
            <Row className="show-grid">
              <Col xs={12}>
                <p>{`${name}`}</p>
              </Col>
              <Col xs={12}>
                <p>{`Facilities`}</p>
                {!!facilitiesAviliable && (
                  facilitiesAviliable.map((item, index) => <ul key={index}>{`${item} `}</ul>)
                )}
              </Col>
            </Row>
          </Col>
          {isView ?
            (
              <Col xs={12} md={2}>
                <Row className="show-grid" style={{ marginTop: '20px' }}>
                  <Col xs={12}>
                    <Button bsStyle="primary" onClick={() => handleReserveHotel()}>Reserve hotel</Button>
                  </Col>
                </Row>
              </Col>
            ) : (
              <Col xs={12} md={2}>
                <Row className="show-grid">
                  <Col xs={12}>
                    <Button bsStyle="primary" onClick={() => handleEditHotel()}>Edit hotel</Button>
                  </Col>
                  <Col xs={12} style={{ marginTop: '15px' }}>
                    <Button bsStyle="primary" onClick={() => handleManageRoom()}>Manage room</Button>
                  </Col>
                  <Col xs={12} style={{ marginTop: '15px' }}>
                    <Button bsStyle="danger" onClick={() => handleRemoveHotel()}>Remove hotel</Button>
                  </Col>
                </Row>
              </Col>
            )}
        </Row>
      </Grid>
    </div>
  )
}

HotelCard.propTypes = {
  hotelId: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  facilities: PropTypes.object.isRequired,
  handleEditHotel: PropTypes.func,
  handleManageRoom: PropTypes.func,
  handleRemoveHotel: PropTypes.func,
  isView: PropTypes.bool,
}

HotelCard.defaltProps = {
  handleEditHotel: () => { },
  handleManageRoom: () => { },
  handleRemoveHotel: () => { },
  isView: false,
}

export default HotelCard
