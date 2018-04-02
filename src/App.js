import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Link, NavLink } from "react-router-dom"
import { Navbar, Nav, NavItem, NavDropdown, Button, Jumbotron, MenuItem } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import {
  ManageHotel,
  ReserveHotel,
  AddHotel,
  ManageRoom,
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
                  <a href="#brand">React-Bootstrap</a>
                </Navbar.Brand>
                <Navbar.Toggle />
              </Navbar.Header>
              <Navbar.Collapse>
                <Nav>
                  <NavItem eventKey={1}>
                    <Link to="/manage-hotel">Manage Hotel</Link>
                  </NavItem>
                  <NavItem eventKey={2} href="/reserver-hotel">
                    Manage Hotel
                  </NavItem>
                  <NavDropdown eventKey={3} title="Dropdown" id="basic-nav-dropdown">
                    <MenuItem eventKey={3.1}>Action</MenuItem>
                    <MenuItem eventKey={3.2}>Another action</MenuItem>
                    <MenuItem eventKey={3.3}>Something else here</MenuItem>
                    <MenuItem divider />
                    <MenuItem eventKey={3.3}>Separated link</MenuItem>
                  </NavDropdown>
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
            <Route exact path="/" component={ManageHotel} />
            <Route path="/manage-hotel" component={ManageHotel} />
            <Route path="/reserver-hotel" component={ReserveHotel} />
            <Route path="/add-hotel" component={AddHotel} />
            <Route path="/add-room" component={ManageRoom} />
          </div>
        </Router>
      </div>
    );
  }
}

export default App;


// <Router>
// <div>
//   <ul>
//     <li>
//       <Link to="/">Home</Link>
//     </li>
//     <li>
//       <Link to="/manage-hotel">Manage Hotel</Link>
//     </li>
//     <li>
//       <Link to="/topics">Topics</Link>
//     </li>
//   </ul>

//   <hr />

//   {/* <Route exact path="/" component={Home} /> */}
//   <Route path="/manage-hotel" component={ManageHotel} />
// </div>
// </Router>