import React from 'react'
import { shallow } from 'enzyme'
import mockStore from '../../mockStore'
import ConnectManageRoom, { ManageRoom } from '../ManageRoom'

let getComponent
const defaultProps = {
  match: {
    params: {
      hotelId: '1234'
    }
  },
  hotels: {
    ['1234']: {
      rooms: {
        '111111111111111111': {
          roomId: '111111111111111111',
          type: 'Deluxe room',
          minPerson: 1,
          maxPerson: 2,
          numRoom: 5,
          price: 400,
        },
        '222222222222222222': {
          roomId: '222222222222222222',
          type: 'Superior room',
          minPerson: 3,
          maxPerson: 4,
          numRoom: 5,
          price: 800,
        },
      },
    }
  },
  history: {
    push: jest.fn(),
    replace: jest.fn(),
  },
  addHotelRoomProp: jest.fn(),
  removeRoomProps: jest.fn(),
}

describe('ManageRoom', () => {
  beforeEach(() => {
    getComponent = props => shallow(<ManageRoom {...props} />)
  })
  it('should go to not found page when hotels is empty', () => {
    const wrapper = getComponent({ ...defaultProps, hotels: {} })
    expect(defaultProps.history.replace).toHaveBeenCalledTimes(1)
  })
  it('should be render correctly', () => {
    const wrapper = getComponent({ ...defaultProps })
    expect(wrapper.find('RoomForm').length).toBe(1)
    expect(wrapper.find('Button').length).toBe(4)
    expect(wrapper.find('RoomCard').length).toBe(2)
    expect(wrapper.find('Modal').length).toBe(1)
  })

  it('should submitForm is call when click add room button', () => {
    const wrapper = getComponent({ ...defaultProps })
    wrapper.instance().submitForm = jest.fn()
    wrapper.find('Button').first().simulate('click')
    expect(wrapper.instance().submitForm).toHaveBeenCalledTimes(1)
  })
  it('should handleCancelEditRoom is call when click cancel edit room button', () => {
    const wrapper = getComponent({ ...defaultProps })
    wrapper.instance().handleCancelEditRoom = jest.fn()
    wrapper.setState({ pageType: 'edit' })
    wrapper.find('Button').at(1).simulate('click')
    expect(wrapper.instance().handleCancelEditRoom).toHaveBeenCalledTimes(1)
  })
  it('should go to back page when click back button', () => {
    const wrapper = getComponent({ ...defaultProps })
    wrapper.find('Button').at(1).simulate('click')
    expect(defaultProps.history.push).toHaveBeenCalledTimes(1)
  })

  it('should set isRoomTypeErr state to error when checkValidation is called and roomType is empty', () => {
    const wrapper = getComponent({ ...defaultProps })
    wrapper.instance().checkValidation()
    expect(wrapper.instance().state.isRoomTypeErr).toEqual('error')
    expect(wrapper.instance().state.isMinPersonErr).toEqual('error')
    expect(wrapper.instance().state.isMaxPersonErr).toEqual('error')
    expect(wrapper.instance().state.isNumRoomErr).toEqual('error')
    expect(wrapper.instance().state.isPriceErr).toEqual('error')
  })
  it('should set isRoomTypeErr state to null when checkValidation is called and roomType is not empty', () => {
    const wrapper = getComponent({ ...defaultProps })
    wrapper.setState({ roomType: '1212', minPerson: '1', maxPerson: '2', numRoom: '10', roomPrice: '1000' })
    wrapper.instance().checkValidation()
    expect(wrapper.instance().state.isRoomTypeErr).toEqual(null)
    expect(wrapper.instance().state.isMinPersonErr).toEqual(null)
    expect(wrapper.instance().state.isMaxPersonErr).toEqual(null)
    expect(wrapper.instance().state.isNumRoomErr).toEqual(null)
    expect(wrapper.instance().state.isPriceErr).toEqual(null)
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
  it('should set state correctly when handleCancelEditRoom is called', () => {
    const wrapper = getComponent({ ...defaultProps })
    const mockValue = {
      target: {
        value: '1',
      }
    }
    wrapper.instance().handleCancelEditRoom()
    expect(wrapper.instance().state.roomType).toEqual('')
    expect(wrapper.instance().state.minPerson).toEqual('')
    expect(wrapper.instance().state.maxPerson).toEqual('')
    expect(wrapper.instance().state.numRoom).toEqual('')
    expect(wrapper.instance().state.roomPrice).toEqual('')
    expect(wrapper.instance().state.pageType).toEqual('add')
  })
  it('should set state correctly when handleEditRoom is called', () => {
    const wrapper = getComponent({ ...defaultProps })
    const mockValue = {
      type: 'Star room',
      minPerson: 1,
      maxPerson: 2,
      numRoom: 10,
      price: 500,
      roomId: '111111111',
    }
    wrapper.instance().handleEditRoom(mockValue)
    expect(wrapper.instance().state.roomType).toEqual(mockValue.type)
    expect(wrapper.instance().state.minPerson).toEqual(mockValue.minPerson)
    expect(wrapper.instance().state.maxPerson).toEqual(mockValue.maxPerson)
    expect(wrapper.instance().state.numRoom).toEqual(mockValue.numRoom)
    expect(wrapper.instance().state.roomPrice).toEqual(mockValue.price)
    expect(wrapper.instance().state.roomId).toEqual(mockValue.roomId)
    expect(wrapper.instance().state.pageType).toEqual('edit')
  })
  it('should call removeRoomProps, handleCancelEditRoom when handleRemoveRoom is called', () => {
    const wrapper = getComponent({ ...defaultProps })
    wrapper.instance().handleCancelEditRoom = jest.fn()
    wrapper.instance().handleRemoveRoom('1111111', '1212121211212212')
    expect(defaultProps.removeRoomProps).toHaveBeenCalledTimes(1)
    expect(wrapper.instance().handleCancelEditRoom).toHaveBeenCalledTimes(1)
  })
  it('should call addHotelRoomProp when submitForm is called and validate is fine', () => {
    const wrapper = getComponent({ ...defaultProps })
    wrapper.instance().checkValidation = () => true
    wrapper.instance().submitForm('1111111', '1212121211212212')
    expect(defaultProps.addHotelRoomProp).toHaveBeenCalledTimes(1)
  })
  it('should call handleCancelEditRoom when submitForm is called and pageType is edit mode', () => {
    const wrapper = getComponent({ ...defaultProps })
    wrapper.instance().checkValidation = () => true
    wrapper.setState({ pageType: 'edit' })
    wrapper.instance().handleCancelEditRoom = jest.fn()
    wrapper.instance().submitForm('1111111', '1212121211212212')
    expect(wrapper.instance().handleCancelEditRoom).toHaveBeenCalledTimes(1)
  })
  it('should handleRemoveRoom is call when Confirm remove room Button was click in modal', () => {
    const wrapper = getComponent({ ...defaultProps })
    wrapper.setState({ pageType: 'edit', showConfirmModal: true })
    wrapper.instance().handleRemoveRoom = jest.fn()
    wrapper.find('Button').at(2).simulate('click')
    expect(wrapper.instance().handleRemoveRoom).toHaveBeenCalledTimes(1)
  })
  it('should hide modal when Close Button was click in modal', () => {
    const wrapper = getComponent({ ...defaultProps })
    wrapper.setState({ pageType: 'edit', showConfirmModal: true })
    wrapper.find('Button').at(3).simulate('click')
    expect(wrapper.instance().state.showConfirmModal).toEqual(false)
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
      shallow(<ConnectManageRoom store={store} {...props} />)
    )
  })

  it('should Prop matches with initialState from mapStateToProps', () => {
    const wrapper = getComponent(defaultProps)
    wrapper.getElement().props.addHotelRoomProp()
    wrapper.getElement().props.removeRoomProps()
    expect(defaultProps.addHotelRoomProp).toHaveBeenCalledTimes(2)
    expect(defaultProps.removeRoomProps).toHaveBeenCalledTimes(1)
  })
})
