import { CALL_API } from '../middleware/'


export const GET_PARTNER = 'GET_PARTNER'
export const GET_PARTNER_SUCCESS = 'GET_PARTNER_SUCCESS'
export const GET_PARTNER_FAILURE = 'GET_PARTNER_FAILURE'

const partnersPath = "/partners"

const getPartnersActionCreator = (config) => ({

  type: GET_PARTNER,
  config
})

export const getPartner = (config) => (dispatch, getState) => {

  return dispatch(getPartnersActionCreator(config))
}
