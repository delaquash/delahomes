import { auth } from 'express-oauth2-jwt-bearer';

const jwtCheck = auth({
    audience: process.env.AUTH0_URI,
    issuerBaseURL: process.env.AUTH0_ISSUER_BASE_URL,
    tokenSigningAlg: process.env.AUTH0_TOKEN_SIGNING_ALG
  });


