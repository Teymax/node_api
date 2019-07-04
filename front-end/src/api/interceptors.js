// import axiosInstance from "./axiosInstance";
// import Api from "./index";
// import actionTypes from "../store/action-types";
// import actions from "../store/actions";

// const query = "/vehicle/list?start_date=&end_date=&search_field=&search_param=";

// console.log(actions);

// const fetch_refresh_token = actions[actionTypes.GET_REFRESH_TOKEN];
// const fetch_access_token = actions[actionTypes.GET_ACCESS_TOKEN];


// axiosInstance.interceptors.response.use(
//   function(response) {
//     console.log('okk')
//     // If the request succeeds, we don't have to do anything and just return the response
//     return response
//   },
//   function(error) {
//     const error_response = error.response
//     if (is_token_expired_error(error_response)) {
//       return reset_token_and_reattempt_request(error)
//     }
//     // If the error is due to other reasons, we just throw it back to axios
//     return Promise.reject(error)
//   }
// )

// function is_token_expired_error(error_response) {
//   // Your own logic to determine if the error is due to JWT token expired returns a boolean value
//   // console.log(error_response.statusText === "Unauthorized");
//   return error_response.statusText === "Unauthorized";
// }

// let is_already_fetching_access_token = false;

// // This is the list of waiting requests that will retry after the JWT refresh complete
// let subscribers = [];

// async function get_refresh_token() {
//   // return response.data.refresh_token ?
//   return fetch_refresh_token()
//     .then(response => {
//       return response;
//     })
//     .catch(response => {
//       console.dir(response);
//       return response;
//     });
// }

// function save_refresh_token() {

// }

// async function reset_token_and_reattempt_request(error) {
//   try {
//     const { response: error_response } = error;
//     const reset_token = await get_refresh_token(); // Your own mechanism to get the refresh token to refresh the JWT token
//     console.log(reset_token);
//     if (!reset_token) {
//       // We can't refresh, throw the error anyway
//       return Promise.reject(error);
//     }
//     /* Proceed to the token refresh procedure
//     We create a new Promise that will retry the request,
//     clone all the request configuration from the failed
//     request in the error object. */
//     const retry_original_request = new Promise(resolve => {
//     /* We need to add the request retry to the queue
//     since there another request that already attempt to
//     refresh the token */
//       add_subscriber(access_token => {
//         error_response.config.headers.Authorization = 'Bearer ' + access_token;
//         resolve(api(error_response.config));
//         console.log("subscr erorr", error_response);
//       });
//     });

//     if (!is_already_fetching_access_token) {
//       is_already_fetching_access_token = true;
//       const response = await Api.get_vehicle_data();
//       if (!response.data) {
//         return Promise.reject(error);
//       }
//       const new_token = response.data.token;
//       // save_refresh_token(new_token); // save the newly refreshed token for other requests to use
//       is_already_fetching_access_token = false;
//       on_access_token_fetched(new_token);
//     }

//     return retry_original_request;
//   } catch (err) {
//     return Promise.reject(err);
//   }
// }

// function on_access_token_fetched(access_token) {
// 	// When the refresh is successful, we start retrying the requests one by one and empty the queue
//   subscribers.forEach(callback => callback(access_token));
//   subscribers = [];
// }

// function add_subscriber(callback) {
//   subscribers.push(callback);
// }