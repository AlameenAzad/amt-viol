export function setUser(state, payload) {
  state.user = payload;
}

export function setUserDetails(state, payload) {
  if (!!payload) {
    state.user.userDetails = payload;
  }
}

export function updatePersonalData(state, payload) {
  if (!!payload) {
    state.user.userDetails = { ...state.user.userDetails, ...payload };
  }
}

export function setUsers(state, payload) {
  state.users = payload;
}

export function addUser(state, payload) {
  if (!!payload) {
    state.users.push(payload);
  }
}

export function changeLoadingMessages(state, payload) {
  state.loadingMessages = payload;
}
