const express = require('express');
const http = require('http');
const app = express();
const bodyParser = require('body-parser');

// Set port
const port = 4200;

app.use(bodyParser.json()); // support json encoded bodies
//support parsing of application/x-www-form-urlencoded post data
app.use(bodyParser.urlencoded({ extended: false }));

// Set name of directory where angular distribution files are stored
const dist = '../dist';
app.use(express.static(dist));




// Create server to listen for connections
const server = http.createServer(app);
server.listen(port, () => console.log("listening on port " + port));


app.post("/login",(req, res, next) => {

    return res.status(200).json({
      message: "Success",

  });
});


