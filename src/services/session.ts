//
import Fetch, { Method, DataFetch } from "hp/fetch"
import { session as _session} from 'hp/api_router'

class Session {
  async logIn(user) {
    const datafetch: DataFetch = {
      url: _session.logIn,
      method: Method.POST,
      body: user,
    }

    return await Fetch(datafetch);
  }
  //
  async logOut(session_, token) {
    const datafetch: DataFetch = {
      url: _session.logOut,
      method: Method.POST,
      body: session_,
      token: token,
    }

    console.log("logOut: " + JSON.stringify(datafetch))
    return await Fetch(datafetch);
  }
  //
  async register(user) {
    const datafetch: DataFetch = {
      url: _session.register,
      method: Method.POST,
      body: user,
    }

    const { error, data } = await Fetch(datafetch);

    if (error)
      return { error, data: null }

    return { error: null, data: "Succes" }
  }
}

const session = new Session();
export default session;