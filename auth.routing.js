const {
  signIn,
  signInAnonymously,
  signUp,
  refreshToken,
  getUserData
} = require("./auth");

const tryGetHttpResponseError = err => {
  const { response: { data: { error = null } = {} } = {} } = err;
  return error;
};
const removeStackProperty = obj =>
  Object.getOwnPropertyNames(obj).reduce((acc, key) => {
    if (key.toLowerCase() !== "stack") {
      acc[key] = obj[key];
      return acc;
    } else return acc;
  }, {});

const sendErrorResponse = (res, err) =>
  res
    .status(400)
    .send(tryGetHttpResponseError(err) || removeStackProperty(err));

module.exports = {
  posts: [
    [
      "/signIn",
      async function(req, res) {
        try {
          res.jsonp(await signIn(req.body.email, req.body.password));
        } catch (err) {
          sendErrorResponse(res, err);
        }
      }
    ],
    [
      "/signInAnonymously",
      async function(req, res) {
        try {
          res.jsonp(await signInAnonymously());
        } catch (err) {
          sendErrorResponse(res, err);
        }
      }
    ],
    [
      "/signUp",
      async function(req, res) {
        try {
          res.jsonp(await signUp(req.body.email, req.body.password));
        } catch (err) {
          sendErrorResponse(res, err);
        }
      }
    ],
    [
      "/refreshToken",
      async function(req, res) {
        try {
          res.jsonp(await refreshToken(req.body.refreshToken));
        } catch (err) {
          sendErrorResponse(res, err);
        }
      }
    ],
    [
      "/getUserData",
      async function(req, res) {
        try {
          res.jsonp(await getUserData(req.body.idToken));
        } catch (err) {
          sendErrorResponse(res, err);
        }
      }
    ]
  ]
};
