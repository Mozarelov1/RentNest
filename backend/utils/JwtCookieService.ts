import axios from "axios";

const jwt = require("jsonwebtoken");

class JwtCookieService{

    getUserIdByToken(token: string, jwt_secret: string){
        const payload = jwt.verify(token, jwt_secret);
        return payload.sub
    }

    async getUserByToken(token: string, jwt_secret: string){
        const userId = this.getUserIdByToken(token,jwt_secret);
        try{

        const user = await axios.get(`http://localhost:2001/api/user/${userId}`)
        return user.data;
        
        }catch(e){
            console.log(e)
            throw new Error("Failed to fetch user");
        }

    }

}

module.exports = new JwtCookieService();