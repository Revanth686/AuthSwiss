/**
 *array of routes exposed to public
 *@type {string[]}
 **/
export const publicRoutes = ["/", "/auth/verify-email"];

/**
 *these routes redirect to /settings
 *@type {string[]}
 */
export const authRoutes = [
  "/auth/login",
  "/auth/register",
  "/auth/error",
  "/auth/reset",
  "/auth/new-password",
];

/**
 *prefix for api auth routes
 *routes that start with prefix are used 4 auth purposes
 *@type {string}
 */
export const apiAuthPrefix = "/api/auth";

/**
 * default redirect after login
 * @type {string}
 */
export const DEFAULT_LOGIN_REDIRECT = "/settings";
