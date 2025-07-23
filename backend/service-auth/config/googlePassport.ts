import dotenv from "dotenv";
import passport from "passport";
import { AuthDataSource }      from "./data-source";
import { Request, Response } from 'express';
import { getRepository } from "typeorm";

import path from "path";

const User = require("../models/user-model")
const GoogleStrategy = require('passport-google-oauth20').Strategy;

dotenv.config({
    path: path.resolve(__dirname, '../.env')
  });

module.exports = () => {
    passport.use(new GoogleStrategy({
        
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL:  process.env.GOOGLE_CALLBACK_URL,
        passReqToCallback: true,

    },
        async (req: Request, accessToken: string, refreshToken: string, profile: any, done: any) => {
            try{
                const clientIp = req.ip;

                const userRepo = AuthDataSource.getRepository(User);

                let user = await userRepo.findOne({ where : {googleID: profile.id} });
                if(user){
                    return done(null, user);
                }

                const email = profile.emails?.[0]?.value;

                const existingByEmail = await userRepo.findOne({ where: { email } })
                if(existingByEmail){
                    existingByEmail.googleID = profile.id;
                    existingByEmail.name     = existingByEmail.name || profile.displayName;
                    existingByEmail.photo    = existingByEmail.photo || profile.photos?.[0]?.value;
                        await userRepo.save(existingByEmail);
                        return done(null, existingByEmail);
                };

                const newUser = await userRepo.create({
                    email:    email || `no-email-${profile.id}@google.local`,
                    googleID: profile.id,
                    name:     profile.displayName,
                    photo:    profile.photos?.[0]?.value,
                    passwordHash: null,
                    ip_address: clientIp
                })
                
                 await userRepo.save(newUser);
                 return done(null, newUser);

            }catch(e){
                return done(e, null);
            }
        }
    ))
}