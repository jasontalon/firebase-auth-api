const axios = require("axios"),
  { FIREBASE_WEB_API_KEY = "" } = process.env;

module.exports = {
  signIn: async (email, password) => {
    const url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${FIREBASE_WEB_API_KEY}`;

    const {
      data: { idToken, refreshToken }
    } = await axios.post(url, {
      email,
      password,
      returnSecureToken: true
    });

    return { idToken, refreshToken };
  },
  signInAnonymously: async () => {
    const url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${FIREBASE_WEB_API_KEY}`;
    const {
      data: { idToken, refreshToken }
    } = await axios.post(url, { returnSecureToken: true });

    return { idToken, refreshToken };
  },
  signUp: async (email, password) => {
    const {
      data: { idToken, refreshToken }
    } = await axios.post(
      `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${FIREBASE_WEB_API_KEY}`,
      {
        email,
        password,
        returnSecureToken: true
      }
    );

    return { idToken, refreshToken };
  },
  refreshToken: async refreshToken => {
    const url = `https://securetoken.googleapis.com/v1/token?key=${FIREBASE_WEB_API_KEY}`;

    const {
      data: { id_token, refresh_token }
    } = await axios.post(url, {
      refresh_token: refreshToken,
      grant_type: "refresh_token"
    });

    return { idToken: id_token, refreshToken: refresh_token };
  },
  getUserData: async idToken => {
    const url = `https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${FIREBASE_WEB_API_KEY}`,
      {
        data: { users }
      } = await axios.post(url, {
        idToken
      });

    return users.pop();
  }
};
