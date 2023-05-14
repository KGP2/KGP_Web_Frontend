import { useState } from 'react';
import { getToken } from './parseToken';

export default function useToken() {

  const [token, setToken] = useState(getToken());

  const saveToken = userToken => {
    setToken(userToken);
  };

  return {
    setToken: saveToken,
    token
  }
}