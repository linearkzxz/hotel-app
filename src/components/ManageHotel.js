import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Button } from 'react-bootstrap'
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom"
import AddHotel from './AddHotel'
import { FieldGroup } from '../commons'
import { addHotelToStore } from '../actions/hotelAction'

class ManageHotel extends Component {

  addHotel = () => {
    const { addHotelProp } = this.props
    addHotelProp()
  }

  render() {

    return (
      <div>
        <div>
          <div>
            <p className="App-intro">
              Manage Hotel
              </p>
            <Button bsStyle="primary" onClick={() => { this.props.history.push('/add-hotel') }}>Foo</Button>
          </div>
        </div>
        {/* </div> */}
        {/* <div className="App"> */}
        {/* <p className="App-intro">
          Manage Hotel
        </p>
        <FieldGroup
          id="hotelNameInput"
          type="text"
          label="Hotel name"
          placeholder="Enter text"
        />
        <FieldGroup
          id="roomTypeInput"
          type="text"
          label="Room type"
          placeholder="Enter text"
        />
        <FieldGroup
          id="roomTypeInput"
          type="select"
          label="Room type"
          placeholder="select"
        />
        <Button bsStyle="primary" onClick={this.addHotel}>Primary</Button> */}

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
