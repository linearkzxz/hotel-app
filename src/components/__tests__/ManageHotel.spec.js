import React from 'react'
import { shallow } from 'enzyme'
import mockStore from '../../mockStore'
import ConnectManageHotel, { ManageHotel } from '../ManageHotel'

let getComponent
const defaultProps = {
  hotels: [],
  history: {
    push: jest.fn(),
  },
  addHotelProp: jest.fn(),
  removeHotelProps: jest.fn(),
}

describe('ManageHotel', () => {
  beforeEach(() => {
    getComponent = props => shallow(<ManageHotel {...props} />)
  })
  it('should be render correctly when is view mode', () => {
    const mockHotel = [{
      hotelId: '1111',
      name: 'A',
      facilities: {},
    }, {
      hotelId: '2222',
      name: 'B',
      facilities: {},
    }]
    const wrapper = getComponent({ ...defaultProps, hotels: mockHotel })
    expect(wrapper.find('FormGroup').length).toBe(2)
    expect(wrapper.find('ListGroup').length).toBe(1)
    expect(wrapper.find('Button').length).toBe(1)
    expect(wrapper.find('HotelCard').length).toBe(2)
    expect(wrapper.find('ControlLabel').length).toBe(2)
  })
  it('should be render correctly when isHotelNameErr is true', () => {
    const wrapper = getComponent({ ...defaultProps })
    wrapper.setState({ isHotelNameErr: true })
    expect(wrapper.find('ControlLabel').length).toBe(3)
  })
  it('should be render correctly when pageType is edit mode', () => {
    const wrapper = getComponent({ ...defaultProps })
    wrapper.setState({ pageType: 'edit' })
    expect(wrapper.find('Button').length).toBe(2)
  })
  it('should set state correctly when handleChange is called', () => {
    const wrapper = getComponent({ ...defaultProps })
    const mockValue = {
      target: {
        value: '1',
      }
    }
    wrapper.instance().handleChange(mockValue, 'key')
    expect(wrapper.instance().state['key']).toEqual('1')
  })
  it('should set state correctly when handleChangeCheckbox is called', () => {
    const wrapper = getComponent({ ...defaultProps })
    const mockValue = {
      target: {
        checked: true,
      }
    }
    const mockFacilities = {
      'Free breakfast': false,
      'Free wifi': false,
      'Pool': false,
      'Car rest': false,
    }
    const expectValue = {
      'Free breakfast': false,
      'Free wifi': false,
      'Pool': true,
      'Car rest': false,
    }
    wrapper.instance().handleChangeCheckbox(mockValue, 'Pool')
    expect(wrapper.instance().state.facilities).toEqual(expectValue)
  })
  it('should set state correctly when handleEditHotel is called', () => {
    const wrapper = getComponent({ ...defaultProps })
    const mockFacilities = {
      'Free breakfast': true,
      'Free wifi': false,
      'Pool': true,
      'Car rest': false,
    }
    const mockValue = {
      name: 'abc',
      facilities: mockFacilities,
      hotelId: '111111'
    }
    wrapper.instance().handleEditHotel(mockValue)
    expect(wrapper.instance().state.hotelName).toEqual(mockValue.name)
    expect(wrapper.instance().state.facilities).toEqual(mockValue.facilities)
    expect(wrapper.instance().state.hotelId).toEqual(mockValue.hotelId)
    expect(wrapper.instance().state.pageType).toEqual('edit')
  })
  it('should set state correctly when handleCancelEditHotel is called', () => {
    const wrapper = getComponent({ ...defaultProps })
    const mockFacilities = {
      'Free breakfast': false,
      'Free wifi': false,
      'Pool': false,
      'Car rest': false,
    }
    wrapper.instance().handleCancelEditHotel()
    expect(wrapper.instance().state.hotelName).toEqual('')
    expect(wrapper.instance().state.facilities).toEqual(mockFacilities)
    expect(wrapper.instance().state.pageType).toEqual('add')
  })
  it('should go to manage-room/:roomId page', () => {
    const wrapper = getComponent({ ...defaultProps })
    wrapper.instance().handleManageRoom('111111111')
    expect(wrapper.instance().props.history.push).toHaveBeenCalledTimes(1)
  })
  it('should call removeHotelProps, handleCancelEditHotel when handleRemoveHotel is called', () => {
    const wrapper = getComponent({ ...defaultProps })
    wrapper.instance().handleCancelEditHotel = jest.fn()
    wrapper.instance().handleRemoveHotel('1111111')
    expect(defaultProps.removeHotelProps).toHaveBeenCalledTimes(1)
    expect(wrapper.instance().handleCancelEditHotel).toHaveBeenCalledTimes(1)
  })
  it('should go to next page when addHotel is called and pageType is add', () => {
    const wrapper = getComponent({ ...defaultProps })
    const mockFacilities = {
      'Free breakfast': true,
      'Free wifi': false,
      'Pool': true,
      'Car rest': false,
    }
    wrapper.instance().addHotel('1111111', 'Hotel A', mockFacilities)
    expect(defaultProps.addHotelProp).toHaveBeenCalledTimes(1)
    expect(defaultProps.history.push).toHaveBeenCalledTimes(2)
  })
  it('should call addHotelProp, handleCancelEditHotel when addHotel is called and pageType is edit', () => {
    const wrapper = getComponent({ ...defaultProps })
    const mockFacilities = {
      'Free breakfast': true,
      'Free wifi': false,
      'Pool': true,
      'Car rest': false,
    }
    wrapper.instance().setState({ pageType: 'edit' })
    wrapper.instance().handleCancelEditHotel = jest.fn()
    wrapper.instance().addHotel('1111111', 'Hotel A', mockFacilities)
    expect(defaultProps.addHotelProp).toHaveBeenCalledTimes(2)
    expect(wrapper.instance().handleCancelEditHotel).toHaveBeenCalledTimes(1)
  })
  it('should set state isHotelNameErr to error when addHotel is called and name is empty', () => {
    const wrapper = getComponent({ ...defaultProps })
    const mockFacilities = {
      'Free breakfast': true,
      'Free wifi': false,
      'Pool': true,
      'Car rest': false,
    }
    wrapper.instance().setState({ pageType: 'edit' })
    wrapper.instance().handleCancelEditHotel = jest.fn()
    wrapper.instance().addHotel('1111111', '', mockFacilities)
    expect(wrapper.instance().state.isHotelNameErr).toEqual('error')
  })

  it('should handleChange is call when FormControl was change', () => {
    const wrapper = getComponent({ ...defaultProps })
    wrapper.instance().handleChange = jest.fn()
    wrapper.find('FormControl').simulate('change')
    expect(wrapper.instance().handleChange).toHaveBeenCalledTimes(1)
  })

  it('should handleCancelEditHotel is call when Add Hotel Button was click', () => {
    const wrapper = getComponent({ ...defaultProps })
    wrapper.instance().addHotel = jest.fn()
    wrapper.find('Button').first().simulate('click')
    expect(wrapper.instance().addHotel).toHaveBeenCalledTimes(1)
  })

  it('should handleCancelEditHotel is call when Edit Hotel Button was click', () => {
    const wrapper = getComponent({ ...defaultProps })
    wrapper.setState({ pageType: 'edit' })
    wrapper.instance().handleCancelEditHotel = jest.fn()
    wrapper.find('Button').last().simulate('click')
    expect(wrapper.instance().handleCancelEditHotel).toHaveBeenCalledTimes(1)
  })
})

