import { 
  GET_PERSON_SUCCESS,
  GET_FACILITY_SUCCESS,
  GET_EXPOSURE_SUCCESS,
  GET_DATA_FAILURE
} from '../actions'

const initialState = {
  person: {val1: undefined, val2: undefined},
  facility: {val3: undefined, val4: undefined},
  exposure: {val5: undefined},
  result: undefined,
}

export default function rootReducer(state = initialState, action) {
  switch (action.type) {
    case GET_PERSON_SUCCESS:
      return { ...state, ...{ person: action.person } }
    case GET_FACILITY_SUCCESS:
      return { ...state, ...{ facility: action.facility } }
    case GET_EXPOSURE_SUCCESS:
      return { ...state, ...{ result: +state.facility.val3 * +action.exposure.val5 } }
    case GET_DATA_FAILURE:
      return { ...state, ...{ result: action.errorMsg } }        
    default:
      return state
  }
}
