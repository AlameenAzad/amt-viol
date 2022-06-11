export function setFundings(state, payload) {
  state.fundings = payload;
}

export function addNewFunding(state, payload) {
  if (!!payload) {
    state.fundings.push(payload);
  }
}

// export function editProjectIdea(state, payload) {
//   console.log("edit project idea payload", payload);
// }

export function deleteFunding(state, payload) {
  if (!!payload) {
    state.fundings = state.fundings.filter(funding => funding.id !== payload);
  }
}

export function setSpecificFunding(state, payload) {
  state.funding = payload;
}