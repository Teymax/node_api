import api from './axiosInstance';

class Api {
  static get_auth_header() {
    const token = localStorage.getItem("access_token");

    return { 
      headers: {
        Authorization: `Bearer ${token ? token : ""}`
      } 
    }
  }

  // static get_vehicle_data(start_date, end_date, search_field, search_param) {
    // let query = `/${start_date ? "?start_date=" + start_date : ""}${end_date ? "&end_date=" + end_date : ""}${search_field ? "&search_field=" + search_field : ""}${search_param ? "&search_param=" + search_param : ""}`;

  static generateVehicleQuery(params = {}) {
    const { start_date= "", end_date = "", search_field = "", search_param = "" } = params;

    return `?start_date=${start_date ? start_date : ""}&end_date=${end_date ? end_date : ""}&search_field=${search_field ? search_field : ""}&search_param=${search_param ? search_param : ""}`;    
  }

  static login(credentials) {
    return new Promise((resolve, reject) => {
      api.post('/user/login', credentials)
        .then(response => {
          resolve(response)
        })
        .catch(err => {
          reject(err)
        })
    })
  }

  static register(credentials) {
    return new Promise((resolve, reject) => {
      api.post('/user/register', credentials)
        .then(response => {
          resolve(response)
        })
        .catch(err => {
          reject(err)
        });
    })
  }


  /**
   * 
   * @param { {} } params_input - optional
   * params_input: { start_date, end_date, search_field, search_param }
   * if params aren't specified query would be: 
   * /list?start_date=&end_date=&search_field=&search_param=
   */

  static get_vehicle_data(params_input) {
    let params = params_input ? params_input : {}

    return new Promise((resolve, reject) => {
      let query = this.generateVehicleQuery(params);

      api.get(`/vehicle/list${query}`, this.get_auth_header())
        .then(response => {
          resolve(response)
        })
        .catch(err => {
          reject(err)
        });
    })
  }

  static save_user_settings(user_data) {
    return new Promise((resolve, reject) => {
      // let query = `/${start_date ? "?start_date=" + start_date : ""}${end_date ? "&end_date=" + end_date : ""}${search_field ? "&search_field=" + search_field : ""}${search_param ? "&search_param=" + search_param : ""}`;
      // let query = `/${search_field ? "search_field=" + search_field : ""}${search_param ? "&search_param=" + search_param : ""}`;

      const token = localStorage.getItem("access_token");
      api.put('/user/update', user_data, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token ? token : ""}`
        }
      })
        .then(response => {
          resolve(response)
        })
        .catch(err => {
          reject(err)
        });
    })
  }

  static get_refresh_token() {
    return new Promise((resolve, reject) => {
      api.get('')
        .then(response => {
          resolve(response)
        })
        .catch(err => {
          reject(err)
        });
    })
  }

  static get_access_token() {
    return new Promise((resolve, reject) => {
      api.get('')
        .then(response => {
          resolve(response)
        })
        .catch(err => {
          reject(err)
        });
    })
  }
}

export default Api;