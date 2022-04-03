export function setTags(state, payload) {
  if (!!payload) {
    state.tags = payload;
  }
}

export function addTag(state, payload) {
  if (!!payload) {
    state.tags.push(payload);
  }
}

export function deleteTag(state, payload) {
  if (!!payload) {
    state.tags = state.tags.filter(tag => tag.id !== payload);
  }
}

export function editTag(state, payload) {
  console.log("called edit tag mutation", payload);
}
