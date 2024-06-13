import express from "express";
import {createCurrentUser,  updateCurrentUser, getCurrentUser} from "../controllers/userController";
import {  jwtParse } from "../middleware/auth";
import { ExpressValidator } from "../middleware/validation";
const router = express.Router();
import { auth } from 'express-oauth2-jwt-bearer';

export const jwtCheck = auth({
    audience: "mern-food-ordering-app-api",
    issuerBaseURL: "https://dev-m6fiy401keas0g76.us.auth0.com/",
    tokenSigningAlg:  "RS256"
    
  });

router.get("/",   jwtParse, getCurrentUser)
router.post("/createuser", jwtParse, createCurrentUser )
router.put("/",jwtCheck, ExpressValidator, updateCurrentUser);


export default router;
