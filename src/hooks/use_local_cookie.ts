//
'use client'
import { useState } from 'react';

export default function useCookie(key: string) {
  const [value, setValue] = useState(() => {
    if (typeof document !== 'undefined') {
      const valueCookie = document.cookie;
      const findValue = valueCookie.split(";").find(e => e.trim().startsWith(`${key}=`))

      if (!findValue) return {};

      const valueString = findValue.split("=")[1];
      try {
        return JSON.parse(valueString);
      } catch (error) {
        console.error(error)
      }
    }

    return {};
  });

  function setCookie(key: string, _value: object, maxAge = "1000*60*60") {
    if (typeof document !== 'undefined') {
      try {
        document.cookie = `${key}=${JSON.stringify(_value)}; path=/; max-age=${maxAge}`;
        setValue(_value);
      } catch (error) {
        console.error(error)
      }
    }
  }

  return [value, setCookie];
};

export function getCookie(key) {
  if (typeof document !== 'undefined') {
    const findValue = document.cookie
      .split(";")
      .find(e => e.trim().startsWith(`${key}=`));

    if (findValue) {
      const valueString = findValue.split("=")[1];
      try {
        return JSON.parse(valueString);
      } catch (error) {
        console.error(error)
        return undefined;
      }
    }
  }
}