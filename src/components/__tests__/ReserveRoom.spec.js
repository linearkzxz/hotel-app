import React from 'react'
import { shallow } from 'enzyme'
import mockStore from '../../mockStore'
import ConnectReserveRoom, { ReserveRoom } from '../ReserveRoom'

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
  location: {
    search: '',
  },
  bookedRoomProps: jest.fn(),
}

describe('ReserveRoom', () => {
  beforeEach(() => {
    getComponent = props => shallow(<ReserveRoom {...props} />)
  })
  it('should go to not found page when hotels is empty', () => {
    const wrapper = getComponent({ ...defaultProps, hotels: {} })
    expect(defaultProps.history.replace).toHaveBeenCalledTimes(1)
  })
  it('should be render correctly', () => {
    const wrapper = getComponent({ ...defaultProps })
    expect(wrapper.find('RoomCard').length).toBe(2)
  })

  it('should set selectedRooms, selectedRoomsId state when handleSelectRooms is called', () => {
    const wrapper = getComponent({ ...defaultProps })
    const mockValue = {
      target: {
        value: '1',
      }
    }
    wrapper.instance().handleSelectRooms(mockValue, '111111111111111111')
    expect(wrapper.instance().state.selectedRooms['111111111111111111']).toEqual('1')
    expect(wrapper.instance().state.selectedRoomsId).toEqual('111111111111111111')
  })
  it('should set showAlertSuccess state when bookedRoomFunc is called', () => {
    const wrapper = getComponent({ ...defaultProps })
    wrapper.instance().bookedRoomFunc('11111111', '123456789', 2)
    expect(defaultProps.bookedRoomProps).toHaveBeenCalledTimes(1)
    expect(wrapper.instance().state.showAlertSuccess).toEqual('success')
    expect(wrapper.instance().state.selectedRooms).toEqual({})
    expect(wrapper.instance().state.selectedRoomsId).toEqual('')
  })

  it('should set showAlertSuccess state to danger when bookedRoomFunc is called with 0 selected room', () => {
    const wrapper = getComponent({ ...defaultProps })
    wrapper.instance().bookedRoomFunc('11111111', '123456789', 0)
    expect(defaultProps.bookedRoomProps).toHaveBeenCalledTimes(1)
    expect(wrapper.instance().state.showAlertSuccess).toEqual('danger')
  })
})

describe('Connect ReserveRoom', () => {
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
      shallow(<ConnectReserveRoom store={store} {...props} />)
    )
  })

  it('should Prop matches with initialState from mapStateToProps', () => {
    const wrapper = getComponent(defaultProps)
    wrapper.getElement().props.bookedRoomProps()
    expect(defaultProps.bookedRoomProps).toHaveBeenCalledTimes(1)
  })
})
