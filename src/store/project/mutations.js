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

export function deleteProjectIdea(state, payload) {
  if (!!payload) {
    state.projects = state.projects.filter(project => project.id !== payload);
    state.project = {};
  }
}

export function setSpecificProject(state, payload) {
  state.project = payload;
}

export function setTempCategories(state, payload) {
  state.tempCategories = payload;
}

export function setTempTags(state, payload) {
  state.tempTags = payload;
}

export function archiveProject(state, payload) {
  if (state.project) {
    state.project.archived = true;
  }
}
