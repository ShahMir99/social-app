import jwt from "jsonwebtoken"


const auth = async (req , res , next) => {
    try{
        const token = req.headers;

        next();
    }catch(error){

    }
}

export default auth;