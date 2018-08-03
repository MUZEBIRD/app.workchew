export const users = (state = {
    current: {
      name: ""
    }
  }, action) => {
  console.log("@ user reducer", state, action)
  //GET_BUSINESS_MENUS_SUCCESS

  switch (action.type) {

    case "check_membership_SUCCESS": {

      console.log("check_membership_SUCCESS", state, action)

      var data = action.data

      var {agreement_details, create_time} = data;

      var dayPass = false;

      var cDate = new Date()

      if (create_time) {

        cDate = new Date(create_time)

      }

      var dateDiff = (new Date()).getTime() - cDate;

      if (dateDiff < 86400000) {

        agreementState = "Active"

        dayPass = true
      }

      var agreementState = data.state;

      if (!data.state && dayPass) {

        agreementState = "Active"

      }

      return {
        ...state,
        current: {
          ...state.current,

        },
        agreementState,
        agreement_details
      }

    }
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