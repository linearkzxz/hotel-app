import React from 'react'
import { shallow } from 'enzyme'
import mockStore from '../../mockStore'
import ConnectReserveHotel, { ReserveHotel } from '../ReserveHotel'

let getComponent
const defaultProps = {
  hotels: [],
  history: {
    push: jest.fn(),
  },
  addHotelProp: jest.fn(),
  removeHotelProps: jest.fn(),
}

const mockHotels = [
  {
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
  {
    hotelId: '222222222',
    name: 'Hotel B',
    rooms: {
      '111111111111111111': {
        roomId: '111111111111111111',
        type: 'Standard room',
        minPerson: 1,
        maxPerson: 2,
        numRoom: 5,
        price: 800,
      },
      '222222222222222222': {
        roomId: '222222222222222222',
        type: 'Double bed room',
        minPerson: 1,
        maxPerson: 2,
        numRoom: 5,
        price: 1000,
      },
      '333333333333333333': {
        roomId: '333333333333333333',
        type: 'Deluxe room',
        minPerson: 3,
        maxPerson: 4,
        numRoom: 3,
        price: 1400,
      },
      '444444444444444444': {
        roomId: '444444444444444444',
        type: 'Deluxe special room',
        minPerson: 3,
        maxPerson: 4,
        numRoom: 3,
        price: 1600,
      },
    },
    facilities: {
      'Free breakfast': true,
      'Free wifi': true,
      'Pool': true,
      'Car rest': true,
    },
  },
]

describe('ReserveHotel', () => {
  beforeEach(() => {
    getComponent = props => shallow(<ReserveHotel {...props} />)
  })
  it('should be render correctly', () => {
    const wrapper = getComponent({ ...defaultProps, hotels: mockHotels })
    expect(wrapper.find('FormGroup').length).toBe(3)
    expect(wrapper.find('ListGroup').length).toBe(1)
    expect(wrapper.find('Button').length).toBe(1)
    expect(wrapper.find('HotelCard').length).toBe(2)
    expect(wrapper.find('Checkbox').length).toBe(4)
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
  it('should go to reserve-room page when handleReserveHotel is called', () => {
    const wrapper = getComponent({ ...defaultProps })
    wrapper.instance().handleReserveHotel('11111111')
    expect(defaultProps.history.push).toHaveBeenCalledTimes(1)
  })
  it('should filter data correctly when filterHotel is called with A params', () => {
    const expectMock = [{ "facilities": { "Car rest": true, "Free breakfast": true, "Free wifi": true, "Pool": true }, "hotelId": "222222222", "name": "Hotel B", "rooms": { "111111111111111111": { "maxPerson": 2, "minPerson": 1, "numRoom": 5, "price": 800, "roomId": "111111111111111111", "type": "Standard room" }, "222222222222222222": { "maxPerson": 2, "minPerson": 1, "numRoom": 5, "price": 1000, "roomId": "222222222222222222", "type": "Double bed room" }, "333333333333333333": { "maxPerson": 4, "minPerson": 3, "numRoom": 3, "price": 1400, "roomId": "333333333333333333", "type": "Deluxe room" }, "444444444444444444": { "maxPerson": 4, "minPerson": 3, "numRoom": 3, "price": 1600, "roomId": "444444444444444444", "type": "Deluxe special room" } } }]
    const wrapper = getComponent({ ...defaultProps, hotels: mockHotels })
    wrapper.setState({
      hotelName: 'Hotel B',
      minPrice: 1000,
      maxPrice: 1500,
      facilities: {
        'Free breakfast': true,
        'Free wifi': true,
        'Pool': true,
        'Car rest': true,
      }
    })
    wrapper.instance().filterHotel()
    expect(wrapper.instance().state.filteredHotels).toEqual(expectMock)
  })

  it('should filter data correctly when filterHotel is called with B params', () => {
    const expectMock = [{ "facilities": { "Car rest": false, "Free breakfast": true, "Free wifi": true, "Pool": false }, "hotelId": "111111111", "name": "Hotel A", "rooms": { "111111111111111111": { "maxPerson": 2, "minPerson": 1, "numRoom": 4, "price": 600, "roomId": "111111111111111111", "type": "Standard room" }, "222222222222222222": { "maxPerson": 4, "minPerson": 3, "numRoom": 4, "price": 1100, "roomId": "222222222222222222", "type": "Deluxe room" }, "333333333333333333": { "maxPerson": 6, "minPerson": 5, "numRoom": 2, "price": 1500, "roomId": "333333333333333333", "type": "Superior room" } } }]
    const wrapper = getComponent({ ...defaultProps, hotels: mockHotels })
    wrapper.setState({
      hotelName: 'Hotel A',
      maxPrice: 700,
    })
    wrapper.instance().filterHotel()
    expect(wrapper.instance().state.filteredHotels).toEqual(expectMock)
  })

  it('should handleChange is call when FormControl was change', () => {
    const wrapper = getComponent({ ...defaultProps })
    wrapper.instance().handleChange = jest.fn()
    wrapper.find('FormControl').map((item) => item.simulate('change'))
    expect(wrapper.instance().handleChange).toHaveBeenCalledTimes(3)
  })
  it('should handleChangeCheckbox is call when Checkbox was change', () => {
    const wrapper = getComponent({ ...defaultProps })
    wrapper.instance().handleChangeCheckbox = jest.fn()
    wrapper.find('Checkbox').map((item) => item.simulate('change'))
    expect(wrapper.instance().handleChangeCheckbox).toHaveBeenCalledTimes(4)
  })
  it('should filterHotel is call when Button was click', () => {
    const wrapper = getComponent({ ...defaultProps })
    wrapper.instance().filterHotel = jest.fn()
    wrapper.find('Button').simulate('click')
    expect(wrapper.instance().filterHotel).toHaveBeenCalledTimes(1)
  })
})

describe('Connect ReserveHotel', () => {
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
      shallow(<ConnectReserveHotel store={store} {...props} />)
    )
  })

  it('should Prop matches with initialState from mapStateToProps', () => {
    const wrapper = getComponent(defaultProps)
    expect(wrapper.getElement().props.hotels).toEqual(Object.values(initialState.hotel.hotels))
  })
})
