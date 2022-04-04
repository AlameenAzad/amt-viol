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
