function book(state = [], action) {
  switch (action.type) {
    case 'GET_BOOKS':
      return action.payload;
    case 'REMOVE_BOOK':
      return action.payload;
    case 'CREATE_BOOK':
      return action.payload;
    case 'UPDATE_BOOK':
      return action.payload;
    default:
      return state
  }
}

export default book;