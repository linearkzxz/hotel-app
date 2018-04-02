import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Button } from 'react-bootstrap'
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom"
import AddHotel from './AddHotel'
import { RoomCard } from '../commons'
import { addHotelToStore } from '../actions/hotelAction'

class ManageHotel extends Component {

  addHotel = () => {
    const { addHotelProp } = this.props
    addHotelProp()
  }

  render() {
    const { hotels } = this.props
    console.log('hotels', hotels)
    return (
      <div className='container'>
        <h1 className="App-intro">Manage Hotel</h1>
        <div style={{ margin: '20px 0 20px 0' }}>
          <Button bsStyle="primary" onClick={() => { this.props.history.push('/add-hotel') }}>Add hotel</Button>
        </div>
        <div style={{ margin: '30px 0 30px 0' }}>
          {!!hotels && hotels.map((item) => (
            <p>{item.name}</p>
          ))}
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
  addHotelProp: productID => dispatch(addHotelToStore(productID)),
  // changeTempProduct: (product, quantity) => dispatch(addTempProductToCart(product, quantity)),
  // setProductToTempProduct: () => dispatch(setProductToTempProductInCart()),
  // setTempProductToProduct: () => dispatch(setTempProductToProductInCart()),
  // emptyCart: () => dispatch(emptyCartAction()),
})

export default connect(mapStateToProps, mapDispatchToProps)(ManageHotel)
