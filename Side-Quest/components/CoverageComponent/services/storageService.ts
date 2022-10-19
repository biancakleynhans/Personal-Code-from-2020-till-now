import { useState, useEffect } from 'react';

/*
 * Local Storage
 */

function getLocalStorageItem(key: string): object | null {
  if (typeof window !== 'undefined') {
    const value = window?.localStorage?.getItem(key);
    if (value) {
      return JSON.parse(value);
    }
  }

  return null;
}

function setLocalStorageItem(key: string, value: unknown): void {
  if (typeof window !== 'undefined') {
    window?.localStorage?.setItem(key, JSON.stringify(value));
  }
}

function removeLocalStorageItem(key: string) {
  if (typeof window !== 'undefined') {
    window?.localStorage?.removeItem(key);
  }
}

function useLocalState(key: string, initialValue: unknown = '') {
  // set the state to the inital value until
  // the component is mounted
  const [value, setValue] = useState(initialValue);

  // Check if there is a value saved in local storage
  // when the component is mounted and update the state
  // Use [] as the second argment to useEffect below to only execute when mounted
  useEffect(() => {
    const value = getLocalStorageItem(key);
    if (value !== null) {
      setValue(value);
    }
  }, []);

  // When the value is updated in the component save
  // to local storage
  useEffect(() => {
    setLocalStorageItem(key, value);
  }, [value]);

  // Listen for changes in local storage
  // Storage events will be DISPATCHED on all OTHER WINDOWS from the same origin.
  // The event is NOT FIRED in the ORIGIN WINDOW

  // When the component is first mounted subscribe to storage events
  // Use [] as the second argment to useEffect below to only execute when mounted
  // Also return a function to unsubscribe when the component is unmounted
  useEffect(() => {
    // Update value when the event is from local storage and matches the key
    const listener = (e: any) => {
      if (e.storageArea === window?.localStorage && e.key === key) {
        setValue(JSON.parse(e.newValue));
      }
    };

    window.addEventListener('storage', listener);

    // Unsubscribe to storage events when the component is unmounted
    return () => {
      window.removeEventListener('storage', listener);
    };
  }, []);

  return [value, setValue];
}

/*
 * Session Storage
 */

function getSessionStorageItem(key: string): object | null {
  if (typeof window !== 'undefined') {
    const value = window?.sessionStorage?.getItem(key);
    if (value !== null) {
      return JSON.parse(value);
    }
  }

  return null;
}

function setSessionStorageItem(key: string, value: unknown): void {
  if (typeof window !== 'undefined') {
    window?.sessionStorage?.setItem(key, JSON.stringify(value));
  }
}

function removeSessionStorageItem(key: string) {
  if (typeof window !== 'undefined') {
    window?.sessionStorage?.removeItem(key);
  }
}

function useSessionState(key: string, initialValue: unknown = '') {
  // set the state to the inital value until
  // the component is mounted
  const [value, setValue] = useState(initialValue);

  // Check if there is a value saved in local storage
  // when the component is mounted and update the state
  // Use [] as the second argment to useEffect below to only execute when mounted
  useEffect(() => {
    const value = getSessionStorageItem(key);
    if (value !== null) {
      setValue(value);
    }
  }, []);

  // When the value is updated in the component save
  // to session storage
  useEffect(() => {
    setSessionStorageItem(key, value);
  }, [value]);

  // Listen for changes in session storage
  // When the component is first mounted subscribe to storage events
  // Use [] as the second argment to useEffect below to only execute when mounted
  // Also return a function to unsubscribe when the component is unmounted
  useEffect(() => {
    // Update value when the event is from session storage and matches the key
    const listener = (e: any) => {
      if (e.storageArea === window.sessionStorage && e.key === key) {
        setValue(JSON.parse(e.newValue));
      }
    };

    window.addEventListener('storage', listener);

    // Unsubscribe to storage events when the component is unmounted
    return () => {
      window.removeEventListener('storage', listener);
    };
  }, []);

  return [value, setValue];
}

/*
 * Cookie Storage
 */

function getCookie(cName: string) {
  // console.log('COOOKIE NAME: ', cName);
  const name = cName + '=';

  const cookieDecoded = decodeURIComponent(document.cookie); //to be careful
  const cookieArr = cookieDecoded.split('; ');

  let res;

  cookieArr.forEach((val) => {
    if (val.indexOf(name) === 0) res = val.substring(name.length);
  });
  return res;
}

function removeCookie(cName: string) {
  document.cookie = `${cName}= ; Path=/; expires= Thu, 01 Jan 1970 00:00:00 GMT;`;
}

export {
  useLocalState,
  getLocalStorageItem,
  setLocalStorageItem,
  removeLocalStorageItem,
  useSessionState,
  getSessionStorageItem,
  setSessionStorageItem,
  removeSessionStorageItem,
  getCookie,
  removeCookie,
};
