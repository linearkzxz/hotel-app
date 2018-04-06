import React from 'react'
import { shallow } from 'enzyme'
import mockStore from '../../mockStore'
import RoomForm from '../RoomForm'

let getComponent
const defaultProps = {
  roomType: 'Star room',
  minPerson: 1,
  maxPerson: 3,
  numRoom: 10,
  roomPrice: 500,
  isRoomTypeErr: '',
  handleChange: jest.fn(),
}

describe('RoomForm', () => {
  beforeEach(() => {
    getComponent = props => shallow(<RoomForm {...props} />)
  })
  it('should be render correctly', () => {
    const wrapper = getComponent({ ...defaultProps })
    expect(wrapper.find('FormGroup').length).toBe(5)
    expect(wrapper.find('ControlLabel').length).toBe(5)
  })
  it('should be render correctly when isRoomTypeErr have error', () => {
    const wrapper = getComponent({ ...defaultProps, isRoomTypeErr: 'error' })
    expect(wrapper.find('FormGroup').length).toBe(5)
    expect(wrapper.find('ControlLabel').length).toBe(6)
  })

  it('should set state correctly when handleChange is called', () => {
    const wrapper = getComponent({ ...defaultProps })
    const mockValue = {
      target: {
        value: '1',
      }
    }
    wrapper.instance().handleChange(mockValue, 'key')
    expect(defaultProps.handleChange).toHaveBeenCalledTimes(1)
  })

  it('should handleChange is call when FormControl was change', () => {
    const wrapper = getComponent({ ...defaultProps })
    wrapper.instance().handleChange = jest.fn()
    wrapper.find('FormControl').map((item) => item.simulate('change'))
    expect(wrapper.instance().handleChange).toHaveBeenCalledTimes(5)
  })
})
