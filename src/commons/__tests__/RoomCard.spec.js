import React from 'react'
import { shallow } from 'enzyme'
import RoomCard from '../RoomCard'

let getComponent
const defaultProps = {
  roomId: '',
  type: '',
  minPerson: 1,
  maxPerson: 2,
  numRoom: 20,
  price: '500',
  facilities: {
    'Free breakfast': false,
    'Free wifi': false,
    'Pool': false,
    'Car rest': false,
  },
  handleEdit: jest.fn(),
  handleRemove: jest.fn(),
  handleBook: jest.fn(),
  handleSelectRooms: jest.fn(),
  selectedRooms: {},
  isView: false,
}

describe('HotelCard', () => {
  beforeEach(() => {
    getComponent = props => shallow(<RoomCard {...props} />)
  })
  it('should be render correctly when is view mode', () => {
    const wrapper = getComponent({ ...defaultProps, isView: true })
    expect(wrapper.find('Col').length).toBe(6)
    expect(wrapper.find('Row').length).toBe(4)
    expect(wrapper.find('Button').length).toBe(1)
  })
  it('should be render correctly when is edit mode', () => {
    const wrapper = getComponent({ ...defaultProps })
    expect(wrapper.find('Col').length).toBe(8)
    expect(wrapper.find('Row').length).toBe(3)
    expect(wrapper.find('Button').length).toBe(2)
  })
  it('should call handleBook when click button in view mode', () => {
    const wrapper = getComponent({ ...defaultProps, isView: true })
    wrapper.find('Button').simulate('click')
    expect(defaultProps.handleBook).toHaveBeenCalledTimes(1)
  })
  it('should call handleEdit when click button in edit mode', () => {
    const wrapper = getComponent({ ...defaultProps })
    wrapper.find('Button').first().simulate('click')
    expect(defaultProps.handleEdit).toHaveBeenCalledTimes(1)
  })
  it('should call handleRemove when click button in edit mode', () => {
    const wrapper = getComponent({ ...defaultProps })
    wrapper.find('Button').last().simulate('click')
    expect(defaultProps.handleRemove).toHaveBeenCalledTimes(1)
  })
})
