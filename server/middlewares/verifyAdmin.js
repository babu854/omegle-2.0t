import { createError } from "../utils/error.js";
import verifyToken from "./verifyToken.js";

const verifyAdmin = async (req, res, next) => {
    verifyToken(req, res, () => {
        if (req.user.isAdmin) {
            next();
        } else {
            return next(createError(403, "You are not authorized!"));
        }
    })
}

export default verifyAdmin;