import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch, Link, NavLink } from "react-router-dom"
import { Navbar, Nav, NavItem, NavDropdown, Button, Jumbotron, MenuItem } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import {
  ManageHotel,
  ManageRoom,
  ReserveHotel,
  ReserveRoom,
  NotFound,
} from "./components"
import logo from './logo.svg'
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
                  <NavItem eventKey={1}>
                    <Link to="/manage-hotel">Manage Hotel</Link>
                  </NavItem>
                  <NavItem eventKey={2}>
                    <Link to="/reserve-hotel">Reserve Hotel</Link>
                  </NavItem>
                </Nav>
              </Navbar.Collapse>
            </Navbar>
            {/* <div className="App">
              <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <h1 className="App-title">Welcome to React</h1>
              </header>
              <p className="App-intro">
                To get started, edit <code>src/App.js</code> and save to reload.
              </p>

            </div> */}
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
      </div>
    );
  }
}

export default App;
