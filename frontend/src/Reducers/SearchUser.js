export const searchUser = (
  state = { Users: {}, Loading: false, error: false },
  action
) => {
  switch (action.type) {
    case "USER_SEARCH_START":
      return { ...state, Loading: true };

    case "USER_SEARCH__SUCCESSFULL":
      return { ...state, Users: action.payload, Loading: false };

    case "USER_SEARCH__FAIL":
      return { ...state, error: true };

    default:
      return state;
  }
};
