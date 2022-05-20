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

// export function setSpecificProject(state, payload) {
//   state.project = payload;
// }
