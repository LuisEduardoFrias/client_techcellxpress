//
'use client'
export function setCookie(key: string, value: object, maxAge = "1000*60*60") {
  if (typeof document !== 'undefined') {
    try {
      document.cookie = `${key}=${JSON.stringify(value)}; path=/; max-age=${maxAge}`;
    } catch (error) {
      console.error(error)
    }
  }
};

export function getCookie(key) {
  if (typeof document !== 'undefined') {
    const findValue = document.cookie
      .split(";")
      .find(e => e.trim().startsWith(`${key}=`));

    if (findValue) {
      try {
        return findValue.split("=")[1];
      } catch (error) {
        console.error(error)
        return undefined;
      }
    }
  }
}