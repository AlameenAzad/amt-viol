export function setChecklists(state, payload) {
  state.checklists = payload;
}

export function setSpecificChecklist(state, payload) {
  state.checklist = payload;
}

export function addNewChecklist(state, payload) {
  if (!!payload) {
    state.checklists.push(payload);
  }
}

export function deleteChecklist(state, payload) {
  if (!!payload) {
    state.checklists = state.checklists.filter(
      checklist => checklist.id !== payload
    );
    state.checklist = {};
  }
}

export function archiveChecklist(state, payload) {
  if (state.checklist) {
    state.checklist.archived = true;
  }
}
