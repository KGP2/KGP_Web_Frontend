
export function check_cookie_name(name) 
{
  var match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
  if (match) 
    return match[2];
  else
    return null;
}

export function getToken() {
  return check_cookie_name("Token")
}

export function getUserID() {
  return check_cookie_name("UserID")
}

export function parseJwt (token) {
  var base64Url = token.split('.')[1];
  var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(''));

  return JSON.parse(jsonPayload);
}

export function isTokenClient(token) {
  const obj = parseJwt(token);
  if (obj.aud.includes("Client"))
    return true;
  else 
    return false;
}

export function isTokenOrganizer(token) {
  return !isTokenClient(token)
}

export function LogOut() 
{
  if (check_cookie_name("Token")) {
    document.cookie = "Token= ; expires = Thu, 01 Jan 1970 00:00:00 GMT";
  }

  if (check_cookie_name("UserID")) {
    document.cookie = "UserID= ; expires = Thu, 01 Jan 1970 00:00:00 GMT";
  }
}

