import { getRepository, Repository} from "typeorm";
import { v4 as uuidv4 } from "uuid"

import dotenv from "dotenv";
import path from "path";
import { AuthDataSource } from "../config/data-source";

const User = require("../models/user-model");
const Token = require("../models/token-model")
const jwt = require("jsonwebtoken");

dotenv.config({
    path: path.resolve(__dirname, '../.env')
  });

class TokenService{


    userRepo: Repository<typeof User>;
    tokenRepo: Repository<typeof Token>;
    jwtSecret: string | undefined;
    accTokenExpiresIn: any;
    refTokenExpiresIn: any;

    constructor() {
    this.userRepo = AuthDataSource.getRepository(User);
    this.tokenRepo = AuthDataSource.getRepository(Token)
    this.jwtSecret = process.env.JWT_SECRET;
    this.accTokenExpiresIn = process.env.ACC_TOKEN_EXPIRES_IN;
    this.refTokenExpiresIn = process.env.REF_TOKEN_EXPIRES_IN;
  }

    generateAccTok(user : typeof User){
        const nowSeconds = Math.floor(Date.now() / 1000);
        const expiresInSec = this._parseExpiresIn(this.accTokenExpiresIn); 

        const payload = {
            jti: uuidv4(),           
            sub: user.id,            
            iat: nowSeconds,         
            // @ts-ignore
            exp: expiresInSec + nowSeconds, 
            email: user.email,       
        }
        return jwt.sign(payload, this.jwtSecret);
    }

    async generateRefTok(user : typeof User){
        const nowSeconds = Math.floor(Date.now() / 1000);
        const expiresInSec = this._parseExpiresIn(this.refTokenExpiresIn); 

          const payload = {
            jti: uuidv4(),           
            sub: user.id,            
            iat: nowSeconds,         
            // @ts-ignore
            exp: nowSeconds + expiresInSec,        
        }
        const token = jwt.sign(payload, this.jwtSecret);
        
        await this.tokenRepo.save({
          jti:    payload.jti,
          sub:    payload.sub,
          iat:    payload.iat,
          exp:    payload.exp,
        });
        return token
    }

      _parseExpiresIn(expiresInStr: string) {
        const match = expiresInStr.match(/^(\d+)([smhd])$/);
        if (!match) return 15 * 60; 
          const value = parseInt(match[1], 10);

          switch (match[2]) {
          case 's': return value;
          case 'm': return value * 60;
          case 'h': return value * 3600;
          case 'd': return value * 86400;
          default:  return value * 60;

          }
      }
      verifyRefTok(token: string) {
        try {
          return jwt.verify(token, this.jwtSecret) as any;
        } catch (err) {
          throw new Error("Invalid token");
        }
      }

}

module.exports = new TokenService();