import React from 'react'
import { shallow } from 'enzyme'
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom"
import { Navbar, Nav, NavItem } from 'react-bootstrap'
import NotFound from '../NotFound'

let getComponent

describe('App', () => {
  beforeEach(() => {
    getComponent = props => shallow(<NotFound {...props} />)
  })
  it('should be render correctly', () => {
    const wrapper = getComponent()
    expect(wrapper.find('div').length).toBe(1)
    expect(wrapper.find('h3').length).toBe(1)
  })
})
