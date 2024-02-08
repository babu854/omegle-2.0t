import { createError } from "../utils/error.js"
import verifyToken from "./verifyToken.js"

const verifyUser = async (req, res, next) => {
    verifyToken(req, res, () => {
        if (req.user.id === req.params.id || req.user.isAdmin) {
            next();
        } else {
            return next(createError(403, "You are not authorized!"));
        }
    })
}

export default verifyUser;