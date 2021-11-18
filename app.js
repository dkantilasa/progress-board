const express = require("express");
const app = express();
const routes = require("./routes/routes");
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("", routes);

app.listen(5040, () => {
  console.log("server is listening to port 5040");
});
