export const login = async () => {
  await gapi.auth2.getAuthInstance().signIn();
  location.href = '';
};

export const logout = async () => {
  await gapi.auth2.getAuthInstance().signOut();
  location.href = '';
};
