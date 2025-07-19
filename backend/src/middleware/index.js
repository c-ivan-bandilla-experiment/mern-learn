import { firstMiddleware } from "./firstMidleware.js";
import rateLimiter from "./rateLimiter.js";

export default [
    firstMiddleware,
    rateLimiter
];


