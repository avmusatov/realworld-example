export const setItem = (key: string, value: object) => localStorage.setItem(key, JSON.stringify(value));

export const getItem = (key: string) => {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : undefined;
};

export const removeItem = (key: string) => localStorage.removeItem(key);
