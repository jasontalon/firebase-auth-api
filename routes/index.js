const authRoutes = require("./auth.routes"),
  hasuraRoutes = require("./hasura.routes");

module.exports = {
  POSTS: [].concat(authRoutes.POSTS, hasuraRoutes.POSTS)
};
