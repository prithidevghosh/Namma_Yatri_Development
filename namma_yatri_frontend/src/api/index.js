import axios from 'axios';


const URL = 'https://namma-yatri-development.vercel.app';

const fetchApi = async (header, endpoint, config) => {
  return await axios.post(URL + endpoint, header, config);
};

export const gernrateOTP = async (user, userDetail) => {
  const endpoint = `/api/${user}/create${
    user.charAt(0).toUpperCase() + user.slice(1)
  }_generateOtp`;
  const header = {
    ...userDetail,
  };
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  await fetchApi(header, endpoint, config);
};

export const signupAPI = async (user, userDetail) => {
  const endpoint = `/api/${user}/create${
    user.charAt(0).toUpperCase() + user.slice(1)
  }_database`;
  const header = {
    ...userDetail,
  };
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  return await fetchApi(header, endpoint, config);
};

export const loginAPI = async (user, userDetail) => {
  const endpoint = `/api/${user}/create_session`;
  const header = {
    ...userDetail,
  };
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  const auth = await fetchApi(header, endpoint, config);
  return auth;
};
