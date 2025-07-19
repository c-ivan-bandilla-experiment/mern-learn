export function firstMiddleware(req, res, next) {
    console.log("First middleware executed");
    next();
}