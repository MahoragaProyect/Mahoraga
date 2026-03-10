const isLocalHost = ["localhost", "127.0.0.1"].includes(window.location.hostname);

export const API_ORIGIN =
  isLocalHost && window.location.port !== "3000"
    ? `${window.location.protocol}//${window.location.hostname}:3000`
    : window.location.origin;

export const API_BASE_URL = `${API_ORIGIN}/api`;
