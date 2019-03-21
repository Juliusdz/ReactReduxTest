export const GET_PERSON = 'GET_PERSON'
export const GET_PERSON_SUCCESS = 'GET_PERSON_SUCCESS'
export const GET_FACILITY = 'GET_FACILITY'
export const GET_FACILITY_SUCCESS = 'GET_FACILITY_SUCCESS'
export const GET_EXPOSURE = 'GET_EXPOSURE'
export const GET_EXPOSURE_SUCCESS = 'GET_EXPOSURE_SUCCESS'
export const GET_DATA_FAILURE = 'GET_DATA_FAILURE'

export const getPerson = input => ({
    type: GET_PERSON,
    input
})

export const getFacility = value => ({
    type: GET_FACILITY,
    person: value
})

export const getExposure = value => ({
    type: GET_EXPOSURE,
    value
})