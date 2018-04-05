import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom"
import { Navbar, Nav, NavItem } from 'react-bootstrap'
import {
  ManageHotel,
  ManageRoom,
  ReserveHotel,
  ReserveRoom,
  NotFound,
} from "./components"
import './App.css'

class App extends Component {
  render() {
    return (
      <div className="App">
        <Router>
          <div>
            <Navbar inverse collapseOnSelect>
              <Navbar.Header>
                <Navbar.Brand>
                  <Link to="/manage-hotel">Agody</Link>
                </Navbar.Brand>
                <Navbar.Toggle />
              </Navbar.Header>
              <Navbar.Collapse>
                <Nav>
                  <NavItem eventKey={1} componentClass="span" style={{ padding: '15px' }}>
                    <Link to="/manage-hotel">Manage Hotel</Link>
                  </NavItem>
                  <NavItem eventKey={2} componentClass="span" style={{ padding: '15px' }}>
                    <Link to="/reserve-hotel">Reserve Hotel</Link>
                  </NavItem>
                </Nav>
              </Navbar.Collapse>
            </Navbar>
            <Switch>
              <Route exact path="/" component={ManageHotel} />
              <Route path="/manage-hotel" component={ManageHotel} />
              <Route path="/manage-room/:hotelId" component={ManageRoom} />
              <Route path="/reserve-hotel" component={ReserveHotel} />
              <Route path="/reserve-room/:hotelId" component={ReserveRoom} />
              <Route component={NotFound} />
            </Switch>

          </div>
        </Router>
      </div >
    );
  }
}

export default App;
