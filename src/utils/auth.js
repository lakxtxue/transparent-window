import Cookies from "js-cookie";

const tokenKey = "access_token";

export function getToken() {
  let token = sessionStorage.getItem(tokenKey);
  if (!token) {
    token = Cookies.get(tokenKey);
  }
  return token;
}

export function setToken(token) {
  sessionStorage.setItem(tokenKey, token);
  return Cookies.set(tokenKey, token);
}

export function removeToken() {
  sessionStorage.removeItem(tokenKey);
  return Cookies.remove(tokenKey);
}
