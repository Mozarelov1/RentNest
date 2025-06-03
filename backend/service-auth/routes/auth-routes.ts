import express from "express";
import passport from "passport";

const tokenService = require('../services/token-service');

import dotenv from "dotenv";
import path from "path";

const router = express.Router();

dotenv.config({
    path: path.resolve(__dirname, '../.env')
  });

router.get('/google', passport.authenticate('google', {
    scope: ['email', 'profile'],
    session: false,
  })
);

router.get( '/google/callback',passport.authenticate('google',{failureRedirect: '/login', session: false}),
    (req,res) =>{
         const user = req.user;
         const token = tokenService.generateJwt(user);

         return res.redirect(`${process.env.CLIENT_URL}/oauth-success?token=${token}`);
    }
)

module.exports = router;