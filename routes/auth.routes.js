const {
    signIn,
    signInAnonymously,
    signUp,
    refreshToken,
    getUserData
  } = require("../auth"),
  { sendErrorResponse } = require("./helpers");

module.exports = {
  POSTS: [
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
          res.jsonp(
            await refreshToken(req.body.refreshToken || req.body.refresh_token)
          );
        } catch (err) {
          sendErrorResponse(res, err);
        }
      }
    ],
    [
      "/getUserData",
      async function(req, res) {
        try {
          res.jsonp(
            await getUserData(req.body.idToken || req.body.access_token)
          );
        } catch (err) {
          sendErrorResponse(res, err);
        }
      }
    ]
  ]
};
