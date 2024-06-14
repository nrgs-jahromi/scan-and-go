export const saveTableToLocalStorage = (table: Record<string, string>) => {
  for (const key in table) {
    saveToLocalStorage(key, table[key]);
  }
};

export const saveToLocalStorage = (key: string, value: string) => {
  if (window.localStorage) {
    window.localStorage.setItem(key, value);
    return true;
  }
  return false;
};

export const deleteFromLocalStorage = (key: string) => {
  if (window.localStorage) {
    window.localStorage.removeItem(key);

    return true;
  }

  return false;
};

export const getFromLocalStorage = (key: string) => {
  if (window.localStorage) {
    return window.localStorage.getItem(key);
  }

  return undefined;
};
