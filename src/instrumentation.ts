const createInMemoryStorage = (): Storage => {
  const storage = new Map<string, string>();

  return {
    get length() {
      return storage.size;
    },
    clear() {
      storage.clear();
    },
    getItem(key: string) {
      return storage.get(String(key)) ?? null;
    },
    key(index: number) {
      return Array.from(storage.keys())[index] ?? null;
    },
    removeItem(key: string) {
      storage.delete(String(key));
    },
    setItem(key: string, value: string) {
      storage.set(String(key), String(value));
    },
  };
};

const ensureServerLocalStorageShape = () => {
  if (typeof window !== 'undefined') {
    return;
  }

  try {
    Object.defineProperty(globalThis, 'localStorage', {
      configurable: true,
      enumerable: true,
      writable: true,
      value: createInMemoryStorage(),
    });
  } catch {
    // Keep startup resilient even if the runtime marks localStorage as non-configurable.
  }
};

ensureServerLocalStorageShape();

export function register() {
  ensureServerLocalStorageShape();
}
