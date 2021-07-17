const initialState = {
  user: null,
  isFetching: false,
  error: false,
};

const loginReducer = (state = initialState, actions) => {
  switch (actions.type) {
    case "LOGIN_START":
      return {
        user: null,
        isFetching: true,
        error: false,
      };
    case "LOGIN_SUCCESS":
      return {
        user: actions.payload,
        isFetching: false,
        error: false,
      };
    case "LOGIN_FAILURE":
      return {
        user: null,
        isFetching: false,
        error: true,
      };
      case "LOGOUT":
        return {
          user: null,
          isFetching: false,
          error: false,
        };
    default:
      return state;
  }
};

export default loginReducer;