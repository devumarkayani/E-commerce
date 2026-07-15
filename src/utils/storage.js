export const getCart = () => {
  try {
    const raw = localStorage.getItem("cart");
    return raw ? JSON.parse(raw) : [];
  } catch {
    localStorage.removeItem("cart");
    return [];
  }
};

export const setCart = (cart) => {
  localStorage.setItem("cart", JSON.stringify(cart));
};

export const isLoggedIn = () => localStorage.getItem("user") === "true";

export const getToken = () => localStorage.getItem("token") || "";

export const getRole = () => (localStorage.getItem("role") || "").toLowerCase();

export const getUserId = () => localStorage.getItem("userId") || "";

export const clearSession = () => {
  localStorage.removeItem("user");
  localStorage.removeItem("token");
  localStorage.removeItem("role");
  localStorage.removeItem("userId");
  localStorage.removeItem("cart");
};
