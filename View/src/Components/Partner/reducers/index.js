export const partners = (state = {
    current: {
      name: ""
    }
  }, action) => {
  console.log("@ partner reducer", state, action)
  //GET_BUSINESS_MENUS_SUCCESS

  switch (action.type) {

    case "GET_PARTNER_SUCCESS": {

      console.log("GET_PARTNER_SUCCESS", state, action)

      var [current] = action.data

      return {
        ...state,
        current
      }

    }
    case "GET_PARTNERS_SUCCESS": {

      return {
        ...state,
      }
    }
    default:
      return state;
  }

}