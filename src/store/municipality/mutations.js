export function setMunicipalities(state, payload) {
  if (!!payload) {
    state.municipalities = payload;
  }
}

export function addMunicipality(state, payload) {
  if (!!payload) {
    state.municipalities.push(payload);
  }
}

export function deleteMunicipality(state, payload) {
  if (!!payload) {
    state.municipalities = state.municipalities.filter(
      municipality => municipality.id !== payload
    );
  }
}

export function editMunicipality(state, payload) {
  if (!!payload) {
    state.municipalities = [
      ...state.municipalities.map(municipality => {
        if (municipality.id === payload.id) {
          return {
            ...municipality,
            title: payload.title,
            location: payload.location,
            updatedAt: payload.updatedAt
          };
        }
        return municipality;
      })
    ];
  }
}