describe('Connect ManageHotel', () => {
  const initialState = {
    hotel: {
      hotels: {
        '111111111': {
          hotelId: '111111111',
          name: 'Hotel A',
          rooms: {
            '111111111111111111': {
              roomId: '111111111111111111',
              type: 'Standard room',
              minPerson: 1,
              maxPerson: 2,
              numRoom: 4,
              price: 600,
            },
            '222222222222222222': {
              roomId: '222222222222222222',
              type: 'Deluxe room',
              minPerson: 3,
              maxPerson: 4,
              numRoom: 4,
              price: 1100,
            },
            '333333333333333333': {
              roomId: '333333333333333333',
              type: 'Superior room',
              minPerson: 5,
              maxPerson: 6,
              numRoom: 2,
              price: 1500,
            },
          },
          facilities: {
            'Free breakfast': true,
            'Free wifi': true,
            'Pool': false,
            'Car rest': false,
          },
        },
      }
    }
  }
  let store
  let getComponent
  beforeEach(() => {
    store = mockStore(initialState)
    store.clearActions()
    getComponent = props => (
      shallow(<ConnectManageHotel store={store} {...props} />)
    )
  })

  it('should Prop matches with initialState from mapStateToProps', () => {
    const wrapper = getComponent(defaultProps)
    wrapper.getElement().props.addHotelProp()
    wrapper.getElement().props.removeHotelProps()
    expect(defaultProps.addHotelProp).toHaveBeenCalledTimes(2)
    expect(defaultProps.removeHotelProps).toHaveBeenCalledTimes(1)
  })
})
