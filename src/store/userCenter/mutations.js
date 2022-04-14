export function setUser(state, payload) {
  state.user = payload;
}

export function setUserDetails(state, payload) {
  if (!!payload) {
    state.user.userDetails = payload;
  }
}

export function setUsers(state, payload) {
  if (!!payload) {
    state.users = payload;
  }
}

export function changeLoadingMessages(state, payload) {
  if (!!payload) {
    state.loadingMessages = payload;
  }
}
