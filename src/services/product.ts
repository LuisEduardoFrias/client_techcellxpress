//
import Fetch, { Method, DataFetch } from "hp/fetch"
import { product as pdt } from 'hp/api_router'

class Product {
  async get(token) {
    const datafetch: DataFetch = {
      url: pdt.get,
      method: Method.GET,
      token: token,
    }

    return await Fetch(datafetch);
  }
  //
  async search(text, token) {
    const datafetch: DataFetch = {
      url: pdt.search.replace('{search}', text),
      method: Method.GET,
      token: token,
    }

    return await Fetch(datafetch);
  }
  //
  async getById(id, token) {
    const datafetch: DataFetch = {
      url: pdt.getById.replace('{id}', id),
      method: Method.GET,
      token: token,
    }

    return await Fetch(datafetch);
  }
  //
  async post(product, token) {

    const datafetch: DataFetch = {
      url: pdt.post,
      method: Method.POST,
      body: product,
      token: token,
    }
    
    const { error, data } = await Fetch(datafetch);
    console.log("desee service error: ", error, "data: ", data);
    return { error, data };
  }
  //
  async put(id, product, token) {
    const datafetch: DataFetch = {
      url: pdt.put.replace('{id}', id),
      method: Method.PUT,
      body: product,
      token: token,
    }

    return await Fetch(datafetch);
  }
  //
  async delete(id, token) {
    const datafetch: DataFetch = {
      url: pdt.delete.replace('{id}', id),
      method: Method.DELETE,
      token: token,
    }

    return await Fetch(datafetch);
  }
}

const product = new Product();
export default product;