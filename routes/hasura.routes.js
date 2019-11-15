const auth = require("../auth"),
  jwtDecode = require("jwt-decode"),
  { cleanErrorResponse } = require("./helpers");

module.exports = {
  POSTS: [
    [
      "/hooks/hasura",
      async function(req, res) {
        const idToken =
          req.body.authorization || req.body.idToken || req.body.access_token;
        if (!idToken) {
          res.status(401).send("access token not found");
          return;
        }
        try {
          await auth.getUserData(idToken); //validate the id token.
        } catch (err) {
          res.status(401).jsonp(cleanErrorResponse(err));
          return;
        }
        const {
          user_id = "",
          email = "",
          firebase: { sign_in_provider = "" }
        } = jwtDecode(idToken);

        const response = {
          "X-Hasura-User-Id": user_id,
          "X-Hasura-Role":
            sign_in_provider === "anonymous" ? "anonymous" : "user",
          "X-Hasura-Is-Owner": "true"
        };
        if (email) response["X-Hasura-Email"] = email;

        res.status(200).send(response);
      }
    ]
  ]
};
