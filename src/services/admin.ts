//
import Fetch, { Method, DataFetch } from 'hp/fetch'
import { admin as _admin } from 'hp/api_router'

class Admin {
  async loadProducts(phones, token) {
    const datafetch: DataFetch = {
      url: _admin.loadProducts,
      method: Method.POST,
      body: phones,
      token: token,
    }

    return await Fetch(datafetch);
  }
  //
  async removeAll(token) {
    const datafetch: DataFetch = {
      url: _admin.removeAll,
      method: Method.DELETE,
      token: token,
    }

    return await Fetch(datafetch);
  }
}

const admin = new Admin();
export default admin;