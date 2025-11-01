type Payload = unknown;
type Handler = (e: CustomEvent<Payload>) => void;

export const on = (name: string, h: Handler) => {
  window.addEventListener(name, h as EventListener);
  return () => off(name, h);
};

export const off = (name: string, h: Handler) => {
  window.removeEventListener(name, h as EventListener);
};

export const emit = <T = unknown>(name: string, detail?: T) => {
  window.dispatchEvent(new CustomEvent<T>(name, { detail }));
};
