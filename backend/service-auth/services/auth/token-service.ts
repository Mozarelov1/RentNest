import { getRepository } from "typeorm";
import { v4 as uuidv4 } from "uuid"

import dotenv from "dotenv";
import path from "path";
import { AuthDataSource } from "../../config/data-source";

const User = require("../../models/user-model")
const jwt = require("jsonwebtoken");

dotenv.config({
    path: path.resolve(__dirname, '../.env')
  });

class TokenService{
    userRepo: any;
    jwtSecret: string | undefined;
    jwtExpiresIn: any;

    constructor() {
    this.userRepo = AuthDataSource.getRepository(User);
    this.jwtSecret = process.env.JWT_SECRET;
    this.jwtExpiresIn = process.env.JWT_EXPIRES_IN 
  }

    generateJwt(user : typeof User){
        const nowSeconds = Math.floor(Date.now() / 1000);
        const expiresInSec = this._parseExpiresIn(this.jwtExpiresIn); 

        const payload = {
            jti: uuidv4(),           
            sub: user.id,            
            iat: nowSeconds,         
            // @ts-ignore
            exp: nowSeconds + expiresInSec, 
            email: user.email,       
        }
        return jwt.sign(payload, this.jwtSecret);
    }

      _parseExpiresIn(expiresInStr: string) {
         const match = expiresInStr.match(/^(\d+)([smhd])$/);
         if (!match) return 15 * 60 * 1000;    
           const value = parseInt(match[1], 10);

         switch (match[2]) {
           case 's': return value * 1000;
           case 'm': return value * 60 * 1000;
           case 'h': return value * 3600 * 1000;
           case 'd': return value * 86400 * 1000;
            default:  return value * 60 * 1000;
          }
         }

}

module.exports = new TokenService();