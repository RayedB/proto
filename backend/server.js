import express from 'express';
import bodyParser from 'body-parser';
import { graphqlExpress, graphiqlExpress } from 'apollo-server-express';
import mongoose from 'mongoose';
import cors from 'cors';
import OktaJwtVerifier from '@okta/jwt-verifier';
import Okta from '@okta/okta-sdk-nodejs';

import schema from './schema';

const oktaJwtVerifier = new OktaJwtVerifier({
  issuer: 'https://dev-874252.oktapreview.com/oauth2/default',
  assertClaims: {
    aud: 'api://default',
  },
});

const oktaClient = new Okta.Client({
  orgUrl: 'https://dev-874252.oktapreview.com/',
  token: '000Piwbd1Usjo56iFSubESxzErDRHNEVHnrFOwOT5P'    // Obtained from Developer Dashboard
});

/**
 * A simple middleware that asserts valid access tokens and sends 401 responses
 * if the token is not present or fails validation.  If the token is valid its
 * contents are attached to req.jwt
 */
function authenticationRequired(req, res, next) {
  const authHeader = req.headers.authorization || '';
  const match = authHeader.match(/Bearer (.+)/);

  if (!match) {
    return res.status(401).end();
  }

  const accessToken = match[1];

  return oktaJwtVerifier.verifyAccessToken(accessToken)
    .then((jwt) => {
      req.jwt = jwt;
      next();
    })
    .catch((err) => {
      res.status(401).send(err.message);
    });
}

const app = express();
app.use(bodyParser.json())
app.use(cors());

mongoose.connect('mongodb://localhost/balaizProto')

const connection = mongoose.connection

connection.once('open',() => {
  console.log("connected to db")
})

app.use('/graphiql', graphiqlExpress({
  endpointURL:'/graphql'
}));

app.use('/graphql', bodyParser.json(), graphqlExpress({schema}));

/**
 * An example route that requires a valid access token for authentication, it
 * will echo the contents of the access token if the middleware successfully
 * validated the token.
 */
app.get('/secure', authenticationRequired, (req, res) => {
  res.json(req.jwt);
});

/**
 * Another example route that requires a valid access token for authentication, and
 * print some messages for the user if they are authenticated
 */
app.get('/api/messages', authenticationRequired, (req, res) => {
  res.json([{
    message: 'Hello, word!'
  }]);
});

app.post('/api/user/create', (req,res) => {
  console.log("body")
  console.log(req.body)
  console.log("---")
  const newUser = {
    profile: {
      firstName: req.body.first,
      lastName: req.body.last,
      email: req.body.email,
      login: req.body.email,
    },
    credentials: {
      password : {
        value: req.body.password
      }
    }
  };
  console.log(newUser)
  oktaClient.createUser(newUser)
  .then(user => {
    console.log('Created user', user);
    res.end()
  });
})

app.listen(8080, () => console.log("Running on 8080"))
