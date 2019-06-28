import api from './axiosInstance';

export default class Api {
  static get_auth_header() {
    const token = localStorage.getItem("access-token");

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

    return `/start_date=${start_date ? "?start_date=" + start_date : ""}&end_date=${end_date ? end_date : ""}&search_field=${search_field ? search_field : ""}&search_param=${search_param ? search_param : ""}`;    
  }

  static login(credentials) {
    return new Promise((resolve, reject) => {
      api.post('/user/login', credentials)
        .then(response => {
          resolve(response)
          console.warn('then', response);
        })
        .catch(err => {
          console.log(err, 'Error')
          // console.log(err.name, 'Error')
          reject(err)
        })
        .finally(err => { console.warn('finally', err) });
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

  // static logout() {
  //   return new Promise((resolve, reject) => {
  //     api.post('/user/register', credentials)
  //       .then(response => {
  //         resolve(response)
  //       })
  //       .catch(err => {
  //         reject(console.error(err))
  //       });
  //   })
  // }

  static get_vehicle_data(params) {
    console.warn(arguments);
    return new Promise((resolve, reject) => {
      // let query = `/${start_date ? "?start_date=" + start_date : ""}${end_date ? "&end_date=" + end_date : ""}${search_field ? "&search_field=" + search_field : ""}${search_param ? "&search_param=" + search_param : ""}`;
      // let query = `/${search_field ? "search_field=" + search_field : ""}${search_param ? "&search_param=" + search_param : ""}`;

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

}