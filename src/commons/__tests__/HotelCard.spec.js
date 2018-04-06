import React from 'react'
import { shallow } from 'enzyme'
import HotelCard from '../HotelCard'

let getComponent
const defaultProps = {
  hotelId: '',
  name: '',
  facilities: {
    'Free breakfast': false,
    'Free wifi': false,
    'Pool': false,
    'Car rest': false,
  },
  handleEditHotel: jest.fn(),
  handleManageRoom: jest.fn(),
  handleRemoveHotel: jest.fn(),
  handleReserveHotel: jest.fn(),
  isView: false,
}

describe('HotelCard', () => {
  beforeEach(() => {
    getComponent = props => shallow(<HotelCard {...props} />)
  })
  it('should be render correctly when is view mode', () => {
    const wrapper = getComponent({ ...defaultProps, isView: true })
    expect(wrapper.find('Col').length).toBe(5)
    expect(wrapper.find('Row').length).toBe(3)
    expect(wrapper.find('Button').length).toBe(1)
  })
  it('should be render correctly when is edit mode', () => {
    const wrapper = getComponent({ ...defaultProps })
    expect(wrapper.find('Col').length).toBe(7)
    expect(wrapper.find('Row').length).toBe(3)
    expect(wrapper.find('Button').length).toBe(3)
  })
  it('should call handleReserveHotel when click button in view mode', () => {
    const wrapper = getComponent({ ...defaultProps, isView: true })
    wrapper.find('Button').simulate('click')
    expect(defaultProps.handleReserveHotel).toHaveBeenCalledTimes(1)
  })
  it('should call handleEditHotel when click button in edit mode', () => {
    const wrapper = getComponent({ ...defaultProps })
    wrapper.find('Button').first().simulate('click')
    expect(defaultProps.handleEditHotel).toHaveBeenCalledTimes(1)
  })
  it('should call handleManageRoom when click button in edit mode', () => {
    const wrapper = getComponent({ ...defaultProps })
    wrapper.find('Button').at(1).simulate('click')
    expect(defaultProps.handleManageRoom).toHaveBeenCalledTimes(1)
  })
  it('should call handleRemoveHotel when click button in edit mode', () => {
    const wrapper = getComponent({ ...defaultProps })
    wrapper.find('Button').last().simulate('click')
    expect(defaultProps.handleRemoveHotel).toHaveBeenCalledTimes(1)
  })
})
