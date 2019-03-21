import { call, put, takeLatest, all } from 'redux-saga/effects'
import API from './api'
import { 
  GET_PERSON,
  GET_PERSON_SUCCESS,
  GET_DATA_FAILURE,
  GET_FACILITY_SUCCESS,
  GET_EXPOSURE_SUCCESS
} from './actions'

function getUser(val) {
  return API.get(val)
    .then(response => ({ response }))
}

export function* fetchData(action) {
  try {
    const res = yield getUser(`person/${action.input}`)
    const person = res.data
    yield put({type: GET_PERSON_SUCCESS, person})

    try {
      const res = yield getUser(`facility/${person.val1}`)
      const facility = res.data
      yield put({type: GET_FACILITY_SUCCESS, facility})
      try {
        const res = yield getUser(`exposure/$${person.val2}`)
        const exposure = res.data
        yield put({type: GET_EXPOSURE_SUCCESS, exposure})
  
      } catch (error) {
        const errorMsg = error.message
        yield put({type: GET_DATA_FAILURE, errorMsg: `Could not get exposure! ${errorMsg}`})
      }      

    } catch (error) {
      const errorMsg = error.message
      yield put({type: GET_DATA_FAILURE, errorMsg: `Could not get facility! ${errorMsg}`})
    }
    
  } catch (error) {
    const errorMsg = error.message
    yield put({type: GET_DATA_FAILURE, errorMsg: `Could not get user! ${errorMsg}`})
  }  
}

function* watchFetchData() {
  yield takeLatest(GET_PERSON, fetchData)
}

export default function* rootSaga() {
    yield watchFetchData()
}