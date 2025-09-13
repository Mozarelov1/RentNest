import express, { RequestHandler } from "express";
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
      const user = req.user as any;
      const accessToken  = tokenService.generateAccTok(user);
      const refreshToken = await tokenService.generateRefTok(user);

      res.cookie("refreshToken", refreshToken, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "none",
          maxAge: tokenService._parseExpiresIn(process.env.REF_TOKEN_EXPIRES_IN!) * 1000,
          path: "/",
          
        })
      const redirectUrl = new URL(process.env.CLIENT_URL!);
      redirectUrl.pathname = "/oauth2/redirect";
      redirectUrl.searchParams.set("token", accessToken);

      return res.redirect(redirectUrl.toString());
    }catch(e){
      next(e)
    }
  }
)

//@ts-ignore
const refreshHandler: RequestHandler = async (req, res, next) => {
  try {
    const { refreshToken } = req.cookies;
    if (!refreshToken) {
      return res.status(401).json({ status: "error", message: "No token" });
    }
    const payload = tokenService.verifyRefTok(refreshToken);
    const userId = payload.sub;

    const user = await tokenService.userRepo.findOne({ where: { id: userId } });
    if (!user) {
      return res.status(404).json({ status: "error", message: "User not found" });
    }
    const newAccessToken = tokenService.generateAccTok(user);
    const newRefreshToken = await tokenService.generateRefTok(user);

    res.cookie("refreshToken", newRefreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "none",
      maxAge: tokenService._parseExpiresIn(process.env.REF_TOKEN_EXPIRES_IN!) * 1000,
      path: "/",
    });

    return res.json({ accessToken: newAccessToken });
  } catch (err) {
    console.error("Error in refreshHandler:", err);
    return res.status(401).json({ status: "error", message: "Invalid token" });
  }
};

router.get("/refresh", refreshHandler);

module.exports = router;