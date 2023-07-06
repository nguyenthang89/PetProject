const initState = {
  users: []
}

export const userReducer = (state = initState, action) => {
  const { type, payload } = action;
  switch (type) {
    default:
      return state;
  }
}