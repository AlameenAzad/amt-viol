export function setUser(state, payload) {
  state.user = payload;
}

export function setUserDetails(state, payload) {
  if (!!payload) {
    state.user.userDetails = payload;
  }
}

export function setUserInfo(state, payload) {
  if (!!payload) {
    state.user.user.username = payload.username;
    state.user.user.role = payload.role;
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

export function setDataOverview(state, payload) {
  state.dataOverview = [];
  for (const item in payload) {
    if (payload.hasOwnProperty(item)) {
      if (item === "fundings") {
        payload[item].forEach(funding => {
          state.dataOverview.push({ ...funding, type: "funding" });
        });
      } else if (item === "projects") {
        payload[item].forEach(funding => {
          state.dataOverview.push({ ...funding, type: "project" });
        });
      } else if (item === "checklists") {
        payload[item].forEach(funding => {
          state.dataOverview.push({ ...funding, type: "checklist" });
        });
      }
    }
  }
}

export function clearDataOverview(state) {
  state.dataOverview = [];
}

export function changeLoadingMessages(state, payload) {
  state.loadingMessages = payload;
}
