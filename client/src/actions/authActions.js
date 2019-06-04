// import axios from 'axios';
// import setAuthToken from '../utils/setAuthToken';
// import jwt_decode from 'jwt-decode';
// import { GET_ERRORS, SET_CURRENT_USER, USER_LOADING } from './types';

// // Registration
// export const registerUser = (userData, history) => dispatch => {
//   axios
//     .post('/api/users/register', userData)
//     .then(res => history.push('/login'))
//     .catch(err =>
//       dispatch({
//         type: GET_ERRORS,
//         payload: err.response.data
//       })
//     );
// };

// // Login
// export const loginUser = userData => dispatch => {
//   axios
//     .post('/api/users/login', userData)
//     .then(res => {
//       // set token to localStorage
//       const { token } = res.data;
//       localStorage.setItem('jwtToken', token);
//       // set token to the auth header
//       setAuthToken(token);
//       // decode token to get user data
//       const decoded = jwt_decode(token);
//       // set current user
//       dispatch(setCurrentUser(decoded));
//     })
//     .catch(err =>
//       dispatch({
//         type: GET_ERRORS,
//         payload: err.response.data
//       })
//     );
// };

// export const setCurrentUser = decoded => {
//   return {
//     type: SET_CURRENT_USER,
//     payload: decoded
//   };
// };

// export const setUserLoading = () => {
//   return {
//     type: USER_LOADING
//   };
// };

// // Logout
// export const logoutUser = () => dispatch => {
//   // remove token from localStorage
//   localStorage.removeItem('jwtToken');
//   // Remove token from the auth header
//   setAuthToken(false);
//   // set current user to empty object {}
//   dispatch(setCurrentUser({}));
// };
