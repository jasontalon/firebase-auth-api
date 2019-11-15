require("dotenv").config();

const express = require("express");
const app = express(),
  port = process.env.PORT || 8080,
  routes = require("./routes");

app.use(express.json());
app.set("json spaces", 2);

routes.POSTS.forEach(route => app.post(...route));

app.listen(port, () => {
  console.log(`now listens to port ${port}`);
});
