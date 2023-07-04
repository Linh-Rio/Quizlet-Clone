import httpRequest from '../utils/httpRequest';

const handleLogin = async (email, password) => {
  return await httpRequest.post('/api/login', { email, password });
};

const handleSignup = async (
  firstName,
  lastName,
  userName,
  email,
  password,
  birthday,
) => {
  return await httpRequest.post('/api/signup', {
    firstName,
    lastName,
    userName,
    email,
    password,
    birthday,
  });
};

export { handleLogin, handleSignup };
