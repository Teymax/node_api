import api from './axiosInstance';

export default class Api {
  static getAuthHeader() {
    const token = localStorage.getItem("access-token");

    return { 
      headers: {
        Authorization: `Bearer ${token ? token : ""}`
      } 
    }
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

  static getVehicleData(start_date, end_date, search_field, search_param) {
    // http://localhost:9000/vehicle/list?start_date=2019-06-02 03:00:00&end_date=2019-07-01 00:00:00&search_field=type&search_param=123

    return new Promise((resolve, reject) => {
      // let query = `/start_date=${start_date ? start_date : ""}&end_date=${end_date ? end_date : ""}&search_field=${search_field ? search_field : ""}&search_param=${search_param ? search_param : ""}`;
      let query = `/${start_date ? "?start_date=" + start_date : ""}
                   ${end_date ? "&end_date=" + end_date : ""}
                   ${search_field ? "&search_field=" + search_field : ""}
                   ${search_param ? "&search_param=" + search_param : ""}`;
    
      api.get(`/vehicle/list${query}`, this.getAuthHeader())
        .then(response => {
          resolve(response)
        })
        .catch(err => {
          reject(err)
        });
    })
  }
}

// fetch("http://localhost:9000/vehicle/list?date=2019-06-19 24:00:00", { 
//     headers: { "access-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkI…0NTN9.yNS52p8c23AAJ4iyKQUPTEgUakV46wPDZUet9Xza_kk" } 
//   }).then(response => response.json()).then(response => { console.warn(response) });

// fetch("http://localhost:9000/vehicle/list?date=2019-06-19 24:00:00", { headers: { "access-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkI…0NTN9.yNS52p8c23AAJ4iyKQUPTEgUakV46wPDZUet9Xza_kk" } }).then(response => response.json()).then(response => { console.warn(response) });