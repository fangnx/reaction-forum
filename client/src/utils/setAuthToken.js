import axios from 'axios';
const setAuthToken = token => {
  if (token) {
    // If logged in
    axios.defaults.headers.common['Authorization'] = token;
  } else {
    delete axios.defaults.headers.common['Authorization'];
  }
};
export default setAuthToken;
