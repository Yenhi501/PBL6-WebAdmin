export const MovieReducer = (state = {}, action) => {
  switch (action.type) {
    case 'SET_IS_EDIT_MOVIES':
      return {
        ...state,
        isEdit: action.payload,
      };

    default:
      return state;
  }
};
