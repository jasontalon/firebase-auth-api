require("dotenv").config();

const express = require("express");
const app = express(),
  port = process.env.PORT || 8080,
  authRouting = require("./auth.routing");

app.use(express.json());
app.set("json spaces", 2);

authRouting.posts.forEach(route => app.post(...route));

app.listen(port, () => {
  console.log(`now listens to port ${port}`);
});
