import jwt from 'jsonwebtoken';

const createToken = async (username) => {
  let timeStamp = new Date().getTime();
  const payload = {
    iss: 'i18n-platform-source',
    exp: timeStamp + 60 * 60 * 24 * 7 * 1000,
    username: username,
  };
  return await jwt.sign(payload, process.env.JWT_SECRET_KEY);
};

export default createToken;

export interface ILoginSuccessRes {
  token: string;
  username: string;
}
