export const GET_USER = 'GET_USER'

export const getUser = (config) => (dispatch, getState) => {

  return dispatch({

    type: GET_USER,
    config
  })

}

export const checkMembership = (user) => (dispatch, getState) => {

  return dispatch({

    type: "FETCH_DATA",
    requestName: "FETCH_DATA",
    config: {
      url: "/user/check-membership?_id=" + user._id,
      method: "GET"
    }
  })

}

export const GET_USERS = 'GET_USERS'

export const getUsers = (config) => (dispatch, getState) => {

  return dispatch({

    type: GET_USERS,
    config
  })

}

export const POST_USER = 'POST_USER'

export const postUser = (config) => (dispatch, getState) => {

  return dispatch({

    type: POST_USER,
    config
  })

}

export const PUT_USER = 'PUT_USER'

export const putUser = (config) => (dispatch, getState) => {

  return dispatch({

    type: PUT_USER,
    config
  })

}