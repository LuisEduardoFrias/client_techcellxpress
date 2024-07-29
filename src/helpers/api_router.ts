
const base = process.env.NEXT_PUBLIC_BASE_API_TECHCELLXPRESS;
console.log("base url api: ", base)
export const baseApiTechcellxpress = base;

export const admin = {
  loadProducts: `${base}/admin/load_products`,
  removeAll: `${base}/admin/removeAll`,
}

export const product = {
  get: `${base}/product`,
  search: `${base}/product/search/{search}`,
  getById: `${base}/product/{id}`,
  post: `${base}/product`,
  put: `${base}/product/{id}`,
  delete: `${base}/product/{id}`,
}

export const session = {
  logIn: `${base}/login`,
  logOut: `${base}/logout`,
  register: `${base}/register`,
}