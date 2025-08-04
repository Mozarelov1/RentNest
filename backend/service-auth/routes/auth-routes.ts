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
  async  (req,res, next) =>{
    try{
      const user = req.user as any;;
      const accessToken  = tokenService.generateAccTok(user);
      const refreshToken = await tokenService.generateRefTok(user);

      res
        .cookie("accessToken", accessToken, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "lax",
          maxAge: tokenService._parseExpiresIn(process.env.ACC_TOKEN_EXPIRES_IN!) * 1000,
          path: "/",
        })
        .cookie("refreshToken", refreshToken, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "lax",
          maxAge: tokenService._parseExpiresIn(process.env.REF_TOKEN_EXPIRES_IN!) * 1000,
          path: "/auth/token",
        })
        .json({
          status: 'success',
          data: { accessToken },
        });
    }catch(e){
      next(e)
    }
  }
)

module.exports = router;