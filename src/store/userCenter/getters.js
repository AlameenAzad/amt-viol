export function isSignedIn(state) {
  return !!(state.user && state.user.jwt) || false;
}
