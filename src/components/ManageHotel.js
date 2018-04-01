import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Button } from 'react-bootstrap'
import logo from '../logo.svg'
import '../App.css'
import { addHotelToStore } from '../actions/hotelAction'

class ManageHotel extends Component {

  addHotel = () => {
    const { addHotelProp } = this.props
    addHotelProp()
  }

  render() {
    return (
      <div className="App">
        <p className="App-intro">
          Manage Hotel
        </p>
        <Button bsStyle="primary" onClick={this.addHotel}>Primary</Button>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  const { hotels } = state.hotel

  return {
    hotels,
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
