export default function ({ store, redirect, route }) {
  const userIsLoggedIn = !!store.state.auth.user;
  const afterSlashChars = (url) => url.substr(url.lastIndexOf('/') + 1);
  const urlRequiresAuth = afterSlashChars(route.fullPath);
  if (!userIsLoggedIn && urlRequiresAuth) {
    return redirect("/");
  }
  if (userIsLoggedIn && !urlRequiresAuth) {
    return redirect("/home");
  }
  return Promise.resolve();
}
