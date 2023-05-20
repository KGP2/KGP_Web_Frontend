import { useState } from 'react';
import { getToken } from './parseToken';

export default function useToken() {

  const [token, setToken] = useState(getToken());

  const saveToken = body => {
    
    var now = new Date(body.expiresAt);

    document.cookie = "Token=" + body.token + "; expires=" + now.toUTCString() + ";"
    document.cookie = "UserID=" + body.user.id + "; expires=" + now.toUTCString() + ";"

    setToken(body.token);
  };

  return {
    setToken: saveToken,
    token
  }
}