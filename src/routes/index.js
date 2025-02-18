const { Router } = require("express");
const userRoutes = require("../routes/userRoutes");
const authRoutes = require("../routes/authRoutes");

let endpointVersion = "v1";

const routes = Router();

routes.use(`/api/${endpointVersion}/user`, userRoutes.router);
routes.use(`/api/${endpointVersion}/auth`, authRoutes.router);

module.exports = { routes };
