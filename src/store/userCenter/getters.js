export function isSignedIn(state) {
  return !!(state.user && state.user.jwt) || false;
}

export function isAdmin(state) {
  const signedIn = isSignedIn(state);
  if (signedIn) {
    return (
      !!(
        state.user &&
        state.user.user &&
        state.user.user.role.type === "admin"
      ) || false
    );
  } else {
    return false;
  }
}
