import api  from './axiosInstance';

export default class Api {
  static login(credentials) {
    return new Promise(( resolve, reject ) => {
      api.post('/user/login', credentials)
        .then(response => {
          resolve(response)
        })
        .catch(err => {
          reject(console.error(err))
        });
    })
  }

  static register(credentials) {
    return new Promise(( resolve, reject ) => {
      api.post('/user/register', credentials)
        .then(response => {
          resolve(response)
        })
        .catch(err => {
          reject(console.error(err))
        });
    })
  }

  static logout() {
    return new Promise(( resolve, reject ) => {
      api.post('/user/register', credentials)
        .then(response => {
          resolve(response)
        })
        .catch(err => {
          reject(console.error(err))
        });
    })
  }
}
