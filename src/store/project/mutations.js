export function setCategories(state, payload) {
  if (!!payload) {
    state.categories = payload;
  }
}

export function addCategory(state, payload) {
  if (!!payload) {
    state.categories.push(payload);
  }
}

export function deleteCategory(state, payload) {
  if (!!payload) {
    state.categories = state.categories.filter(
      category => category.id !== payload
    );
  }
}

export function editCategory(state, payload) {
  console.log("called edit category mutation", payload);
}

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
