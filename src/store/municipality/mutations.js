export function setMunicipalities(state, payload) {
  if (!!payload) {
    state.municipalities = payload;
  }
}

export function addMunicipality(state, payload) {
  if (!!payload) {
    state.municipalities = state.municipalities.push(payload);
  }
}
