import passport from "passport";
import dotenv from "dotenv";
import path from "path";


dotenv.config({
    path: path.resolve(__dirname, '../.env')
  });


const jwt = require("jsonwebtoken");
const BearerStrategy = require('passport-http-bearer').Strategy;

const JWT_SECRET = process.env.JWT_SECRET;

module.exports = () => {
  passport.use(new BearerStrategy(
    (token: any, done: any) => {
      try {
        const payload = jwt.verify(token, JWT_SECRET) as any;

        return done(null, payload);
      } catch (err) {
        return done(null, false);
      }
    }
  ));
};
