//
import { jwtVerify } from 'jose';
import { getCookie } from 'hp/local_cookie';

export default async function GetSession(): userInit {
  const jwt = getCookie('access_token');

  if (jwt === undefined) return null;

  try {
    const session = await jwtVerify(jwt, new TextEncoder().encode(process.env.SECRET_JWT_KEY))
    return session.payload.data.user;
  }
  catch (error) {
    console.error("JWT isn't valid.");
    return null;
  }
}