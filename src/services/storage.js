const safeRead = (key, fallback, validator = () => true) => {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    const value = JSON.parse(raw);
    return validator(value) ? value : fallback;
  } catch {
    return fallback;
  }
};

const safeWrite = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch (error) {
    console.error(`Не вдалося зберегти ${key}:`, error);
    return false;
  }
};

export const storage = {
  read: safeRead,
  write: safeWrite,
  remove: (key) => localStorage.removeItem(key),
  get: (key) => localStorage.getItem(key),
};
