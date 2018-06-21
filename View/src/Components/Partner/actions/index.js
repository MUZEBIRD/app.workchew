export const GET_PARTNER = 'GET_PARTNER'

export const getPartner = (config) => (dispatch, getState) => {

  return dispatch({

    type: GET_PARTNER,
    config
  })

}

export const GET_PARTNERS = 'GET_PARTNERS'

export const getPartners = (config) => (dispatch, getState) => {

  return dispatch({

    type: GET_PARTNERS,
    config
  })

}

export const POST_PARTNER = 'POST_PARTNER'

export const postPartner = (config) => (dispatch, getState) => {

  return dispatch({

    type: POST_PARTNER,
    config
  })

}

export const PUT_PARTNER = 'PUT_PARTNER'

export const putPartner = (config) => (dispatch, getState) => {
console.log("configconfigconfigconfigconfigconfigconfigconfigconfigconfigconfigconfigconfigconfig", config)
  return dispatch({

    type: PUT_PARTNER,
    config
  })

}