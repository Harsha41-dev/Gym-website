import { ApiError } from "../utils/ApiError.js";

export const isAuthenticated = (req, res, next) => {
    if (!req.session.userId) {
        throw new ApiError(401, "Please login to access this resource");
    }
    next();
};

export const isAdmin = (req, res, next) => {
    if (!req.session.userId || !req.session.isAdmin) {
        throw new ApiError(403, "Access denied. Admin privileges required");
    }
    next();
}; 