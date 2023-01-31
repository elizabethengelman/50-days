//Initialize the express 'app' object
let express = require("express");
let app = express();

app.use("/", express.static("public"));

//Initialize the actual HTTP server
let http = require("http");
const { emit } = require("process");
let server = http.createServer(app);

//'port' variable allows for deployment
let port = process.env.PORT || 3000;
server.listen(port, () => {
  console.log("Server listening at port: " + port);
});
