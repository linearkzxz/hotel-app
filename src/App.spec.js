import React from 'react'
import { shallow } from 'enzyme'
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom"
import { Navbar, Nav, NavItem } from 'react-bootstrap'
import App from './App'

describe('App', () => {
  it('should be render correctly', () => {
    const wrapper = shallow(<App />)
    expect(wrapper.find(Router).length).toBe(1)
    expect(wrapper.find(Route).length).toBe(6)
    expect(wrapper.find(Switch).length).toBe(1)
    expect(wrapper.find(Link).length).toBe(3)
    expect(wrapper.find(Navbar).length).toBe(1)
    expect(wrapper.find(NavItem).length).toBe(2)
  })
})
