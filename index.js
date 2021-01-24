//All modules imported from Node Package
const express = require('express');
const mongoose = require('mongoose');
const config = require('./config.json');
const get_rout = require('./routs/get');
const post_rout = require('./routs/post');


//--------------------------------server.js (Auth0)--------------------------------------
const jwt = require('express-jwt');
const jwtAuthz = require('express-jwt-authz');
const jwksRsa = require('jwks-rsa');


// Authorization middleware. When used, the
// Access Token must exist and be verified against
// the Auth0 JSON Web Key Set
const checkJwt = jwt({
  // Dynamically provide a signing key
  // based on the kid in the header and 
  // the signing keys provided by the JWKS endpoint.
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `https://spothunt.jp.auth0.com/.well-known/jwks.json`
  }),

  // Validate the audience and the issuer.
  audience: '600d1d37fdf85b003d9f23cb',
  issuer: `https://spothunt.jp.auth0.com/`,
  algorithms: ['RS256']
});

//------------------------------------------------------------------------
// This route doesn't need authentication
app.get('/api/public', function(req, res) {
  res.json({
    message: 'Hello from a public endpoint! You don\'t need to be authenticated to see this.'
  });
});
//-----------------------------------Auth0-Completed------------------------------------------------

//Assigning app to express
const app = express();

//Middle Ware
app.use(express.json());                       //to converting json data to computer known language
app.use('/get', get_rout);
app.use('/post', post_rout);

//Connecting to mongodb data-base
mongoose.connect(config.database_url, { useNewUrlParser: true, useUnifiedTopology: true }, () => {
  console.log("Connected to data-base success");
});


//API is hosted in
app.listen(config.port, () => {
  console.log(`Spot Hunt API listening at http://localhost:${config.port}`);
})