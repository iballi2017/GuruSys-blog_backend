import path from 'path';
import dotenv from 'dotenv';

dotenv.config({ path: path.join(__dirname, '../.env') });

const assert = require('assert');

dotenv.config();

const {
  APP_NAME,
  PORT,
  HOST,
  HOST_URL,
  CLIENT_URL,
  ACCESS_TOKEN_SECRET,
  REFRESH_TOKEN_SECRET,
  EXPRESS_SESSION_KEY,
  DATABASE_PASSWORD,
  DATABASE_USERNAME,
} = process.env;

assert(APP_NAME, 'APP_NAME is required');
assert(PORT, 'PORT is required');
assert(HOST, 'HOST is required');
assert(HOST_URL, 'HOST_URL is required');
assert(CLIENT_URL, 'CLIENT_URL is required');
assert(ACCESS_TOKEN_SECRET, 'ACCESS_TOKEN_SECRET is required');
assert(REFRESH_TOKEN_SECRET, 'REFRESH_TOKEN_SECRET is required');
assert(EXPRESS_SESSION_KEY, 'EXPRESS_SESSION_KEY is required');
assert(DATABASE_PASSWORD, 'DATABASE_PASSWORD is required');
assert(DATABASE_USERNAME, 'DATABASE_USERNAME is required');

const env = {
  APP_NAME: APP_NAME,
  PORT: PORT,
  HOST: HOST,
  HOST_URL: HOST_URL,
  CLIENT_URL: CLIENT_URL,
  ACCESS_TOKEN_SECRET,
  REFRESH_TOKEN_SECRET,
  EXPRESS_SESSION_KEY,
  DATABASE_PASSWORD,
  DATABASE_USERNAME,
};

export default env;

// module.exports = {
//     APP_NAME: APP_NAME,
//     PORT: PORT,
//     HOST: HOST,
//     HOST_URL: HOST_URL,
//     CLIENT_URL: CLIENT_URL,
//     ACCESS_TOKEN_SECRET,
//     REFRESH_TOKEN_SECRET,
//     EXPRESS_SESSION_KEY,
//     DATABASE_PASSWORD,
//     DATABASE_USERNAME,
//     MAILER_EMAIL,
//     MAILER_PASSWORD,
// };

// export const env ={

// }
