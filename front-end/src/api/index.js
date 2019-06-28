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

  static getVehicleData(date) {
    return new Promise((resolve, reject) => {
      api.get(`/vehicle/list?date=${date}`, this.getAuthHeader())
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