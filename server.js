// Setup server

// Importing necessary modules
var express = require('express');  // express module for setting up the server
var cors = require('cors');  // cors module for handling Cross-Origin Resource Sharing
var bodyParser = require('body-parser');  // body-parser module to parse the request body

// Importing the route module for handling requests
var noteRoute = require('./route/noteRoute');

// Creating an instance of the express application
var app = express();

// Set the port number
const port = 3000;

// Enable Cross-Origin Resource Sharing for all requests
app.use(cors());

// Set up body-parser middleware to parse incoming request bodies
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Set up a route for the root URL that returns a simple response
app.get("/", (req, res) => {
    res.send("Server is Working ...");
});

// Use the noteRoute module for handling all requests with the /api/v1 prefix
app.use("/api/v1", noteRoute);

// Start the server and listen for incoming requests on the specified port
app.listen(port, () => {
    console.log(`Server Started Now ...`);
});