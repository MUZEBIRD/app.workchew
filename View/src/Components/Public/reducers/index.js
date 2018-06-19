export const users = (state = {
    current: {
      name: ""
    }
  }, action) => {
  console.log("@ user reducer", state, action)
  //GET_BUSINESS_MENUS_SUCCESS

  switch (action.type) {

    case "GET_USER_SUCCESS": {

      console.log("GET_USER_SUCCESS", state, action)

      var current = action.data

      return {
        ...state,
        current
      }

    }
    case "GET_USERS_SUCCESS": {

      return {
        ...state,
      }
    }
    default:
      return state;
  }

}