export function setProjectIdeas(state, payload) {
  state.projects = payload;
}

export function addNewProjectIdea(state, payload) {
  if (!!payload) {
    state.projects.push(payload);
  }
}

export function editProjectIdea(state, payload) {
  console.log("edit project idea payload", payload);
}

export function setSpecificProject(state, payload) {
  state.project = payload;
}
